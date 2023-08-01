const { validate } = require('../utils/validate');
let { appointmentTypeJoiValidation } = require('../components/AppointmentType');
const{appointmentJoiValidation }= require('../components/Appointment');
Validation = { ...appointmentTypeJoiValidation, ...appointmentJoiValidation }
module.exports = async (req, res, next) => {
    try {
        const schema = req.options.validate;
        if (schema) {
            await validate(Validation[schema], req);
        }
        next();
    }
    catch (err) {
        res.error(err);
    }
};