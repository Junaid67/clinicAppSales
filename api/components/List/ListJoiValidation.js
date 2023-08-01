const Joi = require('joi');

const createListValidation = Joi.object()
    .keys({
        body: Joi.object({
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const updateListValidation = Joi.object()
    .keys({
        body: Joi.object({
            id: Joi.number().strict().label('id').required(),
            title: Joi.string().strict().label('title').required(),
        }).unknown(true),
    });

const deleteListValidation = Joi.object()
    .keys({
        query: Joi.object({
            listId: Joi.required().label('listId')
        }).unknown(true),
    });
const addPatientInListValidation = Joi.object()
    .keys({
        body: Joi.object({
            listId: Joi.number().strict().label('listId').required(),
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });

const shiftPatientInListsValidation = Joi.object()
    .keys({
        body: Joi.object({
            toListId: Joi.number().strict().label('toListId').required(),
            listRefId: Joi.number().strict().label('listRefId').required()
        }).unknown(true),
    });
const removePatientInListValidation = Joi.object()
    .keys({
        body: Joi.object({
            listId: Joi.number().strict().label('toListId').required(),
            patientId: Joi.number().strict().label('patientId').required()
        }).unknown(true),
    });

module.exports = {
    createListValidation,
    updateListValidation,
    deleteListValidation,
    addPatientInListValidation,
    shiftPatientInListsValidation,
    removePatientInListValidation

}