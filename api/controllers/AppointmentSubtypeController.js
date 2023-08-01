/**
 * AppointmentSubtypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createAppointmentSubType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.appointmentsubtype.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getAppointmentSubTypes: async (req, res) => {
        try {
            const response = await sails.models.appointmentsubtype.find().populate('appointmentTypeId').usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateAppSubType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.appointmentsubtype.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteSubAppType: async (req, res) => {
        const { query: { appointmentSubTypeId } } = req;
        try {
            const response = await sails.models.appointmentsubtype.destroyOne({ id: appointmentSubTypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'AppointmentSubType Deleted Successfully!' });
            } else {
                res.ok({ mesage: `AppointmentSubType Not Found With this Id: ${appointmentSubTypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};


