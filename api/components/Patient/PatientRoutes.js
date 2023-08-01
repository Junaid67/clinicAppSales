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

const controller = `PatientController`;

module.exports = {
    'POST /createPatient': { controller, action: 'createPatient', validate: 'createPatientValidation' },
    'GET /getAllPatients': { controller, action: 'getAllPatients' },
    'GET /getPatientDetailsById': { controller, action: 'getPatientDetailsById' },
    'GET /getRecentlyVisited': { controller, action: 'getRecentlyVisited' },
    'POST /addRecentlyVisited': { controller, action: 'addRecentlyVisited', validate: 'addRecentlyVisitedValidation' },
    'POST /updatePatientDemographic': { controller, action: 'updatePatientDemographic', validate: 'updatePatientValidation' },
    'POST /validateHealthCard': { controller, action: 'validateHealthCard', validate: 'validateHealthCardValidation' },
    'POST /archivePatient': { controller, action: 'archivePatient', validate: 'archivePatientValidation' },
    
    'GET /getPatientHistoryById': { controller, action: 'getPatientHistoryById' },

    'POST /createPatientMedicalHistoryDetails': { controller, action: 'createPatientMedicalHistoryDetails', validate: 'createPatientSummaryValidation' },
    'GET /getPatientMedicalHistoryDetails': { controller, action: 'getPatientMedicalHistoryDetails' },
    'GET /getPatientMedicalHistory': { controller, action: 'getPatientMedicalHistory' },
    'POST /updatePatientMedicalHistoryDetails': { controller, action: 'updatePatientMedicalHistoryDetails', validate: 'updatePatientSummaryValidation' },
    'POST /deletePatientMedicalHistoryDetails': { controller, action: 'deletePatientMedicalHistoryDetails', validate: 'deletePatientMedicalHistoryDetails' },  
};
