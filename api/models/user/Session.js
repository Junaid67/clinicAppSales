/**
 * Session.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {
  tableName: "sessions",
  schema: true,
  attributes: {
    token: {
      type: "string",
      required: true,
      columnType: "varchar(1200)",
      allowNull: false,
    },
    userId: {
      columnName:'user_id',
      model: "User",
    },
    adminId: {
      columnName:'admin_id',
      model: "Admin",
    },
    session_uuid: {
      type: "string",
      allowNull: true,
    }
  }
};
