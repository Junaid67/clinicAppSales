const helpers = require("../utils/validate");
const { getTemplate } = require("../../views/templates/template");
let { degrees, PDFDocument, rgb } = require("pdf-lib");
const axios = require("axios");
let wrap = require("word-wrap");
module.exports = async (req, res, next) => {
    if (req.body.form && req.body.form != "") {
        // try {
        let currTimestamp = new Date().getTime();

        let pdfFilename = `${req.body.patientId}_form_${currTimestamp}.pdf`;

        // Validate request
        if (!req.body) {
            return res.error({
                message: "Content can not be empty!",
            });
        }

        let fields = helpers.validateReqiuiredFields(
            ["patientId", "form", "formData", "formTypeId"],
            req.body
        );
        if (!fields.isValid) {
            return res.error({
                message: `Missing form required fields`,
                requiredFields: fields.requiredFields,
            });
        }

        let formData = req.body.formData;
        let filledForm = req.body.form;

        if (!helpers.isJson(formData)) {
            return res.error({
                message: `'formData' parameter should be stringified JSON`,
            });
        }

        if (!helpers.isJson(filledForm)) {
            return res.error({
                message: `'filledForm' parameter should be stringified JSON`,
            });
        }

        formData = JSON.parse(formData);
        filledForm = JSON.parse(filledForm);

        let url = formData.Url;
        // url = "http://www.africau.edu/images/default/sample.pdf";

        let response;
        try {
            response = await axios
                .get(url, { responseType: "arraybuffer" })
                .catch(function (error) {
                    if (error.response) {
                        return res.error({
                            success: false,
                            message: error.response,
                        });
                    } else if (error.request) {
                        // The request was made but no response was received
                        return res.error({
                            success: false,
                            message: error.request,
                        });
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error.. ", error.message);
                        return res.error({
                            success: false,
                            message: error,
                        });
                        return;
                    }
                });
        } catch (err) {
            return res.error({
                success: false,
                message: "error: " + err,
            });
        }

        const buffer = Buffer.from(response.data, "utf-8");

        // const buffer = await fetch('https://pdf-lib.js.org/assets/dod_character.pdf').then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(buffer);
        // console.log(buffer)
        const pages = pdfDoc.getPages();
        // console.log("pages: "+pages.length);
        const fontSize = 14;

        filledForm.forEach((item, index) => {
            let fields = item.Fields;
            // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
            let page = pages[index];

            const { width, height } = page.getSize();

            let jpgImageBytes =
                "data:image/png;base64,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";

            fields.forEach(async (item2, index2) => {
                if (Object.keys(item2.field).length !== 0) {
                    var fieldWidth = item2.field.Frame.width || 10;

                    if (item2.field.Frame && item2.field.Frame.x && item2.field.Frame.y) {
                        if (item2.field.Type === "Checkbox") {
                            if (item2.value === true) {
                                const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
                                const jpgDims = jpgImage.scale(0.25);

                                page.drawImage(jpgImage, {
                                    x: (item2.field.Frame.x / formData.Width) * width,
                                    y:
                                        height -
                                        ((item2.field.Frame.y + (item2.field.Frame.height - 25)) /
                                            formData.Height) *
                                        height,
                                    width: 11,
                                    height: 11,
                                });
                            }

                            // const formPDF = pdfDoc.getForm()
                            // let checkBox = formPDF.createCheckBox('some.checkBox.field' + index2)
                            // checkBox.addToPage(page, {
                            //   x: (item2.field.Frame.x / 3060) * width,
                            //   y: height - (((item2.field.Frame.y + (item2.field.Frame.height - 15)) / 3960) * height),
                            //   width: 13,
                            //   height: 13,
                            //   textSize: 8,
                            //   textColor: rgb(1, 0, 0),
                            //   backgroundColor: rgb(0, 1, 0),
                            //   borderColor: rgb(0, 0, 1),
                            //   borderWidth: 2,
                            //   rotate: degrees(90),
                            // });
                            // checkBox.check();
                        } else {
                            var text = item2.value.toString();
                            var lineBreak = Math.floor(fontSize / 2);
                            var lineBreakAfter = Math.floor(fieldWidth / lineBreak);
                            // console.log(lineBreakAfter);
                            var textToAdd = wrap(text, {
                                fieldWidth: lineBreakAfter,
                                newline: "\n",
                                indent: " ",
                            });
                            page.drawText(textToAdd, {
                                x: (item2.field.Frame.x / formData.Width) * width,
                                y:
                                    height -
                                    ((item2.field.Frame.y + (item2.field.Frame.height - 25)) /
                                        formData.Height) *
                                    height,
                                size: fontSize,
                                // font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                        }
                    }
                }
            });
        });
        const pdfBytes = await pdfDoc.save();
        const buf = Buffer.from(pdfBytes.buffer);

        const awsFileName = await S3Service.uploadFile(buf, pdfFilename);
        console.log("form: ", awsFileName);
        req.body.formPdf = pdfFilename;
        next();
    } else {
        next();
    }
};
