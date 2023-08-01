/**
 * FeeCode.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'fee_codes',
  schema: true,
  attributes: {
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
    code: {
      type: 'string',
      columnType: 'varchar(45)'
    },
    effectiveDate: {
      columnName: 'effective_date',
      type: 'ref',
      columnType: 'date'
    },
    terminationDate: {
      columnName: 'termination_date',
      type: 'ref',
      columnType: 'date'
    },
    providerFee: {
      columnName: 'provider_fee',
      type: 'number',
      columnType: 'int'
    },
    assistantFee: {
      columnName: 'assistant_fee',
      type: 'number',
      columnType: 'int'
    },
    specialistFee: {
      columnName: 'specialist_fee',
      type: 'number',
      columnType: 'int'
    },
    anaesthetistFee: {
      columnName: 'anaesthetist_fee',
      type: 'number',
      columnType: 'int'
    },
    nonAnaesthetistFee: {
      columnName: 'non_anaesthetist_fee',
      type: 'number',
      columnType: 'int'
    }
  }
};

