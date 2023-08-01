/**
 * PatientNotesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const helpers = require('../utils/validate');
module.exports = {
    addNotesForPatient: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.patientnotes.create(body).fetch().usingConnection(sails.db);
            let months = helpers.returnMonths();
            var curr_date = new Date();
            let ts =
                months[curr_date.getMonth()] +
                " " +
                curr_date.getDate() +
                " " +
                curr_date.getFullYear();
            res.ok({ id: response.id, timestamp: ts }, { message: 'Note added successfully!' });
        } catch (error) {
            res.error(error);
        }
    },
    updateNotesForPatient: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.patientnotes.updateOne({ id: body.id }).set({
                notes: body.notes,
                patientId: body.patientId,
            }).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteNotesForPatient: async (req, res) => {
        const { query: { notesId } } = req;
        try {
            const response = await sails.models.patientnotes.destroyOne({ id: notesId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Patient Notes Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Patient Notes Not Found With this Id: ${notesId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }
};

