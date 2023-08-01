const documentTypeJoiValidation = require('./DocumentTypeJoiValidation');
const DocumentTypeRoutes = require('./DocumentTypeRoutes');
const DocumentSubtypeRoutes = require('./DocumentSubtypeRoutes');

const { addPrefixWithRoutes } = require('../../../utils/routes');
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require('../../constants/http');

module.exports = {
    documentTypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, DocumentTypeRoutes),
    documentSubtypeRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, DocumentSubtypeRoutes),
    documentTypeJoiValidation
};
