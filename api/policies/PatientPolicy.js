const { validate } = require('../utils/validate');
const { patientJoiValidation: userValidation } = require('../components/Patient');

module.exports = async (req, res, next) => {
    try {
        const schema = req.options.validate;
        if (schema) {
            await validate(userValidation[schema], req);
        }
        next();
    }
    catch (err) {
        res.error(err);
    }
};