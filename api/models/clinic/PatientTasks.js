/**
 * PatientTasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patient_tasks',
  schema: true,
  attributes: {
    followup: {
      type: 'ref',
      columnType: 'DATE'
    },
    followupStatus: {
      columnName: 'followup_status',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    form: {
      type: 'string',
      allowNull: true,
      columnType: 'LONGTEXT'
    },
    formPdf: {
      columnName: 'form_pdf',
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    formStatus: {
      columnName: 'form_status',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    note: {
      type: 'string',
      allowNull: true,
      columnType: 'LONGTEXT'
    },
    // noteTo: {
    //   columnName: 'note_to',
    //   type: 'number',
    //   allowNull: true,
    //   columnType: 'INT'
    // },
    faxNumber: {
      columnName: 'fax_number',
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    noteCC: {
      columnName: 'note_cc',
      type: 'string',
      allowNull: true,
      columnType: 'longtext'
    },
    notePdf: {
      columnName: 'note_pdf',
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    noteStatus: {
      columnName: 'note_status',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    noteDrawnPdf: {
      columnName: 'note_drawn_pdf',
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    bill: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    billStatus: {
      columnName: 'bill_status',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    customMessage: {
      columnName: 'custom_message',
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    customMessageStatus: {
      columnName: 'custom_message_status',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    seen: {
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    prescription: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    prescriptionStatus: {
      columnName: 'prescription_status',
      allowNull: true,
      type: 'number',
      columnType: 'INT'
    },
    paragraphId: {
      columnName: 'paragraph_id',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    noteId: {
      columnName: 'note_id',
      type: 'number',
      allowNull: true,
      columnType: 'INT'
    },
    /**
     * Associations
     */
    patientId: {
      columnName: 'patient_id',
      model: 'patient'
    },
    formId: {
      columnName: 'form_id',
      model: 'form'
    },
    formTypeId: {
      columnName: 'form_type_id',
      model: 'formType'
    },
    noteTo: {
      columnName: 'note_to',
      model: 'contact'
    },
    appointmentId: {
      columnName: 'appointment_id',
      model: 'appointment'
    },
  },
};

