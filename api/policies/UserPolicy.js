const { validate } = require('../utils/validate');
const { userValidation } = require('../components/Admin');

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