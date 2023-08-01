
const adminConnection = require('../utils/config').adminConnection;
const Importer = require('../utils/mysql-import');
const { adminDB: { host, user, password } } = require('../../utils/keys');
const { alphaNumeric } = require('../utils/validate');

module.exports = {

  createOrganization: async (data) => {
    try {
      // data.name = data.name.replace(/\s/g, '_').replace(/[^\w\s]/gi, '').replace(/[^A-Z0-9]+/ig, '_');
      const isExist = await sails.models.organization.findOne({ or: [{ organizationId: data.organizationId }, { name: data.name }] });
      if (isExist) {
        throw ({ message: 'organizationId or name Already Exist!' });
      }

      if (!alphaNumeric(data.organizationId)){
        throw ({ message: 'organizationId must contain only alphabets and numbers, spaces or special characters are not allowed.' });
      }

      const roleExist = await sails.models.role.findOne({ name: 'ORGANIZATION' });
      if (roleExist) {
        data.roleId = roleExist.id;
      } else {
        throw { message: `Roles doesn't exist for ORGANIZATION` };
      }
      const isOrgEmailExist = await sails.models.organization.findOne({ email: data.email });
      if (isOrgEmailExist) {
        throw ({ message: 'organization Email Already Exist!' });
      }
      data.password = CipherService.hashPassword(data.password);
      let dbName = new Date().getTime() + '_' + data.organizationId;
      adminConnection.query('CREATE DATABASE `' + dbName + '`;', async (err, dbResult) => {
        if (err) {
          throw err;
        } else {
          if (dbResult.affectedRows === 0) {
            return ({
              message: 'Failur! Error creating organization database.'
            });
          }
          const database = dbName;
          const importer = new Importer({ host, user, password, database });
          await importer.import('api/utils/Dump20220207.sql');
          await sails.models.organization.create({ ...data, organizationDb: dbName }).fetch();

        }
      });
      return { message: 'Organization created Successfully!' };
    } catch (error) {
      throw error;
    }
  },
  loginAdmin: async data => {
    try {
      const user = await sails.models.admin.findOne({ email: data.email }).populate('roleId');
      if (!user) {
        throw { message: 'User Not Found!' };
      } else {
        const comparison = CipherService.comparePassword(data.password, user.password);
        if (!comparison) {
          throw { message: 'Invalid Password!' };
        }
        user.accessToken = await UserService.getAccessToken(user, user.id);
        delete user.password;
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      const password = CipherService.hashPassword(data.password);
      const response = await sails.models.admin.updateOne({ id: data.adminId }).set({ password });
      if (!response) { throw { message: 'Password not Updated!' }; }
      else { return { message: 'Password Updated Successfully!' }; }
    } catch (error) {
      throw error;
    }
  }
};
