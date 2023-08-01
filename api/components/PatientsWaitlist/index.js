const PatientsWaitlistRoutes = require('./PatientsWaitlistRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    patientsWaitlistRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, PatientsWaitlistRoutes)
};
