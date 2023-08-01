
const mysql = require('mysql');
const dotenv = require('dotenv');
const { adminDB: dbDetails } = require('../../utils/keys');
dotenv.config();

// For local

const adminConnection = mysql.createPool({
  host: dbDetails.host,
  user: dbDetails.user,
  password: dbDetails.password,
  port: dbDetails.port,
  database: dbDetails.database,
  dateStrings: [
    'DATE',
    'DATETIME'
  ],
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000
});

// QD3RMUhee82IApZgsWWiMFIRT1lrqlhv4UT0ZL_bE8A

const version = process.env.API_VERSION;

adminConnection.getConnection(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Connected!:)');
  }
});

const emailAuth = {
  user: 'fiablesports@gmail.com',
  pass: ''
};

const faxAuth = {
  username: 'Junaid67',
  password: 'InterFax2011'
}


let s3Details = {
  region: process.env.S3_BUCKET_REGION,
}

if (process.env.S3_BUCKET_ID !== '') {
  s3Details.accessKeyId = process.env.S3_BUCKET_ID;
}

if (process.env.S3_BUCKET_KEY !== '') {
  s3Details.secretAccessKey = process.env.S3_BUCKET_KEY;
}

const urls = {
  bucket: process.env.S3_BUCKET_NAME,
  version: version,
  viewFaxUrl: "https://global.srfax.com/viewFile.php?fileName="
}

const tokenSecret = 'appointment_Patient_App';
const dbSecret = '**db*Secret**';
const adminSecret = 'appointment_Patient_App_AdminKey';

const srFaxAcc = {
  id: process.env.FAX_ID,
  password: process.env.FAX_PASS,
  senderEmail: process.env.FAX_EMAIL,
  callerID: process.env.FAX_CALLER_ID
}

module.exports = {
  adminConnection: adminConnection,
  emailAuth: emailAuth,
  faxAuth: faxAuth,
  urls: urls,
  tokenSecret: tokenSecret,
  dbSecret: dbSecret,
  adminSecret: adminSecret,
  dbDetails: dbDetails,
  srFaxAcc: srFaxAcc,
  s3Details: s3Details
}
