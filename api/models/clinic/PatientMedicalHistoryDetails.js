/**
 * PatientSummaryDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
   tableName: 'patient_medical_history_details',
    schema: true,
    attributes: {
        description: {
          columnName: 'description',
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
      categoryId: {
        columnName: 'category_id',
        model: 'PatientMedicalHistory'
      },
    }
  };
  