/**
 * SrFaxController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');

module.exports = {
    createSRFAX: async (req, res) => {
        const { body } = req;
        let opts = {
            action: "Get_Fax_Outbox",
            access_id: body.faxId,
            access_pwd: body.faxPassword,
        };

        let json = await axios.post(process.env.SR_FAX_URL, opts);
        if (json.data && json.data.Status && json.data.Status == 'Failed') {
            return res.ok({
                message: `Unable to login to srFax with provided data.`,
                success: false,
                data: json.data
            });
        }

        try {
            const response = await sails.models.srfax.create(body).fetch().usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getSRFAX: async (req, res) => {
        
        try {
            const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
            let opts = {
                action: "Get_Fax_Outbox",
                access_id: srFaxAcc.faxId,
                access_pwd: srFaxAcc.faxPassword,
            };
            if (srFaxAcc.faxId == null || srFaxAcc.faxPassword == null) {
                return res.ok({
                    message: `There is an issue while getting faxes because of faxId or faxPassword is null.`,
                    success: false
                });
            }
            let json = await axios.post(process.env.SR_FAX_URL, opts);
            if (json.data && json.data.Status && json.data.Status == 'Failed') {
                return res.ok({
                    message: `Unable to login to srFax.`,
                    success: false,
                    data: json.data
                });
            }
            res.ok(srFaxAcc);
        } catch (error) {
            res.error(error);
        }
    },
    updateSRFAX: async (req, res) => {
        const { body } = req;
        let opts = {
            action: "Get_Fax_Outbox",
            access_id: body.faxId,
            access_pwd: body.faxPassword,
        };

        let json = await axios.post(process.env.SR_FAX_URL, opts);
        if (json.data && json.data.Status && json.data.Status == 'Failed') {
            return res.ok({
                message: `Unable to login to srFax with provided data.`,
                success: false,
                data: json.data
            });
        }
        
        try {
            const response = await sails.models.srfax.updateOne({ id: 1 }).set(body).usingConnection(sails.db);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    deleteSRFAX: async (req, res) => {
        // const { query: { srfaxId } } = req;
        try {
            const response = await sails.models.srfax.updateOne({ id: 1 }).set({
                faxId: null,
                faxPassword: null,
                faxEmail: null,
                faxCallerId: null
            }).usingConnection(sails.db);
            if (response) {
                res.ok({ mesage: 'SR Fax Deleted Successfully!' });
            } else {
                res.ok({ mesage: `SR Fax Not Found With this Id: ${srfaxId}` });
            }
        } catch (error) {
            res.error(error);
        }
    }

};

