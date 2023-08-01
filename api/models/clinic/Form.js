/**
 * Form.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'forms',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    jsonData: {
      columnName: 'json_data',
      type: 'string',
      columnType: 'varchar(255)'
    },
    uploadPath: {
      columnName: 'upload_path',
      type: 'string',
      columnType: 'longtext'
    },
    /**
    * Associations
    */
    formTypeId: {
      columnName: 'form_type_id',
      model: 'formType'
    },
    patientTasks: {
      collection: 'patientTasks',
      via: 'formId'
    },
  },

};

