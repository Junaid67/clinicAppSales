/**
 * AppointmentLocation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {
  tableName: 'appointment_location',
  schema: true,
  attributes: {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    location: {
      type: 'string',
      columnType: 'varchar(255)'
    }
  }
}
