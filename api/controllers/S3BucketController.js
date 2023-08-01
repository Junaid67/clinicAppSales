/**
 * S3BucketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const s3Util = require('../utils/config').s3Details;
const bucket = require('../utils/config').urls.bucket;
const AWS = require('aws-sdk');
module.exports = {
  readFile: async (req, res) => {
    const { body: { file } } = req;
    const s3 = new AWS.S3({ ...s3Util });
    const myBucket = bucket;
    const myKey = file;
    const signedUrlExpireSeconds = 300;
    try {
      const url = await s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
      });
      return res.ok({ file: url }, { message: 'file retreived successfully!' });
    } catch (error) {
      res.error(error);
    }
  }
};

