/**
 * ClinicRoom.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'clinic_rooms',
  schema: true,
  attributes: {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    name:{
      type: 'string',
      columnType: 'varchar(20)'
    },
  }
}
