const Joi = require('joi');

const createTemplateCategoryValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required()
        }).unknown(true),
    });

const updateTemplateCategoryValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const deleteTemplateCategoryValidation = Joi.object()
    .keys({
        query: Joi.object({
            templatecategoryId: Joi.required().label('templatecategoryId')
        }).unknown(true),
    });

module.exports = {
    createTemplateCategoryValidation,
    updateTemplateCategoryValidation,
    deleteTemplateCategoryValidation

}