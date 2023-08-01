
const StatsRoutes = require('./StatsRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    statsRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, StatsRoutes),
};
