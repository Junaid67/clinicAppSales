const PatientNotesRoutes = require('./PatientNotesRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    patientNotesRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, PatientNotesRoutes)
};
