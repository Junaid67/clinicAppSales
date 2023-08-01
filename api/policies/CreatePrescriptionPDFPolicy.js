const helpers = require("../utils/validate");

module.exports = async (req, res, next) => {
    if (req.body.prescription && req.body.prescription != "") {
        // try {
        let currTimestamp = new Date().getTime();

        let pdfFilename = `${req.body.patientId}_prescription_${currTimestamp}.pdf`;

        // Validate request
        if (!req.body) {
            return res.error({
                message: "Content can not be empty!",
            });
        }

        let fields = helpers.validateReqiuiredFields(
            ["patientId", "prescription", "prescriptionData"],
            req.body
        );
        if (!fields.isValid) {
            return res.error({
                success: false,
                message: `Missing required fields`,
                requiredFields: fields.requiredFields,
            });
        }

        let prescriptionData = req.body.prescriptionData;
        let filledForm = req.body.prescription;

        if (!helpers.isJson(prescriptionData)) {
            return res.error({
                success: false,
                message: `'prescriptionData' parameter should be stringified JSON`,
            });
        }

        if (!helpers.isJson(filledForm)) {
            return res.error({
                success: false,
                message: `'filledForm' parameter should be stringified JSON`,
            });
        }

        prescriptionData = JSON.parse(prescriptionData);
        filledForm = JSON.parse(filledForm);

        let url = prescriptionData.Url;
        // url = "http://www.africau.edu/images/default/sample.pdf";

        let er;
        let response;
        try {
            response = await axios
                .get(url, { responseType: "arraybuffer" })
                .catch(function (error) {
                    if (error.response) {
                        res.status(200).send({
                            success: false,
                            message: error.response,
                        });
                        return;
                    } else if (error.request) {
                        // The request was made but no response was received
                        res.status(200).send({
                            success: false,
                            message: error.request,
                        });
                        return;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error: ", error.message);
                        res.status(200).send({
                            success: false,
                            message: error,
                        });
                        return;
                    }
                });
        } catch (err) {
            res.status(200).send({
                success: false,
                message: "error: " + err,
            });
            return;
        }

        const buffer = Buffer.from(response.data, "utf-8");

        const pdfDoc = await PDFDocument.load(buffer);

        const pages = pdfDoc.getPages();

        const fontSize = 14;

        filledForm.forEach((item, index) => {
            let fields = item.Fields;
            // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
            let page = pages[index];

            const { width, height } = page.getSize();

            fields.forEach((item2) => {
                if (item2.field.Frame && item2.field.Frame.x && item2.field.Frame.y) {
                    page.drawText(item2.value, {
                        x: (item2.field.Frame.x / formData.Width) * width,
                        y:
                            height -
                            ((item2.field.Frame.y + (item2.field.Frame.height - 25)) / formData.Height) *
                            height,
                        size: fontSize,
                        // font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });
                }
            });
        });

        const pdfBytes = await pdfDoc.save();
        const buf = Buffer.from(pdfBytes.buffer);

        let awsFileName = await S3Service.uploadFile(buf, pdfFilename);
        console.log("prescription: ", awsFileName);
        req.prescriptionPDF = pdfFilename;

        next();
    } else {
        next();
    }
};
