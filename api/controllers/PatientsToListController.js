/**
 * PatientsToListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    addPatientInList: async (req, res) => {
        const { body: { listId, patientId } } = req;
        try {
            const listExists = await sails.models.patientstolist.findOne({ listId, patientId }).usingConnection(sails.db);
            if (listExists) {
                return res.error({ message: `list with patientId ${patientId} and listId ${listId} already exist.` });
            }
            const list = await sails.models.patientstolist.create({ listId, patientId }).fetch().usingConnection(sails.db);
            res.ok(list);
        } catch (error) {
            res.error(error);
        }
    },
    getPatientsByList: async (req, res) => {
        try {
            const response = await PatientToListService.getPatientsByList();
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    shiftPatientInLists: async (req, res) => {
        const { body: { listRefId, toListId } } = req;
        try {
            const response = await sails.models.patientstolist.updateOne({ id: listRefId }).set({ listId: toListId }).fetch().usingConnection(sails.db);
            if (response) {
                return res.ok({ message: `Patient moved to list with id(${toListId}) successfully!` });
            } else {
                return res.error({ message: `There is an issue in moving Patient to list with id patientstolist Not found (${toListId})` });
            }
        } catch (error) {
            res.error(error);
        }
    },
    updatePatientsInList: async (req, res) => {
        /**
         * TODO
         */
    },
    removePatientInList: async (req, res) => {
        const { body: { patientId, listId } } = req;
        try {
            const response = await sails.models.patientstolist.destroyOne({ patientId, listId }).usingConnection(sails.db);
            if (response) {
                return res.ok({ mesage: `Patient(${patientId}) from list(${listId}) removed successfully!` });
            } else {
                return res.ok({ mesage: `No Patient(${patientId}) with list(${listId}) exists!` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

