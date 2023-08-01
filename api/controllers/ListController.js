/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createList: async (req, res) => {
        const { body: { title, patientIds } } = req;
        try {
            const isExists = await sails.models.list.findOne({ title }).usingConnection(sails.db);
            if (isExists) {
                return res.error({ message: `List Already Exists With the title ${title}` });
            }
            const responseList = await sails.models.list.create({ title }).fetch().usingConnection(sails.db);
            if (patientIds != undefined && patientIds.length > 0) {
                let values = [];
                patientIds.forEach((item) => {
                    let temp = [];
                    temp.push(responseList.id);
                    temp.push(item);
                    values.push(temp);
                });
                const response = await sails.models.patientstolist.createEach(values).fetch().usingConnection(sails.db);
                res.ok(response);
            } else {
                res.ok(responseList)
            }
        } catch (error) {
            res.error(error);
        }
    },
    getLists: async (req, res) => {
        try {
            const response = await sails.models.list.find().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateList: async (req, res) => {
        const { body } = req;
        try {
            const isExists = await sails.models.list.findOne({ title: body.title });
            if (isExists) {
                return res.error({ message: `List Already Exists With the title ${title}` });
            }
            const response = await sails.models.list.updateOne({ id: body.id }).set({
                title: body.title
            }).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateList with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteList: async (req, res) => {
        const { query: { listId } } = req;
        try {
            const responeToList = await sails.models.patientstolist.destroy({ listId });

            const response = await sails.models.list.destroyOne({ id: listId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'List Deleted Successfully!' });
            } else {
                res.ok({ mesage: `List Not Found With this Id: ${listId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }
};

