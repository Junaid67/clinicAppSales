const Joi = require('joi');

const createDiagnosticTypesValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const updateDiagnosticTypesValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const deleteDiagnosticTypesValidation = Joi.object()
    .keys({
        query: Joi.object({
            diagnostictypeId: Joi.required().label('diagnostictypeId')
        }).unknown(true),
    });



module.exports = {
    createDiagnosticTypesValidation,
    updateDiagnosticTypesValidation,
    deleteDiagnosticTypesValidation

}