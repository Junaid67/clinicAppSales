const Joi = require('joi');

const saveFormValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('name').required(),
            jsonData: Joi.string().strict().label('jsonData').required(),
            uploadPath: Joi.string().strict().label('uploadPath').required(),
            formTypeId: Joi.string().strict().label('formTypeId').required(),
        }).unknown(true),
    });

const updateFormValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            name: Joi.string().strict().label('name'),
            jsonData: Joi.string().strict().label('jsonData'),
            uploadPath: Joi.string().strict().label('uploadPath'),
            formTypeId: Joi.string().strict().label('formTypeId'),
        }).unknown(true),
    });

const deleteFormValidation = Joi.object()
    .keys({
        query: Joi.object({
            formId: Joi.required().label('formId')
        }).unknown(true),
    });

const getFormsByTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            formTypeId: Joi.required().label('formTypeId')
        }).unknown(true),
    });

module.exports = {
    saveFormValidation,
    updateFormValidation,
    deleteFormValidation,
    getFormsByTypeValidation

}