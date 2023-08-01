const helpers = require('../utils/validate');
const { getTemplate } = require('../../views/templates/template');
const { getPDFBuffer } = require('../utils/getPdfBuffer');
const months = helpers.returnMonths();

module.exports = async (req, res, next) => {
  try {

    if (req.body.note && req.body.note != '') {
      // Validate request
      if (!req.body) {
        return res.error({
          message: 'Content can not be empty!',
        });
      }

      const { noteId, paragraphId } = req.body;
      if (!noteId) {
        return res.badRequest({
          success: false,
          message: `Please provide 'noteId'.`,
        });
      }
      if (!paragraphId) {
        return res.badRequest({
          success: false,
          message: `Please provide 'paragraphId'.`,
        });
      }

      let currTimestamp = new Date().getTime();
      let dbName = sails.dbName;
      let filename = `${req.body.patientId}_note_${currTimestamp}.pdf`;
      let notesData = await sails.models.notesdata.findOne({ id: noteId }).usingConnection(sails.db);
      if (!notesData) {
        return res.badRequest({
          success: false,
          message: `Unable to retreive data against this noteId.`,
        });
      }
      if (notesData) {
        let data = notesData;
        data.note = req.body.note;
        let patients = await sails.models.patient.findOne({ id: req.body.patientId }).usingConnection(sails.db);

        if (!patients) {
          return res.error({
            success: false,
            message: `No patient record exist against this ID`,
          });
        }

        let contacts; let pName; let toName;
        if (req.body.contactId) {
          let fields = helpers.validateReqiuiredFields(['addressId'], req.body);
          if (!fields.isValid) {
            return res.error({
              success: false,
              message: `Missing required fields${fields}`,
            });
          }
          contacts = await sails.models.contactaddress.findOne({ id: req.body.addressId, contactId: req.body.contactId }).populate('contactId').usingConnection(sails.db);

          if (!contacts) {
            return res.error({
              success: false,
              message: `No contacts record exist against this ID`,
            });
          }
          if (
            contacts.phone !== null &&
            contacts.phone != '' &&
            helpers.isJson(contacts.phone)
          ) {
            contacts.phone = JSON.parse(contacts.phone);
          }
          toName =
            (contacts.contactId.firstName === null ? '' : contacts.contactId.firstName) +
            ' ' +
            (contacts.contactId.lastName === null ? '' : contacts.contactId.lastName);
        }

        pName =
          (patients.firstName === null ? '' : patients.firstName) +
          ' ' +
          (patients.middleName === null ? '' : patients.middleName) +
          ' ' +
          (patients.lastName === null ? '' : patients.lastName);

        let faxTo;

        if (req.body.contactId) {
          faxTo = contacts.fax;
        } else if (req.body.faxNumber) {
          faxTo = req.body.faxNumber;
        } else {
          faxTo = 'N/A';
        }


        let tempCC = JSON.parse(req.body.noteCC);

        let faxCC = '';

        if (tempCC.length > 0) {
          console.log('TEMPCC: ', tempCC);
          tempCC.forEach((cc) => {
            // check to see if saved contact, if so append cc contact name
            if (cc.id) {
              faxCC += cc.firstName + ' ' + cc.lastName + ', ';

              // check to see if direct fax input, if so append it
            } else if (cc.fax) {
              faxCC += cc.fax + ', ';
            }
          });

          // remove last trailing comma
          faxCC = faxCC.slice(0, -2);
        } else {
          faxCC = 'N/A';
        }
        let bodyStyle;
        if (notesData.bodyStyle) {
          if (!helpers.isJson(bodyStyle)) {
            return res.error({
              success: false,
              message: `'bodyStyle' parameter should be stringified JSON`,
            });
          }
          bodyStyle = JSON.parse(bodyStyle);
        }

        let pDOB;

        if (patients.dateOfBirth) {
          pDOB = new Date(patients.dateOfBirth);
          pDOB = pDOB.getDate() + " " + months[pDOB.getMonth()] + ", " + pDOB.getFullYear();
        } else {
          pDOB = 'N/A'
        }

        let customDate;

        if (notesData.customDate) {
          customDate = new Date(customDate.dateOfBirth);
          customDate = customDate.getDate() + " " + months[customDate.getMonth()] + ", " + customDate.getFullYear();
        } else {
          customDate = 'N/A'
        }
        let html = getTemplate(
          {
            // noteText: req.body.note,
            signImg: data.sign,
            logoImg: data.logo,
            logoWidth: data.logoWidth,
            logoHeight: data.logoHeight,
            // date: helpers.returnDateInWords(),
            customDate: data.customDate,
            bodyStyle: data.body.bodyStyle,
            pName: pName || 'N/A',
            pDOB: pDOB,
            pHCN: patients.healthCardNumber,
            toName: toName || 'N/A',
            toAddress: contacts ? contacts.address : 'N/A',
            toCity: contacts ? contacts.city : 'N/A',
            toProvince: contacts
              ? contacts.province + ', ' + contacts.postalCode
              : 'N/A',
            toPhone: contacts ? contacts.phone.join(', ') : 'N/A',
            toFax: faxTo,
            toCC: faxCC,
          },
          {
            note: req.body.note,
            headP: data.headP,
            footerP: data.footerP,
            flag: contacts ? 0 : 1,
          }
        );

        const options = {
          format: 'A4',
          printBackground: true,
          margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' },
        };
        const pdf = await getPDFBuffer(html, options);
        // console.log(
        //   `data:application/pdf;base64, ${pdf.toString("base64")}`
        // );
        // "data:application/pdf;base64," +

        let awsFileName = await S3Service.uploadFile(pdf, filename);
        // console.log("file: "  + awsFileName)
        req.body.notePdf = awsFileName;

        next();
      } else {
        console.log('No notes available.');
        return res.error({ message: 'No notes available against provided noteID' });
      }
    } else {
      next();
    }
  } catch (error) {
    res.error(error);
  }
};

