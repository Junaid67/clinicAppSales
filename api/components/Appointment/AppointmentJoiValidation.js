const Joi = require('joi');
const createAppointmentValidation = Joi.object()
    .keys({
        body: Joi.object({
            patientId: Joi.number().strict().label('patientId').required(),
            appointmentTypeId: Joi.number().strict().label('appointmentTypeId').required(),
            appointmentSubTypeId: Joi.number().strict().label('appointmentSubTypeId').required(),
            status: Joi.number().strict().label('status').required(),
            location: Joi.number().strict().label('location').required(),
            date: Joi.string().strict().label('date').required(),
            provider: Joi.number().strict().label('provider').required(),
            duration: Joi.number().strict().label('duration').required(),
            week: Joi.number().strict().label('week').required(),
            slot: Joi.number().strict().label('slot').required(),
            physicianId: Joi.number().strict().label('physicianId').required()
        }).unknown(true),
    });

const deleteAppointmentValidation = Joi.object()
    .keys({
        query: Joi.object({
            appointmentId: Joi.required().label('appointmentId')
        }).unknown(true),
    });
const  updateAppointmentValidation = Joi.object()
    .keys({
        query: Joi.object({
            id: Joi.string().strict().label('id').required(),
        }),
        body: Joi.object({
            physicianId: Joi.number().strict().label('physicianId').required()
        }).unknown(true),
    });
const updateAppointmentStatusValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required()
        }).unknown(true),
    });
// const getAppointmentStatusesValidation = Joi.object()
// .keys({
//     query: Joi.object({
//         id: Joi.required().label('id')
//     }).unknown(true),
// });
const getAppointmentsByRangeValidation = Joi.object()
.keys({
    query: Joi.object({
        startDate: Joi.string().required().label('startDate'),
        endDate: Joi.string().required().label('endDate')
    }).unknown(true),
});

const getAppointmentsAndHistory = Joi.object()
.keys({
    query: Joi.object({
        patientId: Joi.required().label('patientId')
    }).unknown(true),
});
// const getAppointmentLocationsValidation = Joi.object()
// .keys({
//     query: Joi.object({
//         id: Joi.required().label('id')
//     }).unknown(true),
// });
module.exports = {
    createAppointmentValidation,
    deleteAppointmentValidation,
    updateAppointmentStatusValidation,
    updateAppointmentValidation,
    getAppointmentsAndHistory,
    getAppointmentsByRangeValidation
    // getAppointmentStatusesValidation,
    // getAppointmentLocationsValidation
}