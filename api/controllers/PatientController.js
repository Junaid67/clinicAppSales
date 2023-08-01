/**
 * PatientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');
const { timeSince, groupBy } = require('../utils/validate');

module.exports = {
  createPatient: async (req, res) => {
    try {
      const { body } = req;
      const user = await sails.models.user.findOne({ id: body.physicianId }).usingConnection(sails.db);
      if (!user) {
        return res.error({ message: `Physician Not Found with Id: ${body.physicianId}` });
      }
      const role = await sails.models.role.findOne({ id: user.roleId });
      user.roleId = role;
      if (role.name !== 'DOCTOR') {
        return res.error({ message: 'PhysicianId is not Valid' });
      }
      const patientResponse = await sails.models.patient.create({ ...body }).fetch().usingConnection(sails.db);
      if (!patientResponse) {
        return res.error({ message: 'Patient Not created!' });
      }
      if (body.listId) {
        const patientToList = await sails.models.patientstolist.create({ listId: body.listId, patientId: patientResponse.id }).fetch().usingConnection(sails.db);
        if (!patientToList) {
          return res.error({ message: 'Patient not added in patient list!' });
        }
      }
      return res.ok({ id: patientResponse.id, ...body, physician: user });
    } catch (error) {
      res.error(error);
    }
  },
  getAllPatients: async (req, res) => {
    try {
      const patients = await sails.models.patient.find({
        select: [
          'address',
          'appointmentProviderIdentity',
          'cellPhone',
          'city',
          'contactCellPhone',
          'contactFirstName',
          'contactLastName',
          'contactRelationship',
          'cpsoNumber',
          'dateOfBirth',
          'diagnosticTypeId',
          // 'diagnosticTypeTitle',
          'employmentStatus',
          'firstName',
          'gender',
          'healthCardNumber',
          // 'lastTaskCreated',
          'lastName',
          'maritalStatus',
          'notes',
          'ohipBillingNumber',
          'patientEmailAddress',
          'patientStatusDate',
          'postalZipCode',
          'preferredSpokenLanguage',
          'primaryPhysician',
          'primaryPhysicianAddress',
          'primaryPhysicianBilling',
          'providerRole',
          'provinceState',
          'residencePhone',
          'responseAction',
          'responseCode',
          'responseDescription',
          'responseId',
          'sin',
          'streetAddress',
          // 'taskStatus',
          'workPhone',
          'workPhoneExtension',
        ]
      }).populate('physicianId').usingConnection(sails.db);
      if (!patients.length) {
        res.ok([], { message: 'Patients Not Found!' });
      } else {
        const patientDetails = await PatientService.getFullPateintsWithDetails(patients);
        return res.ok(patientDetails);
      }
    } catch (error) {
      res.error(error);
    }
  },
  addRecentlyVisited: async (req, res) => {
    const { query: { patientId } } = req;
    try {
      const response = await sails.models.recentpatient.updateOne(patientId)
        .set({ updatedAt: new Date() }).usingConnection(sails.db);
      if (!response) {
        await sails.models.recentpatient.create({ patientId }).usingConnection(sails.db);
      }
      res.ok(true);
    } catch (error) {
      res.error(error);
    }
  },
  getRecentlyVisited: async (req, res) => {
    try {
      const response = await sails.models.recentpatient.find().sort('updatedAt DESC').limit(5).usingConnection(sails.db);
      const patientIds = response.map((res) => res.patientId);
      const patients = await sails.models.patient.find({ select: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'diagnosticTypeId', 'createdAt'], where: { id: patientIds } }).usingConnection(sails.db);
      const tasks = await sails.models.patienttasks.find({ patientId: patientIds }).usingConnection(sails.db);

      patients.forEach((item) => {
        tasks.forEach((item2) => {
          if (item.id === item2.patientId) {
            item.lastTaskCreated = timeSince(
              new Date(item2.createdAt)
            );
          }
        });
      });

      res.ok(patients);
    } catch (error) {
      res.error(error);
    }
  },
  updatePatientDemographic: async (req, res) => {
    const { body } = req;
    try {
      if (body.physicianId) {
        const user = await sails.models.user.findOne({ id: body.physicianId }).usingConnection(sails.db);
        if (!user) {
          return res.error({ message: `Physician Not Found with Id: ${body.physicianId}` });
        }
        const role = await sails.models.role.findOne({ id: user.roleId });
        user.roleId = role;
        if (role.name !== 'DOCTOR') {
          return res.error({ message: 'PhysicianId is not Valid' });
        }
      }
      const response = await sails.models.patient.updateOne({ id: body.id }).set(body).usingConnection(sails.db);
      if (!response) {
        return res.error({ message: `Patient id ${body.id} not found in the record!`, });
      }
      res.ok({ message: 'Patient demographic data has been updated successfully!' });
    } catch (error) {
      res.error(error);
    }
  },
  getPatientDetailsById: async (req, res) => {
    const { query: { patientId } } = req;
    try {
      const response = await PatientService.getPatientDetailsById(patientId);
      if (!response) {
        return res.error({ message: `Patient id ${patientId} not found in the record!` });
      }
      res.ok(response);
    } catch (error) {
      res.error(error);
    }

  },
  validateHealthCard: async (req, res) => {
    const { body } = req;
    try {
      const { data } = await axios.get('/api/hcv', {
        proxy: {
          protocol: 'https',
          host: process.env.HCV_HOST,
          port: process.env.HCV_PORT,
        },
        headers: {
          'API-Key': process.env.HCV_API_KEY,
        },
        params: {
          health_number: body.healthNumber,
          version_code: body.versionCode,
          go_secure_email: body.goSecureEmail,
          go_secure_password: body.goSecurePassword,
          muid: body.muid,
        },
      });
      res.ok(data);
    } catch (error) {
      res.error(error);
    }
  },
  archivePatient: async (req, res) => {
    const { body: { patientId } } = req;
    try {
      const response = await sails.models.patient.updateOne({ id: patientId }).set({ deletedAt: new Date() }).usingConnection(sails.db);
      if (!response) {
        return res.error({ message: `Patient id ${patientId} not found in the record!` });
      }
      res.ok({ message: 'ArchivePatient has been updated successfully!' });
    } catch (error) {
      res.error(error);
    }
  },
  createPatientMedicalHistoryDetails: async (req, res) => {
    const { body } = req;
    try {
      const patientResponse = await sails.models.patientmedicalhistorydetails.create(body).fetch().usingConnection(sails.db);
      res.ok(patientResponse);
    } catch (error) {
      res.error(error);
    }
  },
  updatePatientMedicalHistoryDetails: async (req, res) => {
    const { body } = req;
    const { query: { id } } = req;
    try {
      const response = await sails.models.patientmedicalhistorydetails.updateOne({ id: id }).set(body).usingConnection(sails.db);
      if (!response) {
        return res.error({ message: `PatientMedicalHistoryDetails id ${body.id} not found in the record!` });
      }
      res.ok({ message: 'Patient Medical data has been updated successfully!' });
    } catch (error) {
      res.error(error);
    }
  },
  getPatientMedicalHistoryDetails: async (req, res) => {
    const { query: { patientId } } = req;
    try {
      let details = await sails.models.patientmedicalhistorydetails.find({ patientId, deletedAt: null }).usingConnection(sails.db);
      let category = await sails.models.patientmedicalhistory.find().usingConnection(sails.db);
      let response = [];

      category.forEach((cat) => {
        details.forEach((details) => {
          if (cat.id === details.categoryId) {
            let temp = {
              categoryId: cat.id,
              category: cat.category,
              details: {
                createdAt: details.createdAt,
                updatedAt: details.updatedAt,
                id: details.id,
                description: details.description,
                patientId: details.patientId
              }
            }
            response.push(temp)
          }
        })
      })
      response = groupBy(response, 'category')
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  getPatientMedicalHistory: async (req, res) => {
    try {
      const response = await sails.models.patientmedicalhistory.find({ select: ['category']}).usingConnection(sails.db);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  deletePatientMedicalHistoryDetails: async (req, res) => {
    const { query: { id } } = req;
    try {
      const response = await sails.models.patientmedicalhistorydetails.updateOne({ id: id }).set({ deletedAt: new Date() }).usingConnection(sails.db);
      if(!response){
        return res.error({ message: `unable to delete PatientMedicalHistoryDetails with id ${id}`});
      }
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  getPatientHistoryById: async (req, res) => {
    try {
      res.ok({data: [], success: true});
    } catch (error) {
      res.error(error);
    }
  }

};

