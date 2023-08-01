/* eslint-disable indent */
/**
 * UtilsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var fs = require('fs');
let { degrees, PDFDocument, rgb } = require("pdf-lib");
var xml2js = require('xml2js');
const { toXML } = require('jstoxml');
var parser = new xml2js.Parser();
var jsonxml = require('jsontoxml');

module.exports = {
	exportPatients: async (req, res) => {
		try {
			const patients = await sails.models.patient.find({  select: ['firstName','lastName','address','appointmentProviderIdentity','cellPhone','city','contactCellPhone','contactFirstName','contactLastName','contactRelationship','cpsoNumber','dateOfBirth','diagnosticTypeId','employmentStatus','firstName','gender','healthCardNumber','lastName','maritalStatus','notes','ohipBillingNumber','patientEmailAddress','patientStatusDate','postalZipCode','preferredSpokenLanguage','primaryPhysician','primaryPhysicianAddress','primaryPhysicianBilling','providerRole','provinceState','residencePhone','sin','streetAddress','workPhone','workPhoneExtension',
			  ]}).usingConnection(sails.db);
			var result = toXML({ patients }, {
				header: true,
				indent: "  ",
			});
			console.log(result);
			const buf = Buffer.from(result, 'utf8');
			buf.toString();
			let currTimestamp = new Date().getTime();
			let xmlFilename = `${patients[0].firstName}_${patients[0].lastName}_${patients[0].id}_${patients[0].dateOfBirth}_patients_${currTimestamp}.xml`;

			const awsFileName = await S3Service.uploadFile(buf, xmlFilename);
			console.log("patients: ", awsFileName);
			req.patientsXml = xmlFilename;
			
			res.ok(xmlFilename);

			// merger.add('api/p1.pdf');
			// merger.add('api/p2.pdf');
			// const b1 = fs.readFileSync('api/p1.pdf');
			// const b2 = fs.readFileSync('api/p2.pdf');
			// const re = await merge([b1, b2]);
			// console.log('buddfer', re);
			if (!patients.length) {
				return res.error({ message: 'patients Not Found!' });
			} else {
				res.ok["patients"];
			}
		} catch (error) {
			res.error(error);
		}
	},
	importPatients: async (req, res) => {
		try {
			console.log('file recevied', req.file('file')._files[0].stream.fileName);
			// const fileName = req.file('file')._files[0].stream.filename;
			req.file('file').upload({ saveAs: "patients.xml" }, async (err, _uploadedFiles) => {
				if (err) { return res.serverError(err); }
				fs.readFile(_uploadedFiles[0].fd, 'utf8', function (err, data) {
					console.log('_uploadedFiles[0]',_uploadedFiles[0]);
					console.log('data',data);
					xml2js.parseString(data, (err, result) => {
						if(err) {
							throw err;
						}
						// `result` is a JavaScript object
						// convert it to a JSON string
						const json = JSON.stringify(result, null, 4);
						// log JSON string
						console.log('convertedjson',json);
											res.json({ message: 'Ok', data: json });
					});
					// let xmlFile = _uploadedFiles[0].fd;
					// var options = { ignoreComment: true, alwaysChildren: true };
					// var jsonfile = JSON.parse(xmljson.toJson(data,{reversible: true}));
					// // const result = xmlParser.toJson(data,options);

					// // var result = xml2json({ data }, options); // or convert.xml2json(xml, options)
					// console.log("result", jsonfile);

					// let convertedJsonFile = JSON.stringify(result)
				})

				// var xml = fs.readFileSync('patients.xml', 'utf8');
				// var options = { ignoreComment: true, alwaysChildren: true };
				// 	var result = convert.xml2js( {xml }, options); // or convert.xml2json(xml, options)

				//    let data = JSON.stringify(result)

			})
		} catch (error) {
			console.log('EEEEE', error);
			res.error(error);
		}

	},
	mergePDF: async (req, res) => {
		try {
			const { query: { patientId } } = req;
			if (!patientId) {
				res.error({ message: 'PatientId is required!' });
			}
			const patient = await sails.models.patient.findOne({ id: patientId }).usingConnection(sails.db);
			if (!patient) {
				return res.error({ message: `Patient Not Found with PatientId ${patientId}` });
			}
			const patientInbox = await sails.models.documentinbox.find({ patientId: patientId }).usingConnection(sails.db);
			const pdfFile = patientInbox.map((p) => p.pdfFile);
			let bufferObject = '';
			for (const item of pdfFile) {
				const fileBuffer = await S3Service.readFileAsBase64(item);
				bufferObject = bufferObject + '  ' + fileBuffer.src;
			}
			let filename = `${patient.firstName}_${new Date().getTime()}.pdf`;
			let buff = Buffer.from(bufferObject, 'base64');

			let documentUrl = await S3Service.uploadFile(buff, filename);
			res.ok({ URL: documentUrl });
		} catch (error) {
			res.error(error);
		}
	}
};

