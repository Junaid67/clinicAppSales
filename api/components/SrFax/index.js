const srFaxJoiValidation = require('./SrFaxJoiValidation');
const SrFaxRoutes = require('./SrFaxRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    srFaxRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, SrFaxRoutes),
    srFaxJoiValidation
};
