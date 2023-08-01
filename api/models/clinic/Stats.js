 /**
 * Stats.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'stats',
    schema: true,
    attributes: {
 /**
     * Associations
     */
  patientId: {
    columnName: 'patient_id',
    model: 'patient'
  },
  documentTypeId: {
    columnName: 'document_type_id',
    model: 'documentType'
  },
  patientTasksId: {
    columnName: 'patient_tasks_id',
    model: 'patientTasks'
  },
  formTypeId: {
    columnName: 'form_type_id',
    model: 'formType'
  },
  documentInboxId: {
    columnName: 'document_inbox_id',
    model: 'documentInbox'
  },
  documentTypeId: {
    columnName: 'document_type_id',
    model: 'documentType'
  },
  documentSubtypeId: {
    columnName: 'document_subtype_id',
    model: 'documentSubtype'
  },
  appointmentId: {
    columnName: 'appointment_id',
    model: 'appointmentType'
  },
  appointmentTypeId: {
    columnName: 'appointment_type_id',
    model: 'appointmentType'
  },
  appointmentSubTypeId: {
    columnName: 'appointment_subtype_id',
    model: 'appointmentSubType'
  }
}
};


