const diagnosticTypeJoiValidation = require('./DiagnosticTypeJoiValidation');
const DiagnosticTypeRoutes = require('./DiagnosticTypeRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    diagnosticTypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, DiagnosticTypeRoutes),
    diagnosticTypeJoiValidation
};
