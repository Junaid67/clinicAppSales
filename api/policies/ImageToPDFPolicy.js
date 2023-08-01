const helpers = require("../utils/validate");
const { getPDFBuffer } = require("../utils/getPdfBuffer");

module.exports = async (req, res, next) => {
    if (req.body.noteURL && req.body.noteURL != "") {
        if (req.body.noteURL.indexOf("data:image/png") == 0) {
            let currTimestamp = new Date().getTime();

            let noteFileName = `${req.body.patientId}_noteDrawn_${currTimestamp}.pdf`;

            const options = {
                format: "A4",
                printBackground: true,
                margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
            };

            const pdf = await getPDFBuffer(
                helpers.returnHTMLForImage(req.body.noteURL),
                options
            );

            const awsFileName = await S3Service.uploadFile(pdf, noteFileName);
            req.body.noteDrawnPdf = noteFileName;
            console.log("drawn : ", awsFileName);

            next();
        } else {
            return res.error({
                success: false,
                message: `'noteURL' parameter should be image base64 started with 'data:image/png'`,
            });
        }
    } else {
        next();
    }
};
