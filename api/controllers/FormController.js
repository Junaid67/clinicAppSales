/**
 * FormController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    saveForm: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.form.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getForms: async (req, res) => {
        try {
            const response = await sails.models.form.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateForm: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.form.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot update Form with id: ${body.id}` })
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteForm: async (req, res) => {
        const { query: { formId } } = req;
        try {
            const response = await sails.models.form.destroyOne({ id: formId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Form Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Form Not Found With this Id: ${formId}` });
            }
        } catch (error) {
            res.error(error);
        }
    },
    getFormsByType: async (req, res) => {
        const { query: { formTypeId } } = req;
        try {
            const response = await sails.models.form.find(formTypeId).usingConnection(sails.db);
            if (!response.length) {
                return res.error({ message: `Cannot get Form with formTypeId: ${formTypeId}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },

};


