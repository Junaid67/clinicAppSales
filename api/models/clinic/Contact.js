/**
 * Contact.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'contact',
  schema: true,
  attributes: {
    firstName: {
      columnName: 'first_name',
      type: 'string',
      columnType: 'varchar(255)'
    },
    lastName: {
      columnName: 'last_name',
      type: 'string',
      columnType: 'varchar(255)'
    },
    cpsoNumber: {
      columnName: 'cpso_number',
      type: 'string',
      columnType: 'varchar(255)'
    },
    billingNumber: {
      columnName: 'billing_number',
      type: 'string',
      columnType: 'varchar(255)'
    },
    speciality: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    email: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
    * Associations
    */
    addresses: {
      collection: 'ContactAddress',
      via: 'contactId'
    },
  }
};

