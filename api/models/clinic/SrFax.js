/**
 * SrFax.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sr_fax',
  schema: true,
  attributes: {
    faxId: {
      columnName: 'fax_id',
      type: 'number',
      columnType: 'INT',
      allowNull: true
    },
    faxPassword: {
      columnName: 'fax_password',
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: true
    },
    faxEmail: {
      columnName: 'fax_email',
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: true
    },
    faxCallerId: {
      columnName: 'fax_caller_id',
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: true
    },
    /**
     * Associations
     */
  }
};

