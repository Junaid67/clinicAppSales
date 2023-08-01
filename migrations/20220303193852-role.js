'use strict';

var dbm;
var type;
var seed;

const TABLE_NAME = 'roles';

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
  await db.runSql(
    `INSERT INTO ${TABLE_NAME} (id, name,created_at, updated_at) VALUES('1', 'ADMIN', now(), now()), ('2', 'DOCTOR', now(), now()),('3', 'ASSISTANT', now(), now()),('4', 'ORGANIZATION', now(), now())`,
    [],
    (err) => {
      if (err) {
        console.log(`ERROR AT Creating ${TABLE_NAME}`);
        console.log(err);
      }
    }
  );
  return db.runSql(
    `INSERT INTO admin_user (id, user_name, email, password,created_at, updated_at,role_id) VALUES ('1', 'admin', 'admin@app.com', '$2a$10$ZG0I6S1K7Li5tJMlTtLjLeq3p.5qLuStiGr1PuCaHDM63mDPSRu4K', now(), now(),(SELECT id from roles where name = 'ADMIN'))`,
    [],
    (err) => {
      if (err) {
        console.log('ERROR AT Creating Admin');
        console.log(err);
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
