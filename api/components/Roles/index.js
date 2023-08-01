const roleJoiValidation = require('./RoleJoiValidation');
const RoleRoutes = require('./RoleRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    roleRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, RoleRoutes),
    roleJoiValidation
};
