/**
 * PatientMetadata.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patient_metadata',
  schema: true,
  attributes: {
    faxNumber: {
      columnName: 'fax_number',
      type: 'string',
      columnType: 'varchar(50)'
    },
    documentType: {
      columnName: 'document_type',
      type: 'string',
      columnType: 'varchar(50)'
    },
    file: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    faxId: {
      columnName: 'fax_id',
      type: 'string',
      columnType: 'varchar(50)'
    },
    /**
    * Associations
    */
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    }
  },

};

