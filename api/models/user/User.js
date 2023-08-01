/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  schema: true,
  attributes: {
    name: {
      type: 'string',
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
    phone: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    userId: {
      columnName: 'user_id',
      type: 'string',
      columnType: 'varchar(255)'
    },
    roleId: {
      columnName: 'role_id',
      type: 'number',
      columnType: 'int'
    },
    organizationId: {
      columnName: 'organization_id',
      type: 'string',
      columnType: 'varchar(255)'
    },
    createdBy: {
      columnName: 'created_by',
      type: 'number',
      columnType: 'int'
    },
    /**
        * Associations
        */
    patients: {
      collection: 'patient',
      via: 'physicianId'
    },
    appointments: {
      collection: 'appointment',
      via: 'physicianId'
    },
  }
};

