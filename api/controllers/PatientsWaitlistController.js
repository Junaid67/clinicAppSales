/**
 * PatientsWaitlistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { timeSince } = require('../utils/validate');
module.exports = {
    getWaitLists: async (req, res) => {
        try {
            let lists = await sails.models.patientswaitlist.find({ select: ['patientId', 'createdAt', 'type', 'status', 'activityId'] }).populate('patientId').usingConnection(sails.db);
            lists = lists.map((res) => {
                if (res.patientId != null && typeof res.patientId == 'object') {
                    res = { ...res, patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName };
                }
                return res;
            });
            surgery = 0;
            referrals = 0;
            requisition = 0;
            lists.forEach(function (item) {
                item.since = timeSince(new Date(item.createdAt));
                if (item.type == 1) {
                    item.title = "Surgery wait list";
                    surgery += 1;
                } else if (item.type == 2) {
                    item.title = "Referrals wait list (pending notes)";
                    referrals += 1;
                } else if (item.type == 3) {
                    item.title = "Requisition tracking (pending reports)";
                    requisition += 1;
                }
            });
            res.ok(lists,
                {
                    message: 'Waitlist retreived successfully!'
                }
            );
        } catch (error) {
            res.error(error);
        }
    },
    getWaitListsGroupByPatients: async (req, res) => {
        try {
            const patients = await sails.models.patient.find({ select: ['firstName'] }).usingConnection(sails.db);
            if (!patients.length) {
                return res.error({ message: 'Patient Not Found!' });
            }
            const waitList = await sails.models.patientswaitlist.find({ status: 0, or: [{ type: 2 }, { type: 3 }] }).usingConnection(sails.db);
            const formsList = await sails.models.form.find().usingConnection(sails.db);
            if (!formsList.length) {
                return res.error({ message: 'Forms Not Found!' });
            }
            patients.forEach(function (item, index) {
                item.waitList = [];
                waitList.forEach(function (item2, index2) {
                    if (item.id == item2.patientId) {
                        let temp = {};

                        temp.typeId = item2.type;
                        temp.formId = item2.formSubtypeId;
                        if (item2.type === 2) {
                            temp.title = "Referrals wait list (pending notes)";
                        } else if (item2.type === 3) {
                            temp.title = "Requisition tracking (pending reports)";
                        }
                        formsList.forEach(function (item3) {
                            if (item3.id === item2.formSubtypeId) {
                                temp.formTitle = item3.name;
                            }
                        })
                        item.waitList.push(temp);
                    }
                })
            });
            res.ok(
                patients,
                { message: 'Patients waitlist data has been retrieved successfully!' }
            )
        } catch (error) {
            res.error(error);
        }
    }
};

