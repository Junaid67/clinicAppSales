/**
 * OrganizationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async (req, res) => {
    const { body } = req;
    try {
      const response = await OrganizationService.login(body);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  }
};

