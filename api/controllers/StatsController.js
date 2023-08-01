/**
 * StatsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const helpers = require('../utils/validate');
 const { timeSince } = require('../utils/validate');
 module.exports = {
    getPatientStats: async (req, res) => {
        const { body, query } = req;
         try {
            let patients = await sails.models.patient.find().usingConnection(sails.db);
            patients = patients.map((res) => {
                res.createdDateTime = res.createdAt;
                return res;
            });
            let criteria;
            if (body !== undefined && query.startDate !== undefined && query.endDate !== undefined) {
                if (!helpers.checkDate(query.startDate) || !helpers.checkDate(query.endDate)) {
                    return res.error({
                        message: `Provided dates are invalid, please provide both dates in this format: YYYY-MM-DD`,
                    });
                } else {
                    criteria = { createdAt: { '>': query.startDate, '<': query.endDate } }
                }
            }
            let finalResult=[];
                patients.forEach((patient) => {
                    if (patient.id === criteria) {
                        finalResult.push({
                            count: patient.id,
                            createdAt: patient.createdAt,  
                        });
                    }
                });
          
            console.log(
                `Patients  have been retrieved successfully!`
            );
            return res.ok(finalResult.reverse(), {
                message: "Patients  Stats have been retrieved successfully!",
            });
         } catch (error) {
             res.error(error);
         }
     },
     getActivitiesStats: async (req, res) => {
        const { body, query } = req;
        try {
            let patients = await sails.models.patient.find({ select: ['firstName', 'dateOfBirth', 'gender', 'diagnosticTypeId', 'createdAt'] }).usingConnection(sails.db);
            patients = patients.map((res) => {
                res.name = res.firstName;
                delete res.firstName;
                return res;
            });
            let criteria;
            if (body !== undefined && query.startDate !== undefined && query.endDate !== undefined) {
                if (!helpers.checkDate(query.startDate) || !helpers.checkDate(query.endDate)) {
                    return res.error({
                        message: `Provided dates are invalid, please provide both dates in this format: YYYY-MM-DD`,
                    });
                } else {
                    criteria = { createdAt: { '>': query.startDate, '<': query.endDate } }
                }
            }
            let customersTasks;
            if (criteria) {
                customersTasks = await sails.models.patienttasks.find(criteria).usingConnection(sails.db);
            } else {
                customersTasks = await sails.models.patienttasks.find().usingConnection(sails.db);
            }
            let finalResult = [];
            customersTasks.forEach(function (item) {
                if (item.formId && helpers.isDate(item.formId)) {
                    item.formIdDuration = helpers.dateDiff(
                        item.createdAt,
                        item.name,
                        item.jsonData,
                        item.uploadPath
                    ); //function will retun the time in string
                }
                if (item.followup && helpers.isDate(item.followup)) {
                    item.followUpDuration = helpers.dateDiff(
                        item.createdAt,
                        item.followup
                    ); //function will retun the time in string
                }
                if (item.bill !== "" && item.bill != null) {
                    if (helpers.isJson(item.bill)) {
                        item.bill = JSON.parse(item.bill);
                    } else {
                        item.bill = null;
                    }
                }
    
                // form Name
                if (item.customMessage && item.customMessage !== null && item.customMessage !== "") {
                    if (helpers.isJson(item.customMessage)) {
                        let temp = JSON.parse(item.customMessage);
                        item.customMessage = temp.customMessage;
                    }
                }
            });
            customersTasks.forEach((customerTasks) => {
                patients.forEach((patient) => {
                    if (patient.id === customerTasks.patientId) {
                        finalResult.push({
                            id: customerTasks.id,
                            patientId: patient.id,
                            name: patient.name,
                            icon: patient.icon,
                            taskActions: customerTasks,
                            status: "",
                        });
                    }
                });
            });
            console.log(
                `Patients Tasks have been retrieved successfully!`
            );
            return res.ok(finalResult.reverse(), {
                message: "Patients Activities Stats have been retrieved successfully!",
            });
        } catch (error) {
            res.error(error);
        }
     },
    getFaxDocumentsStats: async (req, res) => {
        try {
            let reports = await sails.models.documentinbox.find({ deletedAt: null }).populate('patientId').usingConnection(sails.db);
            reports = reports.map((res) => {
                if (res.patientId != null && typeof res.patientId == 'object') {
                    res = { ...res, patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName };
                }
                res.createdDateTime = res.autoDate;
                delete res.autoDate;
                return res;
            });
            reports = reports.map((r) => {
                const firstName = r.firstName ? r.firstName + ' ' : '';
                const middleName = r.middleName ? r.middleName : '';
                const lastName = r.lastName ? ' ' + r.lastName : '';
                r.Subject = firstName + middleName + lastName;
                r.Subject = r.Subject.replace(/\s+/g, ' ').trim();
                delete r.firstName;
                delete r.middleName;
                delete r.lastName;
                return r;
            });
            reports.forEach(function (item) {
                var curr_date = helpers.returnDate(item.createdDateTime);
                item.date =
                    months[curr_date.getMonth()] +
                    " " +
                    curr_date.getDate() +
                    " " +
                    curr_date.getFullYear();
            });
            let subTypes = await sails.models.documentsubtype.find().populate('documentTypeId').usingConnection(sails.db);
            subTypes = subTypes.map((res) => {
                if (res.documentTypeId != null && typeof res.documentTypeId == 'object') {
                    res = { ...res, documentTypeId: res.documentTypeId.id, typeTitle: res.documentTypeId.title };
                }
                res.subtypeTitle = res.title
                delete res.title;
                return res;
            });
            reports.forEach((item) => {
                subTypes.forEach((item2) => {
                    if (item.documentTypeId == item2.documentTypeId) {
                        item.typeTitle = item2.typeTitle;
                    }
                    if (item.documentSubTypeId == item2.id) {
                        item.subTypeTitle = item2.subtypeTitle;
                    }
                });
            });
            reports.sort(function (a, b) {
                return (
                    helpers.returnDate(b.createdDateTime).getTime() -
                    helpers.returnDate(a.createdDateTime).getTime()
                );
            });
            return res.ok(reports, {
                message:
                    "All inboxed documents have been retrieved successfully!",
            });
        } catch (error) {

        }
    },
    getAppointmentsStats: async (req, res) => {
        try{
       const  appointments = await sails.models.appointment.find().usingConnection(sails.db);
               if (!appointments.length) {
                   return res.error({ message: 'Appointments Not Found!' });
               }
               const type = await sails.models.appointmentsubtype.find().populate('appointmentTypeId').usingConnection(sails.db);
               if (!type.length) {
                return res.error({ message: 'AppointmentSubType Not Found!' });
            }
               const response = await sails.models.appointmenttype.find().usingConnection(sails.db);
               if (!response.length) {
                return res.error({ message: 'AppointmentType Not Found!' });
            }
               res.ok(appointments,type,response);
           } catch (error) {
               res.error(error);
           }
           },
 };