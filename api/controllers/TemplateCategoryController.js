/**
 * TemplateCategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createTemplateCategory: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.templatecategory.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getTemplateCategory: async (req, res) => {
        try {
            const response = await sails.models.templatecategory.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateTemplateCategory: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.templatecategory.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateTemplateCategory with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteTemplateCategory: async (req, res) => {
        const { query: { templatecategoryId } } = req;
        try {
            const response = await sails.models.templatecategory.destroyOne({ id: templatecategoryId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Template Category  Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Template Category Not Found With this Id: ${templatecategoryId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};


