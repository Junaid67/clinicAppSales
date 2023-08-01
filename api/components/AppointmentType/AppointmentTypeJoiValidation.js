const Joi = require('joi');

const createAppointmentTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('name').required()
        }).unknown(true),
    });

const updateAppTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            name: Joi.string().strict().label('name').required(),
        }).unknown(true),
    });

const getAppointmentTypesValidation = Joi.object()
    .keys({
        query: Joi.object({
            appointmentTypeId: Joi.required().label('appointmentTypeId')
        }).unknown(true),
    });

const deleteAppTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            appointmentTypeId: Joi.required().label('appointmentTypeId')
        }).unknown(true),
    });

/******AppointmentSubtype******/

const createAppointmentSubTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            name: Joi.string().strict().label('name').required(),
            color: Joi.string().strict().label('color').required(),
            appointmentTypeId: Joi.number().strict().label('appointmentTypeId').required(),
        }).unknown(true),
    });

const updateAppSubTypeValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            name: Joi.string().strict().label('name'),
            color: Joi.string().strict().label('color'),
            appointmentTypeId: Joi.number().strict().label('appointmentTypeId'),
        }).unknown(true),
    });

const deleteSubAppTypeValidation = Joi.object()
    .keys({
        query: Joi.object({
            appointmentSubTypeId: Joi.required().label('appointmentSubTypeId')
        }).unknown(true),
    });

module.exports = {
    createAppointmentTypeValidation,
    updateAppTypeValidation,
    getAppointmentTypesValidation,
    deleteAppTypeValidation,
    /**Sub type*/
    createAppointmentSubTypeValidation,
    updateAppSubTypeValidation,
    deleteSubAppTypeValidation

}