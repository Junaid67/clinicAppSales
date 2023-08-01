const organizationJoiValidation = require('./OrganizationJoiValidation');
const OrganizationRoutes = require('./OrganizationRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    organizationRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, OrganizationRoutes),
    organizationJoiValidation
};
