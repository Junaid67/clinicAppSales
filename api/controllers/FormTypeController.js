/**
 * FormTypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    saveFormType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.formtype.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getFormTypes: async (req, res) => {
        try {
            const response = await sails.models.formtype.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateFormType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.formtype.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteFormType: async (req, res) => {
        const { query: { formTypeId } } = req;
        try {
            const response = await sails.models.formtype.destroyOne({ id: formTypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'FormType  Deleted Successfully!' });
            } else {
                res.ok({ mesage: `FormType Not Found With this Id: ${formTypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

