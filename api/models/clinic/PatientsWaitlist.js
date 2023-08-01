/**
 * PatientsWaitlist.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patients_waitlist',
  schema: true,
  attributes: {
    status: {
      type: 'number',
      columnType: 'int'
    },
    type: {
      type: 'number',
      columnType: 'int'
    },
    /**
     * Associations
     */
    activityId: {
      columnName: 'activity_id',
      model: 'patientTasks'
    },
    documentId: {
      columnName: 'document_id',
      model: 'documentinbox'
    },
    formtypeId: {
      columnName: 'form_type_id',
      model: 'formtype'
    },
    documentTypeId: {
      columnName: 'document_type_id',
      model: 'documenttype'
    },
    documentSubtypeId: {
      columnName: 'document_subtype_id',
      model: 'documentsubtype'
    },
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    }
  },

};

