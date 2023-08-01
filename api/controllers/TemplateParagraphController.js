/**
 * TemplateParagraphController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createTemplateParagraph: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.templateparagraph.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getTemplateParagraphs: async (req, res) => {
        try {
            const response = await sails.models.templateparagraph.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateTemplateParagraph: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.templateparagraph.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateTemplateParagraph with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteTemplateParagraph: async (req, res) => {
        const { query: { templateparagraphId } } = req;
        try {
            const response = await sails.models.templateparagraph.destroyOne({ id: templateparagraphId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Template Paragraph  Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Template Paragraph Not Found With this Id: ${templateparagraphId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

