const Joi = require('joi');
const  createPatientActivityValidation = Joi.object()
    .keys({
        body: Joi.object({
            patientId: Joi.number().strict().label('patientId').required(),
            appointmentId: Joi.number().strict().label('appointmentId').required(),
            // noteId: Joi.number().strict().label('noteId').required(),
            // followup: Joi.string().strict().label('followup').required(),
            // form: Joi.string().strict().label('form').required(),
            // note: Joi.string().strict().label('note').required(),
            // prescription: Joi.string().strict().label('prescription'),
            // customMessage: Joi.string().strict().label('customMessage').required(),


        }).unknown(true),
    });

const updatePatientActivityValidation = Joi.object()
    .keys({
        body: Joi.object({
            appointmentId: Joi.number().strict().label('appointmentId').required(),
        }).unknown(true),
    });

const getFeeCodesValidation = Joi.object()
    .keys({
        body: Joi.object({
            feeCode: Joi.string().strict().label('feeCode')
        }).unknown(true),
    });
const getDayActivitiesValidation = Joi.object().keys({
    query: Joi.object({
        day: Joi.string().strict().label('day')
    }).unknown(true),
});

const getActivityStatusValidation = Joi.object().keys({
    query: Joi.object({
        id: Joi.string().strict().label('id').required()
    }).unknown(true),
});
const deletePatientActivityValidation = Joi.object().keys({
    query: Joi.object({
        id: Joi.string().strict().label('id').required()
    }).unknown(true),
});
const updatePatientActivityStatusValidation = Joi.object().keys({
    body: Joi.object({
        id: Joi.number().strict().label('id').required()
    }).unknown(true),
})
const sendPDFFaxValidation = Joi.object().keys({
    body: Joi.object({
        recipient: Joi.string().strict().label('recipient').required(),
        fileName: Joi.string().strict().label('fileName').required(),
        patientId: Joi.number().strict().label('patientId').required(),
        documentType: Joi.string().strict().label('documentType').required(),
    }).unknown(true),
});

const s3FileTobase64Validation = Joi.object().keys({
    body: Joi.object({
        file: Joi.string().strict().label('file').required()
    }).unknown(true),
})
const getPatientTasksValidation = Joi.object().keys({
    query: Joi.object({
        id: Joi.required().label('id').required()
    }).unknown(true),
});

module.exports = {
    createPatientActivityValidation,
    getFeeCodesValidation,
    getDayActivitiesValidation,
    getActivityStatusValidation,
    updatePatientActivityStatusValidation,
    deletePatientActivityValidation,
    sendPDFFaxValidation,
    s3FileTobase64Validation,
    getPatientTasksValidation ,
    updatePatientActivityValidation

}