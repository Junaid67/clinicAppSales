/**
 * AppointmentTypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createAppointmentType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.appointmenttype.create(body).fetch().usingConnection(sails.db);;
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getAppointmentTypes: async (req, res) => {
        try {
            const response = await sails.models.appointmenttype.find().populate('subTypes').usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getAppointmentTypeById: async (req, res) => {
        const { query: { appointmentTypeId } } = req;
        try {
            const response = await sails.models.appointmenttype.findOne({ id: appointmentTypeId }).populate('subTypes').usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateAppType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.appointmenttype.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteAppType: async (req, res) => {
        const { query: { appointmentTypeId } } = req;
        try {
            const response = await sails.models.appointmenttype.destroyOne({ id: appointmentTypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'AppointmentType Deleted Successfully!' });
            } else {
                res.ok({ mesage: `AppointmentType Not Found With this Id: ${appointmentTypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

