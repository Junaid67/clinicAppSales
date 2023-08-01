const PatientsToListRoutes = require('./PatientsToListRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    patientsToListRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, PatientsToListRoutes)
};
