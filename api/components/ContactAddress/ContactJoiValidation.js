const Joi = require('joi');

const saveContactValidation = Joi.object()
    .keys({
        body: Joi.object({
            firstName: Joi.string().strict().label('firstName').required(),
            lastName: Joi.string().strict().label('lastName').required(),
            cpsoNumber: Joi.string().strict().label('cpsoNumber').required(),
            billingNumber: Joi.string().strict().label('billingNumber').required(),
            email: Joi.string().strict().label('email').required(),
            speciality: Joi.string().strict().label('speciality').required(),
        }).unknown(true),
    });

const updateContactValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            firstName: Joi.string().strict().label('firstName'),
            lastName: Joi.string().strict().label('lastName'),
            cpsoNumber: Joi.string().strict().label('cpsoNumber'),
            billingNumber: Joi.string().strict().label('billingNumber'),
            email: Joi.string().strict().label('email'),
            speciality: Joi.string().strict().label('speciality'),
        }).unknown(true),
    });

const deleteContactValidation = Joi.object()
    .keys({
        query: Joi.object({
            contactId: Joi.required().label('contactId')
        }).unknown(true),
    });

const updateAddressValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            address: Joi.string().strict().label('address'),
            city: Joi.string().strict().label('city'),
            province: Joi.string().strict().label('province'),
            postalCode: Joi.string().strict().label('postalCode'),
            phone: Joi.string().strict().label('phone'),
            fax: Joi.string().strict().label('fax'),
        }).unknown(true),
    });

const deleteAddressValidation = Joi.object()
    .keys({
        query: Joi.object({
            contactAddressId: Joi.required().label('contactAddressId')
        }).unknown(true),
    });
module.exports = {
    saveContactValidation,
    updateContactValidation,
    deleteContactValidation,
    updateAddressValidation,
    deleteAddressValidation

}