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

const controller = `FormController`;

module.exports = {
    'POST /saveForm': { controller, action: 'saveForm', validate: 'saveFormValidation' },
    'GET /getForms': { controller, action: 'getForms' },
    'POST /updateForm': { controller, action: 'updateForm', validate: 'updateFormValidation' },
    'POST /deleteForm': { controller, action: 'deleteForm', validate: 'deleteFormValidation' },
    'GET /getFormsByType': { controller, action: 'getFormsByType', validate: 'getFormsByTypeValidation' },
};
