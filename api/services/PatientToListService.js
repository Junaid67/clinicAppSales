const getPatientsByList = async () => {
    try {
        let lists = await sails.models.patientstolist.find().populate('listId')
            .populate('patientId').usingConnection(sails.db);
        lists = lists.map((res) => {
            if (res.patientId != null && typeof res.patientId == 'object') {
                res = { ...res, patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName };
            }
            if (res.listId != null && typeof res.listId == 'object') {
                res = { ...res, listId: res.listId.id, title: res.listId.title };
            }
            return res;
        });
        let patients = [...new Set(lists.map(item => item.patientId))];
        patients = patients.filter((a) => a);
        const activities = await sails.models.patienttasks.find({ patientId: patients }).usingConnection(sails.db);
        let activitiesList = _.groupBy(activities, function (i) { return i.patientId });
        let patientStatus = [];
        const oneDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
        for (const key in activitiesList) {
            let NOT_COMPLETED = 0;
            let IN_COMPLETE = 0;
            let COMPLETED = 0;
            let LATES_COMPLETED = 0;
            for (const item of activitiesList[key]) {

                if (item.followupStatus == 0
                    && item.formStatus == 0
                    && item.noteStatus == 0
                    && item.customMessageStatus == 0
                    && item.prescriptionStatus == 0
                    && item.billStatus == 0) {
                    NOT_COMPLETED = NOT_COMPLETED + 1;

                } else if (item.followup_status == 1
                    && item.formStatus == 1
                    && item.noteStatus == 1
                    && item.customMessageStatus == 1
                    && item.prescriptionStatus == 1
                    && item.billStatus == 1
                    && item.createdAt > oneDay
                ) {
                    COMPLETED = COMPLETED + 1;
                } else if (item.followup_status == 1
                    && item.formStatus == 1
                    && item.noteStatus == 1
                    && item.customMessageStatus == 1
                    && item.prescriptionStatus == 1
                    && item.billStatus == 1
                    && item.createdAt < oneDay
                ) {
                    LATES_COMPLETED = LATES_COMPLETED + 1;
                }
                else {
                    IN_COMPLETE = IN_COMPLETE + 1;
                }

            }
            patientStatus.push({
                customerId: activitiesList[key][0].customer_id,
                NOT_COMPLETED,
                COMPLETED,
                IN_COMPLETE,
                LATES_COMPLETED
            });
        }
        let patientTaskStatus = [];
        for (const item of patientStatus) {
            if (item.NOT_COMPLETED > 0 && item.COMPLETED == 0 && item.IN_COMPLETE == 0) {
                patientTaskStatus.push({ patientId: item.patientId, taskStatus: 0 });
            } else if (item.IN_COMPLETE > 0) {
                patientTaskStatus.push({ patientId: item.patientId, taskStatus: 1 });
            } else if (item.NOT_COMPLETED == 0 && item.IN_COMPLETE == 0 && (item.COMPLETED > 0 || item.LATES_COMPLETED > 0)) {
                if (item.LATES_COMPLETED > 0) {
                    patientTaskStatus.push({ patientId: item.patientId, taskStatus: 3 });
                } else {
                    patientTaskStatus.push({ patientId: item.patientId, taskStatus: 2 });
                }
            }
        }
        let patientList = [];
        if (lists.length > 0) {
            lists.forEach((item) => {
                item.patientName = (item.firstName === null ? "" : item.firstName) + (item.middleName === null ? "" : item.middleName) + " " + (item.lastName === null ? "" : item.lastName);
            });

            let list = _.groupBy(lists, function (i) { return i.listId; });
            let keys = Object.keys(list);
            keys.forEach(function (item, index) {

                let temp = {
                    listId: item * 1,
                    title: list[item][0].title
                }
                if (list[item][0].patientId != null) {
                    temp.patients = list[item];
                } else {
                    temp.patients = [];
                }
                patientList.push(temp);
            })
        }
        patientList = patientList.map((pList) => {
            let { patients } = pList;
            if (patients.length) {
                patients = patients.map((p) => {
                    const found = patientTaskStatus.find(x => x.patientId === p.patientId);
                    if (found) {
                        p.taskStatus = found.taskStatus;
                        return p;
                    } else {
                        return p;
                    }
                });

                pList.patients = pList.patients;
                return pList;
            } else {
                return pList
            }
        });
        return patientList;
            // message: 'Patients data has been retrieved successfully!',
            // data: patientList
    } catch (error) {
        throw error;
    }

}
module.exports = {
    getPatientsByList
}; 