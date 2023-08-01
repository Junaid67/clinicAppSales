/**
 * DocumentSubtypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
    createDocumentSubType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.documentsubtype.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getDocumentSubTypes: async (req, res) => {
        try {
            const response = await sails.models.documentsubtype.find().populate('documentTypeId').usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateDocumentSubTypes: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.documentsubtype.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateDocumentSubTypes with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteDocSubType: async (req, res) => {
        const { query: { documentSubTypeId } } = req;
        try {
            const response = await sails.models.documentsubtype.destroyOne({ id: documentSubTypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Documentsubtype Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Documentsubtype Not Found With this Id: ${documentSubTypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }
};


