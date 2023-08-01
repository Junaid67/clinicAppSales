const AdminService = require("../services/AdminService");
const { removeFieldsFromObject } = require('../utils/validate');

/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

	createOrganization: async (req, res) => {
		const { body } = req;
		try {
			const response = await AdminService.createOrganization(body);
			if (!response) {
				return res.error({ message: 'Organization Could not create!' });
			} else {
				res.ok({}, response);
			}
		} catch (error) {
			res.error(error);
		}
	},
	updateOrganization: async (req, res) => {
		const { body, query: { id } } = req;
		try {
			const response = await sails.models.organization.updateOne({ id }).set(body);
			if (!response) {
				return res.error({ message: 'Organization Could not update!' });
			} else {
				res.ok(response);
			}
		} catch (error) {
			res.error(error);
		}
	},
	getOrganizations: async (req, res) => {
		try {
			let response = await sails.models.organization.find();
			// response = response.map((res) => {
            //     res.password = res.password;
            //     delete res.password;
            //     return res;
            // });
			response = removeFieldsFromObject(response, ['password', 'organizationDb']);
			if (!response.length) {
				return res.error({ message: 'Organization Not Found!' });
			} else {
				res.ok(response);
			}
		} catch (error) {
			res.error(error);
		}
	},
	login: async (req, res) => {
		const { body } = req;
		try {
			const response = await AdminService.loginAdmin(body);
			res.ok(response)
		} catch (error) {
			res.error(error);
		}
	},
	resetPassword: async (req, res) => {
		const { body } = req;
		try {
			const response = await AdminService.resetPassword(body);
			res.ok(response);
		} catch (error) {
			res.error(error);
		}
	},


};

