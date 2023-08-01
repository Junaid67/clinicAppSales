const Joi = require('joi');

const createSRFAXValidation = Joi.object()
    .keys({
        body: Joi.object({
            faxId: Joi.number().strict().label('faxId').required(),
            faxPassword: Joi.string().strict().label('faxPassword').required(),
            faxEmail: Joi.string().strict().label('faxEmail').required(),
            faxCallerId: Joi.string().strict().label('faxCallerId').required(),
        }).unknown(true),
    });

const updateSRFAXValidation = Joi.object()
    .keys({
        body: Joi.object({
            // id: Joi.number().strict().label('id').required(),
            faxId: Joi.string().strict().label('faxId'),
            faxPassword: Joi.string().strict().label('faxPassword'),
            faxEmail: Joi.string().strict().label('faxEmail'),
            faxCallerId: Joi.string().strict().label('faxCallerId'),
        }).unknown(true),
    });

const deleteSRFAXValidation = Joi.object()
    .keys({
        query: Joi.object({
            // srfaxId: Joi.required().label('srfaxId')
        }).unknown(true),
    });

module.exports = {
    createSRFAXValidation,
    updateSRFAXValidation,
    deleteSRFAXValidation

}