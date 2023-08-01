const appointmentJoiValidation = require('./AppointmentJoiValidation');
const AppointmentRoutes = require('./AppointmentRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    appointmentRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, AppointmentRoutes),
    appointmentJoiValidation
};
