/**
 * TemplateCategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'template_categories',
  schema: true,
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
      * Associations
      */
    templateParagraph: {
      collection: 'templateParagraph',
      via: 'categoryId'
    }
  }
};

