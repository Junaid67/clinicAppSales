const formJoiValidation = require('./FormJoiValidation');
const formTypeJoiValidation = require('./FormTypeJoiValidation');
const FormRoutes = require('./FormRoutes');
const FormTypeRoutes = require('./FormTypeRoutes');

const { addPrefixWithRoutes } = require('../../../utils/routes');
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require('../../constants/http');

module.exports = {
    formRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, FormRoutes),
    formTypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, FormTypeRoutes),
    formJoiValidation,
    formTypeJoiValidation
};
