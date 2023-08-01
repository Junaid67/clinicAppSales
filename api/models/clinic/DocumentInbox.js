/**
 * DocumentInbox.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'document_inbox',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      columnType: 'text'
    },
    message: {
      type: 'string',
      columnType: 'longtext'
    },
    type: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    faxFrom: {
      columnName: 'fax_from',
      type: 'string',
      columnType: 'varchar(255)'
    },
    autoDate: {
      columnName: 'auto_date',
      type: 'ref',
      columnType: 'date'
    },
    receivedAt: {
      columnName: 'received_at',
      type: 'ref',
      columnType: 'datetime'
    },
    status: {
      type: 'number',
      columnType: 'int'
    },
    pdfFile: {
      columnName: 'pdf_file',
      type: 'string',
      columnType: 'text'
    },
    review: {
      type: 'number',
      columnType: 'int'
    },
    isFaxed: {
      columnName: 'is_faxed',
      type: 'boolean',
      columnType: 'boolean',
      defaultsTo: false
    },
    reviewStatus: {
      columnName: 'review_status',
      type: 'number',
      columnType: 'int'
    },
    isArchived: {
      columnName: 'is_archived',
      type: 'boolean',
      columnType: 'boolean',
      defaultsTo: false
    },
    userTimestamp: {
      columnName: 'user_timestamp',
      type: 'ref',
      columnType: 'date'
    },
      /**
     * Associations
     */
       patientId: {
        columnName: 'patient_id',
        model: 'patient'
      },
      waitlistId: {
        columnName: 'waitlist_id',
        model: 'patientsWaitlist'
      },
      documentTypeId: {
        columnName: 'document_type_id',
        model: 'documentType'
      },
      documentSubtypeId: {
        columnName: 'document_subtype_id',
        model: 'documentSubtype'
      }
  },

};

