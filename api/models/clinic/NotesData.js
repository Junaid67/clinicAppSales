/**
 * NotesData.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'notesData',
  schema: true,
  attributes: {
    title: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    headH: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    headP: {
      type: 'string',
      columnType: 'longtext'
    },
    footerH: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    footerP: {
      type: 'string',
      columnType: 'longtext'
    },
    sign: {
      type: 'string',
      columnType: 'longtext'
    },
    logo: {
      type: 'string',
      columnType: 'longtext'
    },
    logoWidth: {
      columnName: 'logo_width',
      type: 'string',
      columnType: 'varchar(255)'
    },
    logoHeight: {
      columnName: 'logo_height',
      type: 'string',
      columnType: 'varchar(255)'
    },
    customDate: {
      columnName: 'custom_date',
      type: 'string',
      columnType: 'DATETIME'
    },
    bodyStyle: {
      columnName: 'body_style',
      type: 'string',
      columnType: 'longtext'
    }
  },

};

