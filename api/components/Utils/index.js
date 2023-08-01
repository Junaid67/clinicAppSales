
const UtilsRoutes = require('./UtilsRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    utilsRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, UtilsRoutes),
};
