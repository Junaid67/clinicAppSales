/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  AdminController: {
    '*': ['UserPolicy', 'isAdmin'],
    login: ['UserPolicy'],
    resetPassword: ['UserPolicy', 'isAdmin'],
  },
  RoleController: {
    '*': ['isAuthenticated', 'RolePolicy']
  },
  OrganizationController: {
    'login': ['OrganizationPolicy']
  },
  UserController: {
    login: ['UserPolicy', 'isOrg'],
    createUser: ['UserPolicy', 'isSuper'],
    getUserByOrgId: ['UserPolicy', 'isSuper'],
    updateUser: ['UserPolicy', 'isSuper'],
    getAllPhysician:['isAuthenticated'],
    updatePhysicianProfile:['isAuthenticated'],
    resetPhysicianPassword:['UserPolicy','isAuthenticated']
  },
  PatientController: {
    '*': ['PatientPolicy', 'isAuthenticated']
  },
  PatientsWaitlistController: {
    '*': ['isAuthenticated']
  },
  DiagnosticTypeController: {
    '*': ['DiagnosticTypePolicy', 'isAuthenticated']
  },
  SrFaxController: {
    '*': ['SrFaxPolicy', 'isAuthenticated']
  },
  FormTypeController: {
    '*': ['FormTypePolicy', 'isAuthenticated']
  },
  FormController: {
    '*': ['FormPolicy', 'isAuthenticated']
  },
  NotesDataController: {
    '*': ['NotesDataPolicy', 'isAuthenticated']
  },
  TemplateCategoryController: {
    '*': ['TemplateCategoryPolicy', 'isAuthenticated']
  },
  TemplateParagraphController: {
    '*': ['TemplateParagraphPolicy', 'isAuthenticated']
  },
  ContactController: {
    '*': ['ContactAddressPolicy', 'isAuthenticated']
  },
  AppointmentController: {
    '*': ['AppointmentPolicy', 'isAuthenticated']
  },
  AppointmentTypeController: {
    '*': ['AppointmentPolicy', 'isAuthenticated']
  },
  AppointmentSubtypeController: {
    '*': ['AppointmentPolicy', 'isAuthenticated']
  },
  DocumentTypeController: {
    '*': ['DocumentTypePolicy', 'isAuthenticated']
  },
  DocumentSubtypeController: {
    '*': ['DocumentTypePolicy', 'isAuthenticated']
  },
  ClinicDataController: {
    '*': ['ClinicDataPolicy', 'isAuthenticated']
  },
  ListController: {
    '*': ['ListPolicy', 'isAuthenticated']
  },
  PatientsToListController: {
    '*': ['ListPolicy', 'isAuthenticated']
  },
  DocumentInboxController: {
    '*': ['DocumentInboxPolicy', 'isAuthenticated']
  },
  PatientTasksController: {
    'createPatientActivity': ['PatientTasksPolicy', 'isAuthenticated', 'PdfFromNotePolicy', 'FormPDFPolicy', 'ImageToPDFPolicy'], 
    'updatePatientActivity': ['PatientTasksPolicy', 'isAuthenticated', 'PdfFromNotePolicy', 'FormPDFPolicy', 'ImageToPDFPolicy'],
    'getAllActivities': ['PatientTasksPolicy', 'isAuthenticated'],
    'getDayActivities': ['PatientTasksPolicy', 'isAuthenticated'],
    'getFeeCodes': ['PatientTasksPolicy', 'isAuthenticated'],
    'getActivityStatus': ['PatientTasksPolicy', 'isAuthenticated'],
    'getCustomerByActivityID': ['PatientTasksPolicy', 'isAuthenticated'],
    'deletePatientActivity': ['PatientTasksPolicy', 'isAuthenticated'],
    'sendPDFFax': ['PatientTasksPolicy', 'isAuthenticated'],
    'updatePatientActivityStatus': ['PatientTasksPolicy', 'isAuthenticated'],
    'getPatientTasksById': ['PatientTasksPolicy', 'isAuthenticated'],
  },
  S3BucketController: {
    'readFile': ['PatientTasksPolicy', 'isAuthenticated']
  },
  PatientNotesController: {
    '*': ['PatientPolicy', 'isAuthenticated']
  },
  UtilsController: {
    '*': ['isAuthenticated']
  },
  StatsController: {
    '*': ['isAuthenticated']
  }


};
