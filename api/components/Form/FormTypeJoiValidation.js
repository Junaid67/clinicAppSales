const Joi = require('joi');

const saveFormTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('name').required()
        }).unknown(true),
    });

const updateFormTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            name: Joi.string().strict().label('name').required(),
        }).unknown(true),
    });

const deleteFormTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            formTypeId: Joi.required().label('formTypeId')
        }).unknown(true),
    });

module.exports = {
    saveFormTypeValidation,
    updateFormTypeValidation,
    deleteFormTypeValidation

}