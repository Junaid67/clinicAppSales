'use strict';

var dbm;
var type;
var seed;
const TABLE_NAME = 'organizations';

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.createTable(
    TABLE_NAME,
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'varchar(255)' },
      email: { type: 'varchar(255)' },
      organization_id: { type: 'varchar(255)' },
      organization_db: { type: 'varchar(255)' },
      status: { type: 'int' },
      valid_till: { type: 'datetime', defaultValue: null },
      created_at: { type: 'datetime', defaultValue: null },
      updated_at: { type: 'datetime', defaultValue: null },
      deleted_at: { type: 'datetime', defaultValue: null },
    },
    (err) => {
      if (err) {
        console.log(`ERROR AT CREATING ${TABLE_NAME} TABLE`);
      } else {
      }
    }
  );
};

exports.down = async function (db) {
  return await db.dropTable(TABLE_NAME);

};

exports._meta = {
  "version": 1
};
