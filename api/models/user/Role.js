/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: "roles",
    schema: true,
    attributes: {
        name: {
            type: "string",
            required: false,
            columnType: "varchar(45)",
            allowNull: true
        }
    }
};
