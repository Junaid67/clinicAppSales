const clinicDataJoiValidation = require('./ClinicDataJoiValidation');
const ClinicDataRoutes = require('./ClinicDataRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    clinicDataRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, ClinicDataRoutes),
    clinicDataJoiValidation
};
