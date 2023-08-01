/**
 * PatientsToList.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patients_to_list',
  schema: true,
  attributes: {
    /**
    * Associations
    */
    listId: {
      columnName: 'list_id',
      model: 'list'
    },
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    }
  },
};

