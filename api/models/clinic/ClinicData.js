/**
 * ClinicData.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'clinic_data',
  schema: true,
  attributes: {
    physicianFirstName: {
      columnName: 'physician_first_name',
      type: 'string',
      columnType: 'varchar(70)'
    },
    physicianLastName: {
      columnName: 'physician_last_name',
      type: 'string',
      columnType: 'varchar(70)'
    },
    cpso: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    billingNo: {
      columnName: 'billing_no',
      type: 'string',
      columnType: 'varchar(50)'
    },
    faxNo: {
      columnName: 'fax_no',
      type: 'string',
      columnType: 'varchar(50)'
    },
    goSecureEmail: {
      columnName: 'go_secure_email',
      type: 'string',
      columnType: 'varchar(100)'
    },
    goSecurePassword: {
      columnName: 'go_secure_password',
      type: 'string',
      columnType: 'varchar(100)'
    }
  }
};

