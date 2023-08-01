/* eslint-disable indent */
/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    saveContact: async (req, res) => {
        const { body } = req;
        try {
            const response = await ContactService.saveContact(body);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getContacts: async (req, res) => {
        const { query: { id } } = req;
        try {
            const contacts = await sails.models.contact.find({ where: { id }}).populate('addresses').usingConnection(sails.db);
            if (contacts.length) {
                res.ok(contacts);
            } else {
                res.error({ message: 'Contact not Found!' });
            }
        } catch (error) {
            res.error(error);
        }
    },
    updateContact: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.contact.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateContact with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteContact: async (req, res) => {
        const { query: { contactId } } = req;
        try {
            const response = await sails.models.contact.destroyOne({ id: contactId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'Contact Deleted Successfully!' });
            } else {
                res.ok({ mesage: `Contact Not Found With this Id: ${contactId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

