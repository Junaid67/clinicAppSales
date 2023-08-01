const Joi = require('joi');

const saveClinicDataValidation = Joi.object()
    .keys({
        body: Joi.object({
            physicianFirstName: Joi.string().strict().label('physicianFirstName').required(),
            physicianLastName: Joi.string().strict().label('physicianLastName').required(),
            cpso: Joi.string().strict().label('cpso').required(),
            billingNo: Joi.string().strict().label('billingNo').required(),
            faxNo: Joi.string().strict().label('faxNo').required(),
            goSecureEmail: Joi.string().strict().label('goSecureEmail').required(),
            goSecurePassword: Joi.string().strict().label('goSecurePassword').required(),
        }).unknown(true),
    });

const updateClinicDataValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            physicianFirstName: Joi.string().strict().label('physicianFirstName'),
            physicianLastName: Joi.string().strict().label('physicianLastName'),
            cpso: Joi.string().strict().label('cpso').required(),
            billingNo: Joi.string().strict().label('billingNo'),
            faxNo: Joi.string().strict().label('faxNo'),
            goSecureEmail: Joi.string().strict().label('goSecureEmail'),
            goSecurePassword: Joi.string().strict().label('goSecurePassword'),
        }).unknown(true),
    });

const deleteClinicDataValidation = Joi.object()
    .keys({
        query: Joi.object({
            clinicDataId: Joi.required().label('clinicDataId')
        }).unknown(true),
    });


module.exports = {
    saveClinicDataValidation,
    updateClinicDataValidation,
    deleteClinicDataValidation

}