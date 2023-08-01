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

const controller = `NotesDataController`;

module.exports = {
    'POST /createNotesData': { controller, action: 'createNotesData', validate: 'createNotesDataValidation' },
    'GET /getNotesData': { controller, action: 'getNotesData' },
    'POST /updateNotesData': { controller, action: 'updateNotesData', validate: 'updateNotesDataValidation' },
    'POST /deleteNotesData': { controller, action: 'deleteNotesData', validate: 'deleteNotesDataValidation' },
    'POST /checkNoteTemplate':{controller, action: 'checkNoteTemplate', validate: 'checkNoteTemplateValidation'},
};
