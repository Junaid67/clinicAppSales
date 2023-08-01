/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    login: async (req, res) => {
        const { body } = req;
        try {
            const response = await UserService.login(body);
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    createUser: async (req, res) => {
        const { body } = req;
        try {
            const response = await UserService.createUser({ ...body });
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    updateUser: async (req, res) => {
        const { body, query: { userId } } = req;
        try {
            const response = await UserService.updateUser(body, userId);
            delete response.password;
            res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getUserByOrgId: async (req, res) => {
        const { query: { organizationId } } = req;
        try {
            let response = [];
            let users = await sails.models.user.find({ organizationId, deletedAt: null }).usingConnection(sails.db);
            if (!users.length) {
                return res.error({ message: 'User Not Found!' });
            }
            for (const user of users) {
                user.roleId = await sails.models.role.findOne({ id: user.roleId });
                delete user.password;
                response.push(user);
            }
            return res.ok(response);
        } catch (error) {
            res.error(error);
        }
    },
    getAllPhysician: async (req, res) => {
        try {
            const role = await sails.models.role.findOne({ name: 'DOCTOR' });
            let users = await sails.models.user.find({ roleId: role.id, deletedAt: null }).usingConnection(sails.db);
            users = users.map((res) => {
                res.password = res.password;
                res.roleId = role;
                delete res.password;
                return res;
            });
            if (!users.length) {
                return res.error({ message: 'User Not Found!' });
            } else {
                res.ok(users);
            }
        } catch (error) {
            res.error(error);
        }
    },
    updatePhysicianProfile: async(req, res) => {
        const { body } = req;
        try {
            let users = await sails.models.user.update({id: body.id}).set(
                body).usingConnection(sails.db);
            users = users.map((res) => {
                res.password = res.password;
                delete res.password;
                return res;
            });
            if (!users.length) {
                return res.error({ message: 'Physician Profile Not Found!' });
            } else {
               return res.ok(users);
            }
        } catch (error) {
          return  res.error(error);
        }
    },
    deleteUser: async(req, res) => {
        const { query: { userId } } = req;
        try{
            const response = await sails.models.user.updateOne({ id: userId }).set({ deletedAt: new Date() }).usingConnection(sails.db);
            if (!response) {
              res.badRequest(`User Not Found With this Id: ${userId}`);
            } else {
              res.ok({ mesage: 'User Deleted Successfully!' });
            }
        }
        catch (error) {
            res.error(error);
        }
    },
    getUserRoles: async (req, res) => {
        try {
            const role = await sails.models.role.find({ name: ['DOCTOR','ASSISTANT']});
            if (!role.length) {
                return res.error({ message: 'Role Not Found!' });
            } 
               return res.ok(role);
    }catch (error) {
       return res.error(error);
    }
},
resetPhysicianPassword: async (req, res) => {
    const { body } = req;
    try {
        const response = await UserService.resetPhysicianPassword(body);
        res.ok(response);
    } catch (error) {
        res.error(error);
    }
},
};

