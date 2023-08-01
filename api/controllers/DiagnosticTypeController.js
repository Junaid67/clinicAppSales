/**
 * DiagnosticTypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    createDiagnosticTypes: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.diagnostictype.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getDiagnosticTypes: async (req, res) => {
        try {
            const response = await sails.models.diagnostictype.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateDiagnosticTypes: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.diagnostictype.updateOne({ id: body.id }).set({
                title: body.title
            }).usingConnection(sails.db);
            if (!response) {
                res.error({ message: 'Cannot update DiagnosticTypes' });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteDiagnosticType: async (req, res) => {
        const { query: { diagnostictypeId } } = req;
        try {
            const response = await sails.models.diagnostictype.destroyOne({ id: diagnostictypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Diagnostic Type Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Diagnostic Type Not Found With this Id: ${diagnostictypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

