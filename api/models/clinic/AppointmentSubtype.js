/**
 * AppointmentSubtype.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointment_subtype',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    color: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
  * Associations
  */
    appointmentTypeId: {
      columnName: 'appointment_type_id',
      model: 'appointmentType'
    }
  },

};

