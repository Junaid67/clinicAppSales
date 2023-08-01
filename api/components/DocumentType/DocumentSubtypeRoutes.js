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

const { constants: { request: { VERSIONING: { v1 } } } } = require('../../constants/http');

const controller = `DocumentSubtypeController`;

module.exports = {
    'POST /createDocumentSubType': { controller, action: 'createDocumentSubType', validate: 'createDocumentSubTypeValidation' },
    'GET /getDocumentSubTypes': { controller, action: 'getDocumentSubTypes' },
    'POST /updateDocSubType': { controller, action: 'updateDocumentSubTypes', validate: 'updateDocumentSubTypesValidation' },
    'POST /deleteDocSubType': { controller, action: 'deleteDocSubType', validate: 'deleteDocSubTypeValidation' },
  
};
