const { validate } = require('../utils/validate');
const { templateCategoryJoiValidation: Validation } = require('../components/Template');

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