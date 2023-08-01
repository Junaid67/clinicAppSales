/**
 * PatientNotes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patient_notes',
  schema: true,
  attributes: {
    notes: {
      type: 'string',
      columnType: 'longtext'
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

