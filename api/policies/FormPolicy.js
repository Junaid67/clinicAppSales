const { validate } = require('../utils/validate');
const {formJoiValidation:Validation} = require('../components/Form');

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