const uuid4 = require('uuid4');
const helpers = require('../utils/validate');

module.exports = {
  createUser: async data => {
    try {
      const roleExist = await sails.models.role.findOne({ id: data.roleId });
      if (!roleExist) {
        throw { message: `Roles doesn't exist with  id ${data.roleId}` };
      }
      const userExist = await sails.models.user.findOne({ email: data.email }).usingConnection(sails.db);
      if (userExist) {
        throw { message: 'User Already exists with same email!' };
      }
      const userIdExist = await sails.models.user.findOne({ userId: data.userId }).usingConnection(sails.db);
      if (userIdExist) {
        throw { message: 'User Already exists with same userId!' };
      }
      const organizationExist = await sails.models.organization.findOne({ organizationId: data.organizationId });
      if (!organizationExist) {
        throw { message: 'Invalid OrganizationId!' };
      }
      else {
        data.password = CipherService.hashPassword(data.password);
        let response = await sails.models.user.create(data).fetch().usingConnection(sails.db);
        if (!response) {
          throw { message: 'User not created!' };
        }
        else {
          response.role = await sails.models.role.findOne({ id: response.roleId });
          delete response.roleId;
          delete response.password;
          return response;
        }
      }
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (data, userId) => {
    try {
      const userExist = await sails.models.user.findOne({ id: userId }).usingConnection(sails.db);
      if (!userExist) {
        throw { message: 'User Not Found!' };
      } else {
        if (data.password) { data.password = CipherService.hashPassword(data.password); }
        const response = await sails.models.user.updateOne({ id: userId }).set(data).usingConnection(sails.db);
        if (!response) {
          throw { message: 'User not Update!' };
        }
        else {
          return response;
        }
      }
    } catch (error) {
      throw error;
    }
  },
  login: async data => {
    try {
      let user = await sails.models.user.findOne({ userId: data.userId, deletedAt: null }).usingConnection(sails.db);
      if (!user) {
        throw { message: 'User Not Found!' };
      } else {
        const role = await sails.models.role.findOne({ id: user.roleId });
        user.roleId = role;
        const comparison = CipherService.comparePassword(data.password, user.password);
        if (!comparison) {
          throw { message: 'Invalid Password!' };
        }
        user.accessToken = await UserService.getAccessToken(user);
        return {
          name: user.name,
          profile_type: user.roleId.name || '',
          token: user.accessToken,
          userId: user.userId
        };
      }
    } catch (error) {
      throw error;
    }
  },
  getAccessToken: async ({ id, email, organizationId, roleId }, admin) => {
    if (helpers.isJson(organizationId)) {
      organizationId = organizationId.id;
    }
    const session_uuid = uuid4();
    const accessToken = CipherService.createToken({
      id: id,
      email: email,
      session_uuid: session_uuid,
      orgId: organizationId ? organizationId : '',
      roleId: roleId ? roleId.id : ''
    });
    if (!accessToken) {
      throw { message: 'Could not generate AccessToken!' };
    }
    const newSession = await sails.models.session.create({
      userId: admin ? null : id,
      adminId: admin ? admin : null,
      token: accessToken,
      session_uuid: session_uuid
    }).fetch();
    if (!newSession) {
      throw { message: 'Could not update access token' };
    }
    return accessToken;

  },
  resetPhysicianPassword: async (data) => {
    try {
      const password = CipherService.hashPassword(data.password);
      const response = await sails.models.user.updateOne({ id: data.userId }).set({ password });
      if (!response) { throw { message: 'Password not Updated!' }; }
      else { return { message: 'Password Updated Successfully!' }; }
    } catch (error) {
      throw error;
    }
  }
};
