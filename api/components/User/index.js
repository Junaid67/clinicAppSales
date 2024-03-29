
const UserRoutes = require('./UserRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    userRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, UserRoutes),
};
