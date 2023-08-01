/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const { adminRoutes } = require('../api/components/Admin');
const { appointmentRoutes } = require('../api/components/Appointment');
const { appointmentTypeRoutes, appointmentSubtypeRoutes } = require('../api/components/AppointmentType');
const { clinicDataRoutes } = require('../api/components/ClinicData');
const { contactAddressRoutes, contactRoutes } = require('../api/components/ContactAddress');
const { diagnosticTypeRoutes } = require('../api/components/DiagnosticType');
const { documentInboxRoutes } = require('../api/components/DocumentInbox');
const { documentSubtypeRoutes, documentTypeRoutes } = require('../api/components/DocumentType');
const { formRoutes, formTypeRoutes } = require('../api/components/Form');
const { listRoutes } = require('../api/components/List');
const { notesDataRoutes } = require('../api/components/NotesData');
const { organizationRoutes } = require('../api/components/Organization');
const { patientRoutes } = require('../api/components/Patient');
const { patientTasksRoutes } = require('../api/components/PatientTasks');
const { patientNotesRoutes } = require('../api/components/PatientNotes');
const { patientsToListRoutes } = require('../api/components/PatientsToList');
const { patientsWaitlistRoutes } = require('../api/components/PatientsWaitlist');
const { s3BucketRoutes } = require('../api/components/S3Bucket');
const { srFaxRoutes } = require('../api/components/SrFax');
const { templateCategoryRoutes, templateParagraphRoutes } = require('../api/components/Template');
const { userRoutes } = require('../api/components/User');
const { roleRoutes } = require('../api/components/Roles');
const { utilsRoutes } = require('../api/components/Utils');
const { statsRoutes } = require('../api/components/Stats');





module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  /*******Admin User******/
  ...adminRoutes,
  ...appointmentRoutes,
  ...appointmentTypeRoutes,
  ...appointmentSubtypeRoutes,
  ...clinicDataRoutes,
  ...contactAddressRoutes,
  ...diagnosticTypeRoutes,
  ...documentInboxRoutes,
  ...documentSubtypeRoutes,
  ...contactRoutes,
  ...documentTypeRoutes,
  ...formRoutes,
  ...listRoutes,
  ...notesDataRoutes,
  ...organizationRoutes,
  ...patientRoutes,
  ...patientTasksRoutes,
  ...patientNotesRoutes,
  ...patientsToListRoutes,
  ...patientsWaitlistRoutes,
  ...roleRoutes,
  ...s3BucketRoutes,
  ...srFaxRoutes,
  ...templateCategoryRoutes,
  ...userRoutes,
  ...templateParagraphRoutes,
  ...formTypeRoutes,
  ...utilsRoutes,
  ...statsRoutes,


  /*****TestController*****/
  'POST /linkTobase64': { controller: 'TestController', action: 'readFile' },
  'POST /listFiles': { controller: 'TestController', action: 'listFiles' },
  'POST /textToPdf': { controller: 'TestController', action: 'uploadPdf' },
  'POST /checksrFax': { controller: 'TestController', action: 'checksrFax' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
};
