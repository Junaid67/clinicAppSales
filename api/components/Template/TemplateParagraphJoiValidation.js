const Joi = require('joi');

const createTemplateParagraphValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required(),
            paragraph: Joi.string().strict().label('paragraph').required(),
            categoryId: Joi.number().strict().label('categoryId').required(),
        }).unknown(true),
    });

const updateTemplateParagraphValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title'),
            paragraph: Joi.string().strict().label('paragraph'),
            categoryId: Joi.number().strict().label('categoryId'),
        }).unknown(true),
    });

const deleteTemplateParagraphValidation = Joi.object()
    .keys({
        query: Joi.object({
            templateparagraphId: Joi.required().label('templateparagraphId')
        }).unknown(true),
    });

module.exports = {
    createTemplateParagraphValidation,
    updateTemplateParagraphValidation,
    deleteTemplateParagraphValidation

}