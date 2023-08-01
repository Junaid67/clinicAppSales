/**
 * PatientReport.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  table: 'patient_reports',
  schema: true,
  attributes: {
    message: {
      type: 'string',
      columnType: 'longtext'
    },
    /**
     * Associations
     */
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    },
    documentId: {
      columnName: 'document_id',
      model: 'documentInbox'
    },
    waitlistId: {
      columnName: 'waitlist_id',
      model: 'patientsWaitlist'
    },
    documentTypeId: {
      columnName: 'document_type_id',
      model: 'documentType'
    },
    documentSubtypeId: {
      columnName: 'document_subtype_id',
      model: 'documentSubtype'
    }
  }
};

