/**
 * AppointmentType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointment_type',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    /**
* Associations
*/
    subTypes: {
      collection: 'appointmentsubtype',
      via: 'appointmentTypeId'
    }
  }
};

