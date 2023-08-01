/**
 * TemplateParagraph.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'template_paragraphs',
  schema: true,
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    paragraph: {
      type: 'string',
      columnType: 'longtext'
    },
    /**
     * Associations
     */
    categoryId: {
      columnName: 'category_id',
      model: 'templateCategory'
    }
  },

};

