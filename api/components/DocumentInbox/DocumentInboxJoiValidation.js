const Joi = require('joi');

const getPendingDocumentsListByPatientIdValidation = Joi.object()
    .keys({
        body: Joi.object({
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });
const updateAssignedDocumentToPatientValidation = Joi.object().keys({
    body: Joi.object({
        documentId: Joi.number().strict().label('documentId').required(),
        patientId: Joi.number().strict().label('patientId').required(),
        documentTypeId: Joi.number().strict().label('documentTypeId').required(),
        documentSubtypeId: Joi.number().strict().label('documentSubtypeId').required()
    }).unknown(true),
});
const assignDocumentToPatientValidation = Joi.object().keys({
    body: Joi.object({
        patientId: Joi.number().strict().label('patientId').required(),
        documentTypeId: Joi.number().strict().label('documentTypeId').required(),
        documentSubtypeId: Joi.number().strict().label('documentSubtypeId').required(),
        markForReview: Joi.number().strict().label('markForReview').required(),
    }).unknown(true),
});

const getFaxedDocumentValidation = Joi.object().keys({
    body: Joi.object({
        fileName: Joi.string().strict().label('id').required()
    }).unknown(true),
});
const archiveFaxValidation = Joi.object().keys({
    query: Joi.object({
        documentId: Joi.required().label('documentId')
    }).unknown(true),
});
const uploadDocumentValidation = Joi.object().keys({
    body: Joi.object({
        file: Joi.string().strict().label('file').required(),
        userTimestamp: Joi.string().strict().label('userTimestamp').required(),
        patientId: Joi.number().strict().label('patientId').required(),
        documentTypeId: Joi.number().strict().label('documentTypeId').required(),
        documentSubtypeId: Joi.number().strict().label('documentSubtypeId').required()
    }).unknown(true),
})
const updateDocumentNameValidation = Joi.object().keys({
    body: Joi.object({
        documentId: Joi.number().strict().label('documentId').required(),
        fileName: Joi.string().strict().label('fileName').required(),
    }).unknown(true),
});
const getFaxedDocumentsValidation = Joi.object().keys({
    body: Joi.object({
        // profileType: Joi.number().strict().label('profileType').required()
    }).unknown(true),
})



module.exports = {
    archiveFaxValidation,
    updateDocumentNameValidation,
    uploadDocumentValidation,
    getFaxedDocumentValidation,
    updateAssignedDocumentToPatientValidation,
    getPendingDocumentsListByPatientIdValidation,
    assignDocumentToPatientValidation,
    getFaxedDocumentsValidation

}