const { validate } = require('../utils/validate');
const { documentInboxJoiValidation: Validation } = require('../components/DocumentInbox');

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