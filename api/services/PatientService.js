const { returnDate, returnIds, returnMonths, timeSince } = require('../utils/validate');

const getFullPateintsWithDetails = async (patients) => {
    try {


        let patientsIds = [...new Set(patients.map(item => item.id))];
        const activities = await sails.models.patienttasks.find({ patientId: patientsIds }).usingConnection(sails.db);
        let activitiesList = _.groupBy(activities, function (i) { return i.customer_id });
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

                } else if (item.followupStatus == 1
                    && item.formStatus == 1
                    && item.noteStatus == 1
                    && item.customMessageStatus == 1
                    && item.prescriptionStatus == 1
                    && item.billStatus == 1
                    && item.createdAt > oneDay
                ) {
                    COMPLETED = COMPLETED + 1;
                } else if (item.followupStatus == 1
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
                patientTaskStatus.push({ customerId: item.customerId, taskStatus: 0 });
            } else if (item.IN_COMPLETE > 0) {
                patientTaskStatus.push({ customerId: item.customerId, taskStatus: 1 });
            } else if (item.NOT_COMPLETED == 0 && item.IN_COMPLETE == 0 && (item.COMPLETED > 0 || item.LATES_COMPLETED > 0)) {
                if (item.LATES_COMPLETED > 0) {
                    patientTaskStatus.push({ customerId: item.customerId, taskStatus: 3 });
                } else {
                    patientTaskStatus.push({ customerId: item.customerId, taskStatus: 2 });
                }
            }
        }
        const diagnosticTypes = await sails.models.diagnostictype.find().usingConnection(sails.db);
        if (diagnosticTypes.length > 0) {
            patients.forEach(function (item) {
                diagnosticTypes.forEach(function (item2) {
                    if (item.diagnosticTypeId === item2.id) {
                        item.diagnosticTypeTitle = item2.title;
                    }
                });
            });
        };
        const tasks = await sails.models.patienttasks.find({ patientId: patientsIds }).usingConnection(sails.db);
        if (tasks.length > 0) {
            patients.forEach((item) => {
                tasks.forEach((item2) => {
                    if (item.id === item2.patientId) {
                        item.lastTaskCreated = timeSince(new Date(item2.createdAt));
                    }
                });
            });
        }
        patients = patients.map((pList) => {
            const found = patientTaskStatus.find(x => x.customerId === pList.id);
            if (found) {
                pList.taskStatus = found.taskStatus;
                return pList;
            } else {
                return pList;
            }
        });
        return patients;
    } catch (error) {
        throw error;
    }
};
const getPatientDetailsById = async (patientId) => {
    let months = returnMonths();
    try {

        const patientres = await sails.models.patient.findOne({ select: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'diagnosticTypeId', 'createdAt'], where: { id: patientId } }).usingConnection(sails.db);
        if (!patientres) {
            throw { message: `No Patient found with ${patientId}` };
        }
        const patientNotes = await sails.models.patientnotes.find({ select: ['notes', 'createdAt'], where: { patientId: patientId } }).usingConnection(sails.db);
        
        const patientTasks = await sails.models.patienttasks.find({ select: ['patientId', 'note', 'notePdf', 'noteStatus', 'noteDrawnPdf', 'createdAt'], where: { patientId: patientId } }).usingConnection(sails.db);
        const patientReport = await sails.models.documentinbox.find({ patientId }).usingConnection(sails.db);
        let customerNotes = [];
        if (patientReport.length) {
            for (let i = 0; i < patientTasks.length; i++) {
                customerNotes.push({
                    ...patientTasks[i],
                    ...(patientReport.find((itmInner) => itmInner.patientId === patientTasks[i].patientId
                    ))
                }
                );
            }
            customerNotes.forEach(function (item) {
                var curr_date = returnDate(item.createdAt);
                item.createdAt =
                    months[curr_date.getMonth()] +
                    " " +
                    curr_date.getDate() +
                    " " +
                    curr_date.getFullYear();
            });
        }
        const patientReports = await sails.models.documentinbox.find({ patientId }).usingConnection(sails.db);
        if (patientReports.length == 0) {
            customerNotes = customerNotes.filter((res) => {
                if (
                    res.note != null &&
                    res.note.length > 0 &&
                    res.noteStatus !== null &&
                    res.noteStatus == 1
                ) {
                    return true;
                } else if (
                    res.note != null &&
                    res.note.length == 0 &&
                    res.noteDrawnPdf &&
                    res.noteDrawnPdf != null &&
                    res.noteDrawnPdf != ""
                ) {
                    return true;
                }
            });
            var patient = patientres;
            patient.letter = customerNotes;
            patient.tasks = [];
            patient.doctorNotes = patientNotes;

            return {
                success: true,
                message:
                    "Patient details has been retrieved successfully!",
                data: patient,
            };
        }

        const documentIds = patientReport.map((p) => p.documentId);
        let document_inbox = await sails.models.documentinbox.find({ id: documentIds }).usingConnection(sails.db);
        const document_subtypes = await sails.models.documentsubtype.find({ id: returnIds(patientReports, 'documentSubtypeId') }).usingConnection(sails.db);

        customerNotes = customerNotes.filter((res) => {
            if (res.note != undefined && res.note != null && res.noteStatus == 1) {
                return true;
            } else if (res.note != undefined && res.note != null &&
                res.note.length == 0 && res.noteDrawnPdf &&
                res.noteDrawnPdf != null &&
                res.noteDrawnPdf != ""
            ) {
                return true;
            }
        });
        customerNotes.forEach(function (res) {
            if (res.note.length && res.noteStatus == 1) {
                res.note = "Clinic Note - From Activity";
            }
        });

        var customerDocumentedReports = [];
        var otherDocuments = [];


        document_inbox.filter((res) => {
            patientReports.forEach((report) => {
                if (report.documentId === res.id) {
                    if (report.documentType == 1) {

                        document_subtypes.forEach((type) => {
                            if (type.id === report.documentSubtypeId) {
                                var curr_date = returnDate(res.autoDate);
                                customerNotes.push({
                                    markForReview: res.markForReview,
                                    patientId: report.patientId,
                                    documentId: res.id,
                                    documentSubtypeId: report.documentSubtypeId,
                                    documentTye: report.documentType,
                                    reportId: report.id,
                                    note: type.name,
                                    notePdf: res.pdfFile,
                                    // note_pdf: req.protocol + "://" + req.headers.host+"/" + res.pdf_file,
                                    noteStatus: -1,
                                    createTimestamp:
                                        months[curr_date.getMonth()] +
                                        " " +
                                        curr_date.getDate() +
                                        " " +
                                        curr_date.getFullYear(),
                                });
                            }
                        });
                    } else if (report.documentType == 2) {
                        document_subtypes.forEach((type) => {
                            if (type.id === report.documentSubtypeId) {
                                var curr_date = returnDate(report.createdAt);
                                res.markForReview = report.markForReview;
                                res.patientId = report.patientId;
                                res.documentId = res.id;
                                res.documentSubtypeId = report.documentSubtypeId;
                                res.documentTye = report.documentType;
                                res.name = type.name;
                                res.report_id = report.id;
                                res.pdfFile = res.pdfFile;
                                // res.pdf_file = req.protocol + "://" + req.headers.host+"/" + res.pdf_file;
                                // res.name = "Clinic Notes - From Activity";
                                res.createdAt =
                                    months[curr_date.getMonth()] +
                                    " " +
                                    curr_date.getDate() +
                                    " " +
                                    curr_date.getFullYear();
                                customerDocumentedReports.push(res);
                            }
                        });
                    }
                    else if (report.documentType == 3) {
                        document_subtypes.forEach((type) => {
                            if (type.id === report.documentSubtypeId) {
                                var curr_date = returnDate(report.createdAt);
                                res.name = type.name;
                                res.pdf_file = res.pdfFile;
                                // res.pdf_file = req.protocol + "://" + req.headers.host+"/" + res.pdf_file;
                                // res.name = "Clinic Notes - From Activity";
                                res.createdAt =
                                    months[curr_date.getMonth()] +
                                    " " +
                                    curr_date.getDate() +
                                    " " +
                                    curr_date.getFullYear();
                                otherDocuments.push(res);
                            }
                        });
                    }
                }
            });
        });

        patient = patientres;
        patient.letters = customerNotes;
        patient.tasks = customerDocumentedReports;
        patient.other = otherDocuments;
        patient.doctorNotes = patientNotes;
        
        return patient;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getFullPateintsWithDetails,
    getPatientDetailsById
}; 