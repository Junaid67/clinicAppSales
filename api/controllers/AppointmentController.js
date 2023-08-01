/**
 * AppointmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  createAppointment: async (req, res) => {
    const { body } = req;
    try {
      const user = await sails.models.user.findOne({ id: body.physicianId }).usingConnection(sails.db);
      if (!user) {
        return res.error({ message: `Physician Not Found with Id: ${body.physicianId}` });
      }
      const role = await sails.models.role.findOne({ id: user.roleId });
      user.roleId = role;
      if (role.name !== 'DOCTOR') {
        return res.error({ message: 'PhysicianId is not Valid' });
      }
      const response = await sails.models.appointment.create(body).fetch().usingConnection(sails.db);
      res.ok({ ...response, physician: user });
    } catch (error) {
      res.error(error);
    }
  },
  getAppointmentLocations: async (req, res) => {
    try {
      const appointments = await sails.models.appointmentlocation.find({ select: ['location'] }).usingConnection(sails.db);
      res.ok(appointments);
    } catch (error) {
      res.error(error);
    }
  },
  getAppointmentStatuses: async (req, res) => {
    try {
      const response = await sails.models.appointmentstatus.find({ select: ['status'] }).usingConnection(sails.db);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  getAppointments: async (req, res) => {
    try {
      let appointments = await sails.models.appointment.find().populate('location').populate('status').populate('appointmentSubTypeId').populate('appointmentTypeId').populate('patientId').populate('room').usingConnection(sails.db);
      const subTypes = await sails.models.appointmentsubtype.find().usingConnection(sails.db);
      appointments = appointments.map((res) => {
        finalSubTypes = [];
        subTypes.forEach((item)=>{
          if (res.appointmentTypeId.id === item.appointmentTypeId){
            finalSubTypes.push(item);
          } 
          res.appointmentTypeId = { ...res.appointmentTypeId, subTypes: finalSubTypes };
        })
        if (res.patientId !== null && typeof res.patientId === 'object') {
          res = { ...res, 'patientId': { patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName, address: res.patientId.address, cellPhone: res.patientId.cellPhone, city: res.patientId.city, contactCellPhone: res.patientId.contactCellPhone, contactFirstName: res.patientId.contactFirstName, contactLastName: res.patientId.contactLastName, contactRelationship: res.patientId.contactRelationship, cpsoNumber: res.patientId.cpsoNumber, dateOfBirth: res.patientId.dateOfBirth, diagnosticTypeId: res.patientId.diagnosticTypeId, gender: res.patientId.gender, healthCardNumber: res.patientId.healthCardNumber, maritalStatus: res.patientId.maritalStatus, notes: res.patientId.notes } };
        }
        return res;
      });
      res.ok(appointments);
    } catch (error) {
      res.error(error);
    }
  },
  getAppointmentsByRange: async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
      let appointments = await sails.models.appointment.find({ where: { date: { '>=': startDate, '<=': endDate } } }).populate('location').populate('status').populate('appointmentSubTypeId').populate('appointmentTypeId').populate('patientId').usingConnection(sails.db);
      const subTypes = await sails.models.appointmentsubtype.find().usingConnection(sails.db);
      appointments = appointments.map((res) => {
        finalSubTypes = [];
        subTypes.forEach((item)=>{
          if (res.appointmentTypeId.id === item.appointmentTypeId){
            finalSubTypes.push(item);
          } 
          res.appointmentTypeId = { ...res.appointmentTypeId, subTypes: finalSubTypes };
        })
        if (res.patientId !== null && typeof res.patientId === 'object') {
          res = { ...res, 'patientId': { patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName, address: res.patientId.address, cellPhone: res.patientId.cellPhone, city: res.patientId.city, contactCellPhone: res.patientId.contactCellPhone, contactFirstName: res.patientId.contactFirstName, contactLastName: res.patientId.contactLastName, contactRelationship: res.patientId.contactRelationship, cpsoNumber: res.patientId.cpsoNumber, dateOfBirth: res.patientId.dateOfBirth, diagnosticTypeId: res.patientId.diagnosticTypeId, gender: res.patientId.gender, healthCardNumber: res.patientId.healthCardNumber, maritalStatus: res.patientId.maritalStatus, notes: res.patientId.notes } };
        }
        return res;
      });
      res.ok(appointments);
    } catch (error) {
      res.error(error);
    }
  },
  deleteAppointment:async (req, res) => {
    const { query: { appointmentId } } = req;
    try {
      const response = await sails.models.appointment.destroyOne({ id: appointmentId }).usingConnection(sails.db);
      if (!response) {
        res.badRequest(`Appointment Not Found With this Id: ${appointmentId}`);
      } else {
        res.ok({ mesage: 'Appointment Deleted Successfully!' });
      }
    } catch (error) {
      res.error(error);
    }
  },
  getClinicRooms: async (req, res) => {
    try {
      const response = await sails.models.clinicroom.find({ select: ['name'] }).usingConnection(sails.db);
      res.ok(response);
    } catch (error) {
      res.error(error);
    }
  },
  updateAppointment: async (req, res) => {
    const { query: { id }, body } = req;
    try {
      const user = await sails.models.user.findOne({ id: body.physicianId }).usingConnection(sails.db);
      if (!user) {
        return res.error({ message: `Physician Not Found with Id: ${body.physicianId}` });
      }
      const role = await sails.models.role.findOne({ id: user.roleId });
      user.roleId = role;
      if (role.name !== 'DOCTOR') {
        return res.error({ message: 'PhysicianId is not Valid' });
      }
      const response = await sails.models.appointment.updateOne({ id }).set(body).usingConnection(sails.db);
      if (!response) {
        return res.error({ message: 'Appointment Could not update!' });
      } else {
        res.ok({ ...response, physician: user }, { message: `Appointment has been updated successfully!` });
      }
    } catch (error) {
      res.error(error);
    }
  },

  updateAppointmentStatus: async (req, res) => {
    const { body } = req;
    const id = body.id;
    try {
      const response = await sails.models.appointment.updateOne({ id }).set(body).fetch().usingConnection(sails.db);
      if (!response) {
        return res.badRequest(`Appointment id ${id} not found in the record!`);
      }
      res.ok(response, { message: `Status with Appointment id ${id} has been updated successfully!` });
    } catch (error) {
      res.error(error);
    }
  },
  getAppointmentsByPatientId: async (req, res) => {
    try {
      const { query: { patientId } } = req;
      let appointments = await sails.models.appointment.find({ patientId }).populate('location').populate('status').populate('appointmentSubTypeId').populate('appointmentTypeId').populate('patientId').populate('patientTasks').usingConnection(sails.db);
      appointments = appointments.map((res) => {
        if (res.patientId !== null && typeof res.patientId === 'object') {
          res = { ...res, 'patientId': { patientId: res.patientId.id, firstName: res.patientId.firstName, lastName: res.patientId.lastName, address: res.patientId.address, cellPhone: res.patientId.cellPhone, city: res.patientId.city, contactCellPhone: res.patientId.contactCellPhone, contactFirstName: res.patientId.contactFirstName, contactLastName: res.patientId.contactLastName, contactRelationship: res.patientId.contactRelationship, cpsoNumber: res.patientId.cpsoNumber, dateOfBirth: res.patientId.dateOfBirth, diagnosticTypeId: res.patientId.diagnosticTypeId, gender: res.patientId.gender, healthCardNumber: res.patientId.healthCardNumber, maritalStatus: res.patientId.maritalStatus, notes: res.patientId.notes } };
        }
        return res;
      });
      res.ok(appointments);
    } catch (error) {
      res.error(error);
    }
  },

};

