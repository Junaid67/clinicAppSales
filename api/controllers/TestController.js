/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const fs = require('fs');
const AWS = require("aws-sdk");
const chromium = require("chrome-aws-lambda");
const { getTemplate } = require("../../views/templates/template");
const axios = require('axios');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_BUCKET_ID,
    secretAccessKey: process.env.S3_BUCKET_KEY,
    region: "ca-central-1"
});

module.exports = {
    readFile: async (req, res) => {
        try {
            let params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: req.body.file
            };

            s3.getObject(params, function (err, data) {

                let src;
                if (data) {
                    const base64String = data.Body.toString("base64");
                    src = "data:application/pdf;base64," + base64String;
                }

                if (err) {
                    console.log(err, err.stack);
                    return res.error({ message: "something went wrong", error: err, stack: err.stack, params: params });
                }
                res.ok({ file: src ? src : "no file found" });
            });
        } catch (error) {

        }
    },
    listFiles: async (req, res) => {
        try {
            const s3res = await s3
                .listObjectsV2({
                    Bucket: process.env.S3_BUCKET_NAME,
                }).promise();
            console.log(' res >> ', s3res);
            res.ok(s3res);
        } catch (error) {
            console.error('S3Adapter :: getObject() error', error);
            res.error(error);
        }
    },
    uploadPdf: async (req, res) => {
        try {
            const html = getTemplate({ name: "usama" });
            const options = {
                format: "A4",
                printBackground: true,
                margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
            };
            const pdf = await getPDFBuffer(html, options);
            res.ok("data:application/pdf;base64," + pdf.toString("base64"));
        } catch (e) {
            console.log(e);
            res.error({ message: "something went wrong in uploadPdf" });
        }
    },
    checksrFax: async (req, res) => {

        var raw = JSON.stringify({
            "action": "Get_Fax_Inbox",
            "access_id": req.body.id,
            "access_pwd": req.body.pass
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
        };

        try {
            console.log('i am in')
            axios.get("https://global.srfax.com/SRF_SecWebSvc.php", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    res.ok({ message: "main idr", data: result })
                })
                .catch(error => {
                    console.log(error);
                    res.ok({ message: "main idr2", err: error })
                });

        } catch (error) {
            console.log(error);
            res.error(error);
        }
    }

};

