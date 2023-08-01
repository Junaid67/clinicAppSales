const s3Util = require('../utils/config').s3Details;
const AWS = require('aws-sdk');
const bucket = require('../utils/config').urls.bucket;


function uploadFile(_buffer, fileName) {

  const s3 = new AWS.S3({ ...s3Util });
  return new Promise(((resolve, reject) => {
    const params = {
      Bucket: bucket, // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      Body: _buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(`Could'nt upload Files!!!!! ${err}`);
      }
      console.log(data.Location);
      resolve(data.Location);
    });
  }));
}

async function readFileAsBase64(filename) {

  const s3 = new AWS.S3({ ...s3Util });

  var params = {
    Bucket: bucket,
    Key: filename
  };
  return new Promise(((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      let pdfData = {
        src: '',
        error: false,
        message: ''
      };

      if (err) {
        pdfData.error = true;
        pdfData.message = 's3 error: ' + err;
        reject(pdfData);
      }
      if (data) {
        const base64String = data.Body.toString('base64');
        pdfData.src = base64String;
      }
      resolve(pdfData);
    });
  }));
}

module.exports = {
  uploadFile,
  readFileAsBase64
};
