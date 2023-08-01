const appointmentTypeJoiValidation = require('./AppointmentTypeJoiValidation');
const AppointmentTypeRoutes = require('./AppointmentTypeRoutes');
const AppointmentSubtypeRoutes = require('./AppointmentSubtypeRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    appointmentTypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, AppointmentTypeRoutes),
    appointmentSubtypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, AppointmentSubtypeRoutes),
    appointmentTypeJoiValidation
};
