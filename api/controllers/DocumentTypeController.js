/**
 * DocumentTypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createDocumentType: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.documenttype.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getDocumentTypes: async (req, res) => {
        try {
            const response = await sails.models.documenttype.find().populate('documentSubtype').usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateDocumentTypes: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.documenttype.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateDocumentTypes with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteDocType: async (req, res) => {
        const { query: { documentTypeId } } = req;
        try {
            const response = await sails.models.documenttype.destroyOne({ id: documentTypeId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'DocumentType Deleted Successfully!' });
            } else {
                res.ok({ mesage: `DocumentType Not Found With this Id: ${documentTypeId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

