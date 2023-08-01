const Joi = require('joi');

const orgLoginValidation = Joi.object()
    .keys({
        body: Joi.object({
            organizationId: Joi.string().strict().label('organizationId').required(),
            password: Joi.string().strict().min(8).label('Password').required()
        }).unknown(true),
    });

module.exports = {
    orgLoginValidation
}