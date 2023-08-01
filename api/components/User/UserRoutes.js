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

const controller = `UserController`;

module.exports = {
    'POST /login': { controller, action: 'login', validate: 'userLoginValidation' },
    'POST /createUser': { controller, action: 'createUser', validate: 'signUpValidation' },
    'POST /updateUser': { controller, action: 'updateUser', validate: 'updateUserValidation' },
    'GET /getUserByOrgId': { controller, action: 'getUserByOrgId', validate: 'getUserByOrgIdValidation' },
    'GET /getAllPhysician': { controller, action: 'getAllPhysician' },
    'GET /getUserRoles': {controller, action: 'getUserRoles'},
    'POST /deleteUser':{ controller, action: 'deleteUser', validate: 'deleteUserValidation' },
    'POST /resetPhysicianPassword': { controller, action: 'resetPhysicianPassword', validate: 'resetPhysicianPasswordValidation' },
    'POST /updatePhysicianProfile':{ controller, action: 'updatePhysicianProfile', validate: 'updatePhysicianProfileValidation' },
};
