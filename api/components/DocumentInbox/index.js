const documentInboxJoiValidation = require('./DocumentInboxJoiValidation');
const DocumentInboxRoutes = require('./DocumentInboxRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    documentInboxRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, DocumentInboxRoutes),
    documentInboxJoiValidation
};
