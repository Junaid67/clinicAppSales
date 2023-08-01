/**
 * FaxOutbox.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  table: 'fax_outbox',
  schema: true,
  attributes: {
    faxNumber: {
      columnName: 'fax_number',
      type: 'string',
      columnType: 'varchar(45)'
    },
    documentType: {
      columnName: 'document_type',
      type: 'string',
      columnType: 'varchar(45)'
    },
    file: {
      type: 'string',
      columnType: 'varchar(45)'
    },
    faxId: {
      columnName: 'fax_id',
      type: 'string',
      columnType: 'varchar(45)'
    },
    /**
     * Associations
     */
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    },
  }
};

