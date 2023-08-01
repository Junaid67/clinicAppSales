/**
 * Organization.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'organizations',
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    email: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    organizationId: {
      columnName: 'organization_id',
      type: 'string',
      columnType: 'varchar(255)'

    },
    password: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    organizationDb: {
      columnName: 'organization_db',
      type: 'string',
      columnType: 'varchar(255)'
    },
    status: {
      type: 'number',
      columnType: 'integer'
    },
    validTill: {
      columnName: 'valid_till',
      type: 'ref',
      columnType: 'datetime'
    },
    roleId: {
      columnName: 'role_id',
      model: 'Role'
    }
  }

};

