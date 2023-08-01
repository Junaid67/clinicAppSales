/**
 * DocumentInboxController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const helpers = require('../utils/validate');
const months = helpers.returnMonths();
const axios = require('axios');
async function getDocumentTypes(waitList, formsList) {
    let documentTypes = await sails.models.documenttype.find().usingConnection(sails.db);

    if (!documentTypes.length) {
        throw { message: 'Doc type not found!' };
    } else {
        let documentSubtypes = await sails.models.documentsubtype.find().usingConnection(sails.db);
        if (!documentSubtypes.length) {
            throw { message: 'doc subtype not found!' };
        } else {
            documentTypes.forEach((item) => {
                item.subTypes = [];
                documentSubtypes.forEach((item2) => {
                    if (item.id == item2.documentTypeId) {
                        item.subTypes.push(item2);
                    }
                });
            });
            documentTypes.forEach((item2) => {
                item2.waitList = [];
                waitList.forEach((item) => {
                    if (item2.id == item.type - 1) {
                        var t = {
                            formTypeId: item.type,
                            formId: item.formTypeId,
                            name: item.name,
                            formId: item.subtypeId,
                            createdAt: item.createdAt,
                            patientId: item.patientId,
                            documentTypeId: item2.id,
                        };
                        item2.waitList.push(t);
                    } else if (item2.id == item.type - 1) {
                        var t = {
                            formTypeId: item.type,
                            formId: item.formTypeId,
                            name: item.name,
                            formId: item.subtypeId,
                            createdAt: item.createdAt,
                            patientId: item.patientId,
                        };
                        item2.waitList.push(t);
                    }
                });
            });
            return {
                message:
                    "Patients waitlist data by ID has been retrieved successfully!",
                data: documentTypes,
            };
        }
    }
}
async function getForms(waitList) {
    try {
        let formsList = await sails.models.form.find({ formTypeId: waitList.map((row) => row.type) }).usingConnection(sails.db);
        waitList.forEach((item) => {
            formsList.forEach((item2) => {
                if (item2.id == item.formTypeId) {
                    item.name = item2.name;
                    item.subtypeId = item2.id;
                }
            });
        });
        return getDocumentTypes(waitList, formsList);
    } catch (error) {
        return error;
    }
};
module.exports = {
    archiveFax: async (req, res) => {
        const { query: { documentId } } = req;
        try {
            const response = await sails.models.documentinbox.updateOne({ id: documentId }).set({
                isArchived: true
            }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: `Document Achived successfully. ${documentId}` });
            } else {
                res.ok({ mesage: `Not Found Give Id: ${documentId}` });
            }
        } catch (error) {
            return res.error(error);
        }
    },
    deleteInboxDocument: async (req, res) => {
        const { query: { documentId } } = req;
        try {
            const response = await sails.models.documentinbox.destroyOne({ id: documentId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Document Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Document Not Found With this Id: ${documentId}` });
            }
        } catch (error) {
            res.error(error);
        }
    },
    updateDocumentName: async (req, res) => {
        const { body: { documentId, fileName } } = req;
        try {
            const response = await sails.models.documentinbox.updateOne({ id: documentId }).set({
                name: fileName
            }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: `Document name updated successfully. ${documentId}` });
            } else {
                res.ok({ mesage: `No document exist against this id: ${documentId}` });
            }
        } catch (error) {
            return res.error(error);
        }
    },
    uploadDocument: async (req, res) => {
        let { body } = req;
        try {
            if (body.file.indexOf("data:application/pdf;base64,") === -1) {
                return res.error({
                    success: false,
                    message: `'file' is not a valid pdf base64`
                });
            }
            body.file = body.file.replace("data:application/pdf;base64,", "");
            let currTimestamp = new Date().getTime();
            let filename = `uploaded_${currTimestamp}.pdf`;
            let buff = Buffer.from(req.body.file, 'base64');
            let documentUrl = await S3Service.uploadFile(buff, filename);
            body.documentUrl = filename;
            const document = await sails.models.documentinbox.create({
                name: body.fileName || filename,
                status: 1,
                pdfFile: body.documentUrl,
                review: 0,
                reviewStatus: 0,
                receivedAt: new Date(),
                isFaxed: false,
                userTimestamp: body.userTimestamp
            }).fetch().usingConnection(sails.db);
            if (!document) {
                return res.error({ message: 'Document not created!' })
            }
            const reports = await sails.models.patientreport.create({
                patientId: body.patientId,
                documentId: document.id,
                documentTypeId: body.documentTypeId,
                documentSubtypeId: body.documentSubtypeId
            }).fetch().usingConnection(sails.db);
            if (!reports) {
                return res.error({ message: 'Not uploaded successfully!' });
            }
            return res.ok({ message: 'document has been uploaded' });
        } catch (error) {
            res.error(error);
        }
    },
    getQueuedFaxes: async (req, res) => {
        try {
            const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
            let opts = {
                action: "Get_Faxes_Queued",
                access_id: srFaxAcc.faxId,
                access_pwd: srFaxAcc.faxPassword
            };
            let json = await axios.post(process.env.SR_FAX_URL, opts);
            if (json.data) {
                json = json.data;
            } else {
                return res.error({
                    message: `There is an issue while getting Queued faxes.`
                });
            }
            if (json.Status != undefined && json.Status == "Success") {

                return res.ok({
                    message: `Faxes outbox received successfully!`,
                    data: json.Result
                });
            } else {
                return res.error({
                    message: `There is an issue while getting faxes outbox.`
                });
            }
        } catch (error) {
            res.error(error);
        }
    },
    getFaxedDocument: async (req, res) => {
        const { body: { fileName } } = req;
        try {
            const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
            if (!srFaxAcc) {
                return res.error({ message: 'SR Fax Account Not Found!' });
            }
            let opts = {
                action: "Retrieve_Fax",
                access_id: srFaxAcc.faxId,
                access_pwd: srFaxAcc.faxPassword,
                sDirection: "OUT",
                sFaxFileName: fileName,
                sFaxFormat: "PDF",
            };
            let pdfData = await axios.post(process.env.SR_FAX_URL, opts);

            if (pdfData.data) {
                pdfData = pdfData.data;
            } else {
                return res.error({
                    message: `There is an issue while getting faxes.`,
                    data: pdfData
                });
            }
            if (pdfData.Status != undefined && pdfData.Status == "Success") {
                return res.ok({
                    message: `Faxed document received successfully!`,
                    data: "data:application/pdf;base64," + Buffer.from(pdfData.Result, 'base64').toString('base64')
                });
            } else {
                return res.error({
                    message: `There is an issue while getting fax document.`,
                    data: pdfData
                });
            }
        } catch (error) {
            res.error(error);
        }
    },
    getFaxedOutbox: async (req, res) => {
        try {
            const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
            let opts = {
                action: "Get_Fax_Outbox",
                access_id: srFaxAcc.faxId,
                access_pwd: srFaxAcc.faxPassword
            };
            let metadata = await sails.models.faxoutbox.find().populate('patientId').usingConnection(sails.db);
            metadata = metadata.map((res) => {
                if (res.patientId != null && typeof res.patientId == 'object') {
                    res = { ...res, patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName };
                }
                return res;
            });
            metadata = metadata.map((r) => {
                const firstName = r.firstName ? r.firstName + ' ' : '';
                const middleName = r.middleName ? r.middleName : '';
                const lastName = r.lastName ? ' ' + r.lastName : '';
                r.patientName = firstName + middleName + lastName;
                r.patientName = r.patientName.replace(/\s+/g, ' ').trim();
                delete r.firstName;
                delete r.middleName;
                delete r.lastName;
                return r;
            });

            let json = await axios.post(process.env.SR_FAX_URL, opts);
            if (json.data) {
                json = json.data;
                let { Result } = json;
                const mergedmeatadataWithFax = Result.map((data) => {
                    const faxId = data.FileName.split("|")[1];

                    let foundMetadata = metadata.find(o => o.faxId == faxId);
                    if (foundMetadata) {
                        data.patientName = foundMetadata.patientName;
                        data.documentType = foundMetadata.documentType;
                        return data;
                    } else {
                        return data;
                    }
                });
                json.Result = mergedmeatadataWithFax;
            } else {
                return res.error({
                    message: `There is an issue while getting faxes.`
                });
            }
            if (json.Status != undefined && json.Status == "Success") {

                return res.ok({
                    message: `Faxes outbox received successfully!`,
                    data: json.Result
                });
            } else {
                return res.error({
                    message: `There is an issue while getting faxes outbox.`
                });
            }
        } catch (error) {
            res.error(error);
        }
    },
    checkInboxDoc: async (req, res) => {
        try {
            const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
            let opts = {
                action: "Get_Fax_Inbox",
                access_id: srFaxAcc.faxId,
                access_pwd: srFaxAcc.faxPassword,
            };
            
            if (srFaxAcc.faxId == null || srFaxAcc.faxPassword == null){
                return res.error({
                    message: `There is an issue while getting faxes because of faxId or faxPassword is null.`
                });
            }
            let json = await axios.post(process.env.SR_FAX_URL, opts);
            if (!json || !json.data) {
                return res.error({
                    message: `There is an issue while getting faxes.`
                });
            } else {
                json = json.data;
            }
            if (json.Status != undefined && json.Status == "Success") {
                let names = [];
                let rows = await sails.models.documentinbox.find({ select: ['name', 'pdfFile'] }).usingConnection(sails.db);

                let pdfDbNames = [];

                let namesToAdd = [...json.Result];
                for (var i = 0; i < namesToAdd.length; i++) {
                    for (var j = 0; j < rows.length; j++) {
                        if (namesToAdd[i]["FileName"] == rows[j]["name"]) {
                            namesToAdd[i].toRemove = true;
                        }
                    }
                }

                for (var i = 0; i < namesToAdd.length; i++) {
                    if (namesToAdd[i]["toRemove"] != undefined) {
                        namesToAdd.splice(i, 1);
                        i--;
                    }
                }
                console.log("new faxes: " + namesToAdd.length);

                if (namesToAdd.length == 0) {
                    return res.ok({
                        message: "No files to add!",
                        status: 0,
                    });
                }

                let pdfToAdd = [];
                let count = 0;
                namesToAdd.forEach(async (item, index) => {

                    opts = {
                        action: "Retrieve_Fax",
                        access_id: srFaxAcc.faxId,
                        access_pwd: srFaxAcc.faxPassword,
                        sDirection: "IN",
                        sFaxFileName: item["FileName"],
                        sFaxFormat: "PDF",
                    };

                    let pdfData = await axios.post(process.env.SR_FAX_URL, opts);
                    pdfData = pdfData.data;

                    if (pdfData.Status != undefined && pdfData.Status == "Success") {
                        let path = helpers.currTimestamp() + ".pdf";

                        //s3 needs to be used
                        const awsFileName = await S3Service.uploadFile(Buffer.from(pdfData.Result, 'base64'), path);

                        let temp = {
                            FileName: item.FileName,
                            path: path,
                            // path: awsFileName,
                            CallerID: item.CallerID,
                            Date: new Date(item.Date),
                        };

                        pdfToAdd.push(temp);
                        console.log(count);
                        if (count == namesToAdd.length - 1) {
                            console.log('end');
                            await insertFaxes(pdfToAdd);
                        }
                        count += 1;
                    } else {
                        return res.error({
                            message: `Error getting base64`,
                            data: json
                        });
                    }
                });
            } else {
                return res.error({
                    message: `There is an issue while getting faxes.`
                });
            }
            async function insertFaxes(pdfToAdd) {
                console.log(pdfToAdd)
                let values = [];
                pdfToAdd.forEach(function (item) {
                    let temp = {
                        name: item.FileName,
                        pdfFile: item.path,
                        faxFrom: item.CallerID,
                        receivedAt: item.Date,
                        status: 0,
                        isFaxed: 1,
                        review: 0,
                        reviewStatus: 0,
                        isArchived: 0,
                    }
                    values.push(temp);
                });
                
                const response = await sails.models.documentinbox.createEach(values).usingConnection(sails.db);
                return res.ok({ 
                    message: pdfToAdd.length + " Fax file(s) added to document inbox",
                    status: 1,
                })
            }
        } catch (error) {
            res.error(error);
        }
    },
    updateAssignedDocumentToPatient: async (req, res) => {
        const { body } = req;
        try {
            const updatedDocumentInbox = await sails.models.documentinbox.updateOne({ id: body.documentId }).set({ ...body, status: 1 }).fetch();
            const waitlist = await sails.models.patientswaitlist.updateOne({ id: body.waitlistId }).set({
                status: 0,
                documentTypeId: null,
                documentId: null
            }).usingConnection(sails.db);
            if (
                body.documentSubtypeId == null &&
                body.formId != undefined &&
                body.formTypeId != undefined
            ) {
                let updatedList;
                if (body.documentType === 1) {
                    updatedList = await sails.models.patientswaitlist.updateOne({ type: 2, status: 0, formtypeId: body.formId, patientId: body.patientId }).set({
                        status: 1,
                        documentTypeId: body.documentTypeId,
                        documentId: body.documentId
                    }).usingConnection(sails.db);
                } else if (req.body.documentType === 2) {
                    updatedList = await sails.models.patientswaitlist.updateOne({ type: 3, status: 0, formtypeId: body.formId, patientId: body.patientId }).set({
                        status: 1,
                        documentTypeId: body.documentTypeId,
                        documentId: body.documentId
                    }).usingConnection(sails.db);
                }
                if (!updatedList) {
                    return res.error({ message: 'waitlist not updated' });
                }

                if (
                    updatedList.affectedRows &&
                    updatedList.affectedRows > 0
                ) {
                    var m = "";
                    if (
                        body.documentSubtypeId == null &&
                        body.formId != undefined &&
                        body.formTypeId != undefined
                    ) {
                        m = `Patient with id ${body.patientId} values updated.`;
                    } else {
                        m = `Patient with id ${body.patientId} status updated to 0.`;
                    }
                    console.log(m);
                }
            }
            return res.ok({ message: `Document with id: ${body.documentId} has updated successfully!` })
        } catch (error) {
            res.error(error);
        }
    },
    getPendingDocumentsListByPatientId: async (req, res) => {
        const { body } = req;
        try {
            let waitList = await sails.models.patientswaitlist.find({ status: 0, patientId: body.patientId, or: [{ type: 2 }, { type: 3 }] });
            if (waitList.length == 0) {
                let documentTypes = await sails.models.documenttype.find().usingConnection(sails.db);

                if (!documentTypes.length) {

                    return res.error({ message: 'document type not found!' });
                } else {
                    let documentSubtypes = sails.models.documentsubtype.find().usingConnection(sails.db);
                    if (!documentSubtypes.length) {
                        return res.error({ message: 'doc subtype not found!' });
                    } else {
                        let documents = [];
                        documentTypes.forEach((item) => {
                            item.subTypes = [];
                            documentSubtypes.forEach((item2) => {
                                if (item.id == item2.documentTypeId) {
                                    item.subTypes.push(item2);
                                }
                            });
                        });
                        console.log(
                            `Success! Patients waitlist data by ID has been retrieved successfully!`
                        );
                        return res.ok({
                            data: documentTypes,
                        }, {
                            message:
                                "Patients waitlist data by ID has been retrieved successfully!"
                        });
                    }
                }
            } else {
                await getForms(waitList);
            }
        } catch (error) {

        }
    },
    assignDocumentToPatient: async (req, res) => {
        const { body } = req;
        try {
            let reports = await sails.models.documentinbox.updateOne({ id: body.documentId }).set({
                patientId: body.patientId,
                documentTypeId: body.documentTypeId,
                documentSubtypeId: body.documentSubtypeId,
                message: body.message,
                status: 1,
                review: body.markForReview
            }).fetch().usingConnection(sails.db);
            if (!reports) {
                return res.error({ message: 'Document not assignment to patient!' });
            }
            if (
                body.documentSubtypeId == null &&
                body.formId != undefined &&
                body.formTypeId != undefined
            ) {
                if (req.body.documentType == 1) {
                    let updatedList = await sails.models.patientswaitlist.updateOne({
                        type: 2,
                        status: 0,
                        formTypeId: body.formId,
                        patientId: body.patientId
                    }).set({
                        status: 1,
                        documentTypeId: body.documentTypeId,
                        documentId: body.documentId
                    }).fetch().usingConnection(sails.db);
                    if (!updatedList) {
                        return res.error({ message: 'Not assignment to patient!' });
                    } else {
                        let wailtlist = await sails.models.documentinbox.updateOne({
                            type: 2,
                            status: 1,
                            formTypeId: body.formId,
                            patientId: body.patientId
                        }).set({ waitlistId: updatedList.id }).fetch().usingConnection(sails.db);
                        if (!wailtlist) {
                            console.log('"not updated document inbox');
                        } else {
                            console.log(
                                `Patient with id ${body.patientId} status updated to 1 from Referral waitlist.`
                            );
                        }
                    }
                } else if (req.body.document_type == 2) {
                    let updatedList = await sails.models.patientswaitlist.updateOne({
                        type: 3,
                        status: 0,
                        formTypeId: body.formId,
                        patientId: body.patientId
                    }).set({
                        status: 1,
                        documentTypeId: body.documentTypeId,
                        documentId: body.documentId
                    }).fetch().usingConnection(sails.db);
                    if (!updatedList) {
                        return res.error({ message: 'Not assignment to patient!' });
                    } else {
                        let wailtlist = await sails.models.documentinbox.updateOne({
                            type: 3,
                            status: 1,
                            formTypeId: body.formId,
                            patientId: body.patientId
                        }).set({ waitlistId: updatedList.id }).fetch().usingConnection(sails.db);
                        if (!wailtlist) {
                            console.log('"not updated document inbox');
                        } else {
                            console.log(
                                `Patient with id ${body.patientId} status updated to 1 from Referral waitlist.`
                            );
                        }
                    }
                }
            }
            let message = `Document with id: ${body.documentId} has been assigned to patient successfully!`;
            res.ok('', message);
        } catch (error) {
            res.error(error);
        }
    },
    getFaxedDocuments: async (req, res) => {
        // const { body: { profileType } } = req;
        try {
            // if (parseInt(profileType) != 0 && parseInt(profileType) != 1) {
            //     return res.error({ message: `'profileType' should be 0 or 1` });
            // }
            let reports;
            // if (profileType == 1) {
                reports = await sails.models.documentinbox.find({ review: 1, deletedAt: null }).populate('patientId').usingConnection(sails.db);
            // } else {
                // reports = await sails.models.documentinbox.find({ review: 1, deletedAt: null }).populate('patientId').usingConnection(sails.db);
            // }
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
            return res.error(error);
        }
    },
    getInboxDocuments: async (req, res) => {
        // const { body: { profileType } } = req;
        try {
            // let reports;
            // if (profileType == 1) {
            //     reports = await sails.models.documentinbox.find({ review: 1, deletedAt: null }).populate('patientId').usingConnection(sails.db);
            // } else {
            //     reports = await sails.models.documentinbox.find({ review: 0, deletedAt: null }).populate('patientId').usingConnection(sails.db);
            // }

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
    }

};

