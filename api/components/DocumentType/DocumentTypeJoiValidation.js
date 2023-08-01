const Joi = require('joi');

const createDocumentTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required()
        }).unknown(true),
    });

const updateDocumentTypesValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const deleteDocTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            documentTypeId: Joi.required().label('documentTypeId')
        }).unknown(true),
    });

/******AppointmentSubtype******/

const createDocumentSubTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required(),
            documentTypeId: Joi.number().strict().label('documentTypeId').required(),
        }).unknown(true),
    });

const updateDocumentSubTypesValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title'),
            documentTypeId: Joi.string().strict().label('documentTypeId'),
        }).unknown(true),
    });


const deleteDocSubTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            documentSubTypeId: Joi.required().label('documentSubTypeId')
        }).unknown(true),
    });

module.exports = {
    createDocumentTypeValidation,
    updateDocumentTypesValidation,
    deleteDocTypeValidation,
    /**Sub type*/
    createDocumentSubTypeValidation,
    updateDocumentSubTypesValidation,
    deleteDocSubTypeValidation
}