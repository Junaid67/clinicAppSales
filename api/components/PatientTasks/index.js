const patientTasksJoiValidation = require('./PatientTasksJoiValidation');
const PatientTasksRoutes = require('./PatientTasksRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    patientTasksRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, PatientTasksRoutes),
    patientTasksJoiValidation
};
