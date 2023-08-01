/**
 * DocumentSubtype.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'document_subtype',
  schema: true,
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
     * Associations
     */
    documentTypeId: {
      columnName: 'document_type_id',
      model: 'documentType'
    }
  }
};

