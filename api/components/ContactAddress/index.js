const contactJoiValidation = require('./ContactJoiValidation');
const ContactAddressRoutes = require('./ContactAddressRoutes');
const ContactRoutes = require('./ContactRoutes');

const { addPrefixWithRoutes } = require('../../../utils/routes');
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require('../../constants/http');

module.exports = {
    contactAddressRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, ContactAddressRoutes),
    contactRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, ContactRoutes),
    contactJoiValidation
};
