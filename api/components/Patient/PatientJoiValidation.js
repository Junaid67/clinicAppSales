const Joi = require('joi');

const createPatientValidation = Joi.object()
    .keys({
        body: Joi.object({
            diagnosticTypeId: Joi.number().strict().label('diagnosticTypeId').required(),
            firstName: Joi.string().strict().label('firstName').required(),
            lastName: Joi.string().strict().label('lastName').required(),
            gender: Joi.string().strict().label('gender').required(),
            dateOfBirth: Joi.string().strict().label('dateOfBirth').required(),
            physicianId:Joi.number().strict().label('physicianId').required()
        }).unknown(true),
    });

const addRecentlyVisitedValidation = Joi.object()
    .keys({
        query: Joi.object({
            patientId: Joi.required().label('patientId')
        }).unknown(true),
    });

const updatePatientValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            diagnosticTypeId: Joi.number().strict().label('diagnosticTypeId'),
            firstName: Joi.string().strict().label('firstName'),
            lastName: Joi.string().strict().label('lastName'),
            gender: Joi.string().strict().label('gender'),
            physicianId:Joi.number().strict().label('physicianId'),
            dateOfBirth: Joi.string().strict().label('dateOfBirth')
        }).unknown(true),
    });

const validateHealthCardValidation = Joi.object()
    .keys({
        body: Joi.object({
            healthNumber: Joi.string().strict().label('healthNumber').required(),
            versionCode: Joi.string().strict().label('versionCode').required(),
            goSecureEmail: Joi.string().strict().label('goSecureEmail').required(),
            goSecurePassword: Joi.string().strict().label('goSecurePassword').required(),
            muid: Joi.string().strict().label('muid').required()
        }).unknown(true),
    });

const addNotesForPatientValidation = Joi.object()
    .keys({
        body: Joi.object({
            notes: Joi.string().strict().label('notes').required(),
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });
const updateNotesForPatientValidation = Joi.object()
    .keys({
        body: Joi.object({
            notes: Joi.string().strict().label('notes').required(),
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });
const deleteNotesForPatientValidation = Joi.object()
    .keys({
        query: Joi.object({
            patientNotesId: Joi.required().label('patientNotesId')
        }).unknown(true),
    });
const archivePatientValidation = Joi.object()
    .keys({
        body: Joi.object({
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });
    const createPatientSummaryValidation = Joi.object()
    .keys({
        body: Joi.object({
            categoryId: Joi.number().strict().label('categoryId').required(),
            patientId: Joi.number().strict().label('patientId').required(),
            description: Joi.string().strict().label('description').required(),
        }).unknown(true),
        
    });
    const updatePatientSummaryValidation = Joi.object()
        .keys({
            query: Joi.object({
                id: Joi.required().label('id'),
            }),
        body: Joi.object({
            categoryId: Joi.number().strict().label('categoryId').required(),
            patientId: Joi.number().strict().label('patientId').required(),
            description: Joi.string().strict().label('description').required(),
        }).unknown(true),
    });
    const deletePatientMedicalHistoryDetails = Joi.object()
        .keys({
            query: Joi.object({
                id: Joi.required().label('id'),
            })
        });

module.exports = {
    createPatientValidation,
    addRecentlyVisitedValidation,
    updatePatientValidation,
    validateHealthCardValidation,
    addNotesForPatientValidation,
    updateNotesForPatientValidation,
    deleteNotesForPatientValidation,
    archivePatientValidation,
    createPatientSummaryValidation,
    updatePatientSummaryValidation,
    deletePatientMedicalHistoryDetails
}