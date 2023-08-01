/**
 * PatientTasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { constants } = require('fs');
const helpers = require('../utils/validate');
module.exports = {
  createPatientActivity: async (req, res) => {
    const { body } = req;
    try {
      const appointment = await sails.models.appointment.findOne({ id: body.appointmentId }).usingConnection(sails.db);
      if (!appointment) {
        return res.error({ message: `appointmentId Not Found with Id: ${body.appointmentId}` });
      }
      if ((body.followup === undefined || body.followup === '' || body.followup === null)
                && (body.form === undefined || body.form === '' || body.form === null)
                && (body.prescription === undefined || body.prescription === '' || body.prescription === null)
                && (body.customMessage === undefined || body.customMessage === '' || body.customMessage === null)
                && (body.formData === undefined || body.formData === '' || body.formData === null)
                && (body.note === undefined || body.note === '' || body.note === null)
                && (body.bill === undefined)) {

        return res.error({
          message: `At least one field required from requiredFields list.`,
          data: 'followup, form, formData, note, prescription, bill, customMessage'
        });
      }

      if (body.bill != undefined && !Array.isArray(body.bill)) {
        return res.error({
          message: `'bill' parameter should be an array`
        });
      }
      if (body.bill != undefined) {
        if (body.bill.length > 0) {
          body.bill = JSON.stringify(body.bill);
        } else {
          return res.error({
            message: `'bill' parameter should be an array with at least one code in it`
          });
        }
      }

      if (body.form != undefined && body.form != '' && body.form != null) {
        if (!helpers.isJson(body.form)) {
          return res.error({
            message: `'form' parameter should be stringified JSON`
          });
        }
        if (body.formData == undefined || body.formData == '' || body.formData == null) {
          return res.error({
            message: `'formData' parameter should be provided if form parameter added`
          });
        }

        if (!helpers.isJson(body.formData)) {
          return res.error({
            message: `'formData' parameter should be stringified JSON`
          });
        }
      }
      if (body.prescription) {
        if (!helpers.isJson(body.prescription)) {
          return res.error({
            message: `'prescription' parameter should be stringified JSON`
          });
        }

        if (body.prescriptionData == undefined || body.prescriptionData == '' || body.prescriptionData == null) {
          return res.error({
            message: `'prescriptionData' parameter should be provided if prescription parameter added`
          });
        }

        if (!helpers.isJson(body.prescriptionData)) {
          return res.error({
            message: `'prescriptionData' parameter should be stringified JSON`
          });
        }

      }
      const response = await PatientTasksService.createPatientActivity(body, req);
      if (!response) {
        return res.error({ message: 'Activity Not created!' });
      }
      return res.ok(response, {
        message: 'Patient activity has been inserted successfully!'
      });
    } catch (error) {
      res.error(error);
    }
  },
  updatePatientActivity: async (req, res) => {
    const { body } = req;
    try {
      const appointment = await sails.models.appointment.findOne({ id: body.appointmentId }).usingConnection(sails.db);
      if (!appointment) {
        return res.error({ message: `appointmentId Not Found with Id: ${body.appointmentId}` });
      }
      if ((body.followup == undefined || body.followup == '' || body.followup == null)
                && (body.form == undefined || body.form == '' || body.form == null)
                && (body.prescription == undefined || body.prescription == '' || body.prescription == null)
                && (body.customMessage == undefined || body.customMessage == '' || body.customMessage == null)
                && (body.formData == undefined || body.formData == '' || body.formData == null)
                && (body.note == undefined || body.note == '' || body.note == null)
                && (body.bill == undefined)) {

        return res.error({
          message: `At least one field required from requiredFields list.`,
          data: 'followup, form, formData, note, prescription, bill, customMessage'
        });
      }

      if (body.bill != undefined && !Array.isArray(body.bill)) {
        return res.error({
          message: `'bill' parameter should be an array`
        });
      }
      if (body.bill != undefined) {
        if (body.bill.length > 0) {
          body.bill = JSON.stringify(body.bill);
        } else {
          return res.error({
            message: `'bill' parameter should be an array with at least one code in it`
          });
        }
      }

      if (body.form != undefined && body.form != '' && body.form != null) {
        if (!helpers.isJson(body.form)) {
          return res.error({
            message: `'form' parameter should be stringified JSON`
          });
        }
        if (body.formData == undefined || body.formData == '' || body.formData == null) {
          return res.error({
            message: `'formData' parameter should be provided if form parameter added`
          });
        }

        if (!helpers.isJson(body.formData)) {
          return res.error({
            message: `'formData' parameter should be stringified JSON`
          });
        }
      }
      if (body.prescription) {
        if (!helpers.isJson(body.prescription)) {
          return res.error({
            message: `'prescription' parameter should be stringified JSON`
          });
        }

        if (body.prescriptionData == undefined || body.prescriptionData == '' || body.prescriptionData == null) {
          return res.error({
            message: `'prescriptionData' parameter should be provided if prescription parameter added`
          });
        }

        if (!helpers.isJson(body.prescriptionData)) {
          return res.error({
            message: `'prescriptionData' parameter should be stringified JSON`
          });
        }
      }
      const response = await PatientTasksService.updatePatientActivity(body, req);
      if (!response) {
        return res.error({ message: 'Activity Not updated!' });
      }
      return res.ok(response, {
        message: 'Patient activity has been updated successfully!'
      });
    } catch (error) {
      res.error(error);
    }
  },
  getAllActivities: async (req, res) => {
    const {  query } = req;
    try {

      let criteria;
      let customersTasks;

      if (query !== undefined && query.startDate !== undefined && query.endDate !== undefined) {
        if (!helpers.checkDate(query.startDate) || !helpers.checkDate(query.endDate)) {
          return res.error({
            message: `Provided dates are invalid, please provide both dates in this format: YYYY-MM-DD`,
          });
        } else {
          criteria = { createdAt: { '>': query.startDate, '<': query.endDate } };
        }
      }

      if (criteria) {
        customersTasks = await sails.models.appointment.find(criteria).populate('location').populate('status').populate('appointmentSubTypeId').populate('appointmentTypeId').populate('patientId').populate('patientTasks').usingConnection(sails.db);
      } else {
        customersTasks = await sails.models.appointment.find().populate('location').populate('status').populate('appointmentSubTypeId').populate('appointmentTypeId').populate('patientId').populate('patientTasks').usingConnection(sails.db);
      }

      customersTasks = customersTasks.map((res) => {
        if (res.patientId !== null && typeof res.patientId === 'object') {
          res = { ...res, 'patientId': { patientId: res.patientId.id, name: res.patientId.firstName + ' ' + res.patientId.lastName, address: res.patientId.address, cellPhone: res.patientId.cellPhone, city: res.patientId.city, contactCellPhone: res.patientId.contactCellPhone, contactFirstName: res.patientId.contactFirstName, contactLastName: res.patientId.contactLastName, contactRelationship: res.patientId.contactRelationship, cpsoNumber: res.patientId.cpsoNumber, dateOfBirth: res.patientId.dateOfBirth, diagnosticTypeId: res.patientId.diagnosticTypeId, gender: res.patientId.gender, healthCardNumber: res.patientId.healthCardNumber, maritalStatus: res.patientId.maritalStatus, notes: res.patientId.notes } };
        }
        return res;
      });
      // res.ok(customersTasks);

      // let patients = await sails.models.patient.find({ select: ['firstName', 'dateOfBirth', 'gender', 'diagnosticTypeId', 'createdAt'] }).usingConnection(sails.db);
      // patients = patients.map((res) => {
      //     res.name = res.firstName;
      //     delete res.firstName;
      //     return res;
      // });

      // // let criteria;
      // if (body !== undefined && query.startDate !== undefined && query.endDate !== undefined) {
      //     if (!helpers.checkDate(query.startDate) || !helpers.checkDate(query.endDate)) {
      //         return res.error({
      //             message: `Provided dates are invalid, please provide both dates in this format: YYYY-MM-DD`,
      //         });
      //     } else {
      //         criteria = { createdAt: { '>': query.startDate, '<': query.endDate } }
      //     }
      // }
      // let customersTasks;
      // if (criteria) {
      //     customersTasks = await sails.models.patienttasks.find(criteria).usingConnection(sails.db);
      // } else {
      //     customersTasks = await sails.models.patienttasks.find().usingConnection(sails.db);
      // }

      let finalResult = [];
      customersTasks.forEach((item) => {
        if (item.patientTasks.length > 0) {

          if (item.patientTasks[0].followup && helpers.isDate(item.patientTasks[0].followup)) {
            item.patientTasks[0].followUpDuration = helpers.dateDiff(
                            item.patientTasks[0].createdAt,
                            item.patientTasks[0].followup
            ); //function will retun the time in string
          }

          if (item.patientTasks[0].bill !== '' && item.patientTasks[0].bill != null) {
            if (helpers.isJson(item.patientTasks[0].bill)) {
              item.patientTasks[0].bill = JSON.parse(item.patientTasks[0].bill);
            } else {
              item.patientTasks[0].bill = null;
            }
          }

          // form Name
          if (item.patientTasks[0].form && item.patientTasks[0].form !== null && item.patientTasks[0].form !== '') {
            if (helpers.isJson(item.patientTasks[0].form)) {
              let temp = JSON.parse(item.patientTasks[0].form);
              item.patientTasks[0].formName = temp.Name;
            }
          }
        }
      });
      // customersTasks.forEach((customerTasks) => {
      //     patients.forEach((patient) => {
      //         if (patient.id === customerTasks.patientId) {
      //             finalResult.push({
      //                 id: customerTasks.id,
      //                 patientId: patient.id,
      //                 name: patient.name,
      //                 icon: patient.icon,
      //                 taskActions: customerTasks,
      //                 status: "",
      //             });
      //         }
      //     });
      // });
      console.log(
                `Patients Tasks have been retrieved successfully!`
      );

      const contacts = await sails.models.contact.find().populate('addresses').usingConnection(sails.db);
      if (contacts && contacts.length > 0) {
        contacts.forEach((contact) => {
          customersTasks.forEach((result) => {
            if (result.patientTasks.length > 0) {

              if (result.patientTasks[0].noteTo && result.patientTasks[0].noteTo === contact.id) {
                result.patientTasks[0].noteTo = contact;
                //    finalResult.noteToo.addresses = contact.addresses;
              }
            }
          });
        });
      }

      return res.ok(customersTasks.reverse(), {
        message: 'Patients Tasks have been retrieved successfully!'
      });
    } catch (error) {
      res.error(error);
    }
  },
  getDayActivities: async (req, res) => {
    const { query } = req;
    try {
      if (!query.day) {
        return res.error({
          message: `The day parameter should be 'today' or 'yesterday'`,
        });
      }
      if (query.day.toLowerCase() != 'today' && query.day.toLowerCase() != 'yesterday') {
        return res.error({
          message: `The day parameter should be 'today' or 'yesterday'`,
        });
      }
      let patients = await sails.models.patient.find({ select: ['firstName', 'dateOfBirth', 'gender', 'diagnosticTypeId', 'createdAt'] }).usingConnection(sails.db);
      patients = patients.map((res) => {
        res.name = res.firstName;
        delete res.firstName;
        return res;
      });
      let customersTasks;
      let today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      // console.log("today:" + today)
      if (query.day.toLowerCase() == 'today') {

        customersTasks = await sails.models.patienttasks.find({ createdAt: { '>': today } }).usingConnection(sails.db);
      } else if (query.day.toLowerCase() == 'yesterday') {
        let yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);
        customersTasks = await sails.models.patienttasks.find({ followupStatus: 0, formStatus: 0, noteStatus: 0, billStatus: 0, customMessageStatus: 0, createdAt: { '>': yesterday, '<': today } }).usingConnection(sails.db);
      }

      let finalResult = [];
      customersTasks.forEach((item) => {
        //here
        if (item.followup && helpers.isDate(item.followup)) {
          item.followUpDuration = helpers.dateDiff(
                        item.createdAt,
                        item.followup
          ); //function will retun the time in string
        }
        if (item.bill !== '' && item.bill != null) {
          if (helpers.isJson(item.bill)) {
            item.bill = JSON.parse(item.bill);
          } else {
            item.bill = null;
          }
        }

        // form Name
        if (item.form && item.form !== null && item.form !== '') {
          if (helpers.isJson(item.form)) {
            let temp = JSON.parse(item.form);
            item.formName = temp.Name;
          }
        }

      });
      customersTasks.forEach((customerTasks) => {
        patients.forEach((patient) => {
          if (patient.id === customerTasks.patientId) {
            finalResult.push({
              id: customerTasks.id,
              patientId: patient.id,
              name: patient.name,
              icon: patient.icon,
              taskActions: customerTasks,
              status: '',
            });
          }
        });
      });

      const contacts = await sails.models.contact.find().populate('addresses').usingConnection(sails.db);
      if (contacts && contacts.length > 0) {
        contacts.forEach((contact) => {
          finalResult.forEach((result) => {
            if (result.taskActions.noteTo && result.taskActions.noteTo === contact.id) {
              result.taskActions.noteTo = contact;
              //    finalResult.noteToo.addresses = contact.addresses;
            }
          });
        });
      }

      console.log(
                `Patients Tasks have been retrieved successfully!`
      );
      return res.ok({
        data: finalResult.reverse()
      }, {
        message: 'Patients Tasks have been retrieved successfully!',
      });

    } catch (error) {
      return res.error(error);
    }
  },
  getFeeCodes: async (req, res) => {
    const { query } = req;
    try {
      let codes;
      if (query && query.feeCode) {
        codes = await sails.models.feecode.find({ code: { contains: query.feeCode } }).usingConnection(sails.db);
      } else {
        codes = await sails.models.feecode.find().usingConnection(sails.db);
      }
      if (!codes) {
        return res.error({ message: 'Feecode Not Found!' });
      }
      return res.ok(codes, { message: 'Fee codes retrieved successfully!' });
    } catch (error) {
      return res.error(error);
    }
  },
  getActivityStatus: async (req, res) => {
    const { query: { id } } = req;
    try {
      const status = await sails.models.patienttasks.findOne({ where: { id }, select: ['followupStatus'] }).usingConnection(sails.db);
      if (!status) {
        return res.error({ message: `Activity Not found with this Id ${id}` });
      }
      res.ok(status, { message: 'Activities retrieved successfully!' });
    } catch (error) {
      return res.error(error);
    }
  },
  updatePatientActivityStatus: async (req, res) => {
    const { body } = req;
    const id = body.id;
    delete body.id;
    try {
      // Required fields
      if (body.customMessageStatus == undefined && body.formStatus == undefined && body.noteStatus == undefined && body.billStatus == undefined && body.followupStatus == undefined) {
        return res.error({
          message: `Must provide one of these: 'customMessageStatus, formStatus, noteStatus, billStatus, followupStatus' required field`
        });
      }
      const activity = await sails.models.patienttasks.updateOne({ id }).set(body).fetch().usingConnection(sails.db);
      if (!activity) {
        return res.error({ message: `Activity id ${id} not found in the record!` });
      }
      res.ok(activity, { message: `Status with Activity id ${id} has been updated successfully!` });
    } catch (error) {
      res.error(error);
    }
  },
  getCustomerByActivityID: async (req, res) => {
    const { query: { id } } = req;
    try {
      let activity = await sails.models.patienttasks.findOne({ where: { id }, select: ['patientId', 'followup', 'followupStatus'] }).populate('patientId').usingConnection(sails.db);
      if (!activity) {
        return res.error({ message: `Activity id ${id} not found in the record!` });
      }
      if (activity.bill !== '' && activity.bill != null) {
        if (helpers.isJson(activity.bill)) {
          activity.bill = JSON.parse(activity.bill);
        } else {
          activity.bill = null;
        }
      }

      activity = { ...activity, patientId: activity.patientId.id, name: activity.patientId.firstName };
      return res.ok(activity, { message: 'Lists retrieved successfully!' });
    } catch (error) {
      return res.error(error);
    }
  },
  deletePatientActivity: async (req, res) => {
    const { query: { id } } = req;
    try {
      const response = await sails.models.patienttasks.destroyOne({ id: id }).usingConnection(sails.db);
      if (response) {
        res.ok({ mesage: 'Activity deleted successfully!' });
      } else {
        res.ok({ mesage: `Activity Not Found With this Id: ${id}` });
      }
    } catch (error) {
      res.error(error);
    }
  },
  //     getPatientTasksById: async (req, res) => {
  //         const { query: { id } } = req;
  //         try {
  //             const patientTasks = await sails.models.patientTasks.findOne({ id }).usingConnection(sails.db);
  //             if (!patientTasks) {
  //                 return res.error({ message: `patientTasks Not found with this id ${id}` });
  //             }
  //             res.ok(patientTasks, { message: "PatientTasks retrieved successfully!" });
  //         } catch (error) {
  //             return res.error(error);
  //         }
  // },

  sendPDFFax: async (req, res) => {
    const { body } = req;
    try {
      if (!body.recipient.toString().startsWith('+1')) {
        body.recipient = '+1' + body.recipient;
      }
      const srFaxAcc = await sails.models.srfax.findOne({ id: 1 }).usingConnection(sails.db);
      let pdfData = await S3Service.readFileAsBase64(req.body.fileName);
      if (pdfData.error) {
        return res.error({
          message: pdfData.message
        });
      }
      let opts = {
        action: 'Queue_Fax',
        access_id: srFaxAcc.faxId,
        access_pwd: srFaxAcc.faxPassword,
        sCallerID: srFaxAcc.faxCallerId,
        sSenderEmail: srFaxAcc.faxEmail,
        sFaxType: 'SINGLE',
        sToFaxNumber: body.recipient,
        // sCoverPage: "Basic",
        // sCPSubject: "My Test Fax",
        // sCPComments: "This is my text fax via the SRFax API!",
        sFileName_1: body.fileName,
        sFileContent_1: pdfData.src,
      };
      //local url
      // let url = "https://srfax.com/SRF_SecWebSvc.php";
      let json = await axios.post(process.env.SR_FAX_URL, opts);
      if (json.Status === 'Success') {
        const updatedList = await sails.models.faxoutbox.create(
                    {
                      patientId: body.patientId,
                      faxNumber: body.recipient,
                      documentType: body.documentType,
                      file: body.fileName,
                      faxId: json.Result.id
                    }).fetch().usingConnection(sails.db);
        if (!updatedList) {
          return res.error({ message: 'Send PDF fax Not Successfully!' });
        }
        return res.ok(json);
      } else {
        return res.error({ message: 'Send PDF fax Not Successfully!' });
      }
    } catch (error) {
      return res.error(error);
    }
  },
  getPatientTasksById: async (req, res) => {
    const { query: { id } } = req;
    try {
      let activity = await sails.models.patienttasks.find({ patientId: id }).usingConnection(sails.db);
      if (!activity) {
        return res.error({ message: `Activity not found in the record with this patientId ${id}!` });
      }
      activity.forEach((item) => {
        if (item.bill !== '' && item.bill != null) {
          if (helpers.isJson(item.bill)) {
            item.bill = JSON.parse(item.bill);
          } else {
            item.bill = null;
          }
        }

        if (item.followup && helpers.isDate(item.followup)) {
          item.followUpDuration = helpers.dateDiff(
                        item.create_timestamp,
                        item.followup
          );
        }
      });

      let customerDocuments = await sails.models.documentinbox.find({ patientId: id }).usingConnection(sails.db);
      customerDocuments.forEach((item) => {
        item.create_timestamp = item.autoDate;
      });
      let finalDocuments = customerDocuments.filter((document) => {
        return document.id > -1;
      });
      finalDocuments = activity.concat(finalDocuments);
      finalDocuments.sort((a, b) => {
        return (
          helpers.returnDate(b.createdAt).getTime() -
                    helpers.returnDate(a.createAt).getTime()
        );
      });
      finalDocuments.forEach((item) => {
        let curr_date = new Date(item.createdAt);
        item.createdTimestamp =
                    helpers.returnMonths()[curr_date.getMonth()] +
                    ' ' +
                    curr_date.getDate() +
                    ' ' +
                    curr_date.getFullYear();
      });

      const contacts = await sails.models.contact.find().populate('addresses').usingConnection(sails.db);
      if (contacts && contacts.length > 0) {
        contacts.forEach((contact) => {
          finalDocuments.forEach((result) => {
            if (result.noteTo && result.noteTo === contact.id) {
              result.noteTo = contact;
              //    finalResult.noteToo.addresses = contact.addresses;
            }
          });
        });
      }

      return res.ok(finalDocuments, { message: 'Lists retrieved successfully!' });
    } catch (error) {
      return res.error(error);
    }
  }
};
