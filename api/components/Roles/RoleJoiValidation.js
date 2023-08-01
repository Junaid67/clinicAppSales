const Joi = require('joi');

const createRoleValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('name').required(),
        }).unknown(true),
    });




module.exports = {
    createRoleValidation,
   
}