const { validate } = require('../utils/validate');
const { notesDataJoiValidation: Validation } = require('../components/NotesData');

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