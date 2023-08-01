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

const controller = `PatientTasksController`;

module.exports = {
    'POST /createPatientActivity': { controller, action: 'createPatientActivity', validate: 'createPatientActivityValidation' },
    'POST /updatePatientActivity': { controller, action: 'updatePatientActivity', validate:'updatePatientActivityValidation'},
    'GET /getAllActivities': { controller, action: 'getAllActivities' },
    'GET /getDayActivities': { controller, action: 'getDayActivities', validate: 'getDayActivitiesValidation' },
    'GET /getFeeCodes': { controller, action: 'getFeeCodes', validate: 'getFeeCodesValidation' },
    'GET /getActivityStatus': { controller, action: 'getActivityStatus', validate: 'getActivityStatusValidation' },
    'GET /getCustomerByActivityID': { controller, action: 'getCustomerByActivityID', validate: 'getActivityStatusValidation' },
    'DELETE /deletePatientActivity': { controller, action: 'deletePatientActivity', validate: 'deletePatientActivityValidation' },
    'POST /sendPDFFax': { controller, action: 'sendPDFFax', validate: 'sendPDFFaxValidation' },
    'POST /updatePatientActivityStatus': { controller, action: 'updatePatientActivityStatus', validate: 'updatePatientActivityStatusValidation' },

    'GET /getPatientTasksById': { controller, action: 'getPatientTasksById', validate: 'getPatientTasksValidation' },
};
