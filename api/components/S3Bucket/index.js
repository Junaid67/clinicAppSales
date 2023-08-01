const S3BucketRoutes = require('./S3BucketRoutes');

const { addPrefixWithRoutes } = require("../../../utils/routes");
const { constants: { request: { VERSIONING: { v1, prefix } } } } = require("../../constants/http");

module.exports = {
    s3BucketRoutes: addPrefixWithRoutes(`/${prefix}/${v1}`, S3BucketRoutes)
};
