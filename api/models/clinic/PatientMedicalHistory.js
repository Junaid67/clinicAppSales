/**
 * PatientSummaryCategories.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patient_medical_history',
  schema: true,
  attributes: {
    category: {
        type: 'string',
        columnType: 'longtext'
      },
    
    /**
     * Associations
     */
  }
};

