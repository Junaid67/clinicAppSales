/**
 * Appointment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointments',
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  schema: true,
  attributes: {
    // appointmentType:{
    //   columnName: 'appointment_type',
    //   type: 'number',
    //   columnType: 'int'
    // },
    // appointmentSubType:{
    //   columnName: 'appointment_subtype',
    //   type: 'number',
    //   columnType: 'int'
    // },
    date: {
      columnName: 'date',
      type: 'string',
      columnType: 'datetime'
    },
    provider: {
      columnName: 'provider',
      type: 'ref',
      columnType: 'int(10)'
    },
    duration: {
      columnName: 'duration',
      type: 'ref',
      columnType: 'int(11)'
    },
    week: {
      columnName: 'week',
      type: 'ref',
      columnType: 'int(11)'
    },
    slot: {
      columnName: 'slot',
      type: 'ref',
      columnType: 'int(11)'
    },
    task: {
      columnName: 'task',
      type: 'ref',
      columnType: 'int(255)'
    },


    /**
     * Associations
     */
    appointmentSubTypeId: {
      columnName: 'appointment_subtype',
      model: 'appointmentSubType'
    },
    appointmentTypeId: {
      columnName: 'appointment_type',
      model: 'appointmentType'
    },
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    },
    location: {
      columnName: 'location',
      model: 'appointmentLocation'
    },
    status: {
      columnName: 'status',
      model: 'appointmentStatus'
    },
    room: {
      columnName: 'room',
      model: 'clinicRoom'
    },
    physicianId: {
      columnName: 'physician_id',
      model: 'user'
    },
    patientTasks: {
      collection: 'PatientTasks',
      via: 'appointmentId'
    },
  }
};

