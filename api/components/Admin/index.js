const AdminRoutes = require('./AdminRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");
const userValidation = require('./UserJoiValidation');

module.exports = {
    adminRoutes: addPrefixWithRoutes(`/${prefix}/${v1}/admin`, AdminRoutes),
    userValidation
};
