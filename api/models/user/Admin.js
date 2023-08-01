/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'admin_user',
  schema: true,
  attributes: {
    userName: {
      type: 'string',
      columnName:'user_name',
      columnType: 'varchar(255)'
    },
    email: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    password: {
      type: 'string',
      columnType: 'longtext',
    },
    roleId: {
      columnName: 'role_id',
      model: 'Role'
    }
  }

};

