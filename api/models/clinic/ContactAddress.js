/**
 * ContactAddress.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'contact_addresses',
  schema: true,
  attributes: {
    address: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    city: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    province: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    postalCode: {
      columnName: 'postal_code',
      type: 'string',
      columnType: 'varchar(255)'
    },
    phone: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    fax: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
    * Associations
    */
    contactId: {
      columnName: 'contact_id',
      model: 'contact'
    }
  },

};

