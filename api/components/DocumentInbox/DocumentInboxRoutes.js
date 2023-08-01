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

const controller = `DocumentInboxController`;

module.exports = {
    'POST /archiveFax': { controller, action: 'archiveFax', validate: 'archiveFaxValidation' },
    'DELETE /deleteInboxDocument': { controller, action: 'deleteInboxDocument', validate: 'archiveFaxValidation' },
    'POST /updateDocumentName': { controller, action: 'updateDocumentName', validate: 'updateDocumentNameValidation' },

    'POST /uploadDocument': { controller, action: 'uploadDocument', validate: 'uploadDocumentValidation' },
    'GET /getQueuedFaxes': { controller, action: 'getQueuedFaxes' },
    'GET /getFaxedDocument': { controller, action: 'getFaxedDocument', validate: 'getFaxedDocumentValidation' },
    'GET /getFaxedOutbox': { controller, action: 'getFaxedOutbox' },
    'GET /checkInboxDoc': { controller, action: 'checkInboxDoc' },
    'POST /updateAssignedDocumentToPatient': { controller, action: 'updateAssignedDocumentToPatient', validate: 'updateAssignedDocumentToPatientValidation' },
    'POST /getPendingDocumentsListByPatientId': { controller, action: 'getPendingDocumentsListByPatientId', validate: 'getPendingDocumentsListByPatientIdValidation' },
    'POST /assignDocumentToPatient': { controller, action: 'assignDocumentToPatient', validate: 'assignDocumentToPatientValidation' },
    'POST /getFaxedDocuments': { controller, action: 'getFaxedDocuments', validate: 'getFaxedDocumentsValidation' },
    'POST /getInboxDocuments': { controller, action: 'getInboxDocuments', validate: 'getFaxedDocumentsValidation' },
};
