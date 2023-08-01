/**
 Copyright © 2021 Retailo, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const { constants: { request: { VERSIONING: { v1 } } } } = require("../../constants/http");

const controller = `AppointmentController`;

module.exports = {
    'POST /createAppointment':{controller, action: 'createAppointment', validate: 'createAppointmentValidation'},
    'POST /deleteAppointment':{controller, action: 'deleteAppointment', validate: 'deleteAppointmentValidation'},
    'POST /updateAppointmentStatus':{controller, action: 'updateAppointmentStatus', validate: 'updateAppointmentStatusValidation'},
    'POST /updateAppointment':{controller, action: 'updateAppointment', validate: 'updateAppointmentValidation'},
    'GET /getAppointments': { controller, action: 'getAppointments' },
    'POST /getAppointmentsByRange': { controller, action: 'getAppointmentsByRange' },
    'GET /getAppointmentsAndHistory': { controller, action: 'getAppointmentsByPatientId', validate: 'getAppointmentsAndHistory' },
    'GET /getAppointmentStatuses': { controller, action: 'getAppointmentStatuses'},
    'GET /getAppointmentLocations': { controller, action: 'getAppointmentLocations'},
    'GET /getClinicRooms': { controller, action: 'getClinicRooms'},
};
