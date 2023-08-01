/**
 * PatientsWaitlistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    createRole: async (req, res) => {
        const { body } = req;
        try {
            const roleExist = await sails.models.role.findOne({ name: body.name.toUpperCase() });
            if (roleExist) {
                return res.error({ message: `Role already exist ${body.name}` });
            }
            const response = await sails.models.role.create(body).fetch();
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    }
}