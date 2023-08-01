/**
 * DocumentType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'document_type',
  schema: true,
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
* Associations
*/
documentSubtype: {
      collection: 'documentSubtype',
      via: 'documentTypeId'
    }
  }
};

