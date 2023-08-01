/**
 * ClinicDataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
    saveClinicData: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.clinicdata.updateOne({ id: 1 }).set(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getClinicData: async (req, res) => {
        try {
            const response = await sails.models.clinicdata.findOne({ id: 1 }).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateClinicData: async (req, res) => {
        const { body } = req;
        try {
            const response = await sails.models.clinicdata.updateOne({ id: body.id }).set({
                title: body.title
            }).usingConnection(sails.db);
            if (!response) {
                return res.error({ message: `Cannot get updateClinicData with id: ${body.id}` });
            }
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteClinicData: async (req, res) => {
        const { query: { clinicDataId } } = req;
        try {
            const response = await sails.models.clinicdata.destroyOne({ id: clinicDataId }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'ClinicData Deleted Successfully!' });
            } else {
                res.ok({ mesage: `ClinicData Not Found With this Id: ${clinicDataId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }
};
