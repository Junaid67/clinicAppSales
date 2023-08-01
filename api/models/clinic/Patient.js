/**
 * Patient.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'patients',
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  schema: true,
  attributes: {
    namePrefix: {
      columnName: 'name_prefix',
      type: 'string',
      columnType: 'varchar(255)'
    },
    firstName: {
      columnName: 'first_name',
      type: 'string',
      columnType: 'varchar(255)'
    },
    middleName: {
      columnName: 'middle_name',
      type: 'string',
      columnType: 'varchar(255)'
    },
    lastName: {
      columnName: 'last_name',
      type: 'string',
      columnType: 'varchar(255)'
    },
    nameSuffix: {
      columnName: 'name_suffix',
      type: 'string',
      columnType: 'varchar(255)'
    },
    gender: {
      type: 'string',
      columnType: 'varchar(10)'
    },
    dateOfBirth: {
      columnName: 'date_of_birth',
      type: 'ref',
      columnType: 'datetime'
    },
    maritalStatus: {
      columnName: 'marital_status',
      type: 'boolean',
      columnType: 'BOOLEAN'
    },
    employmentStatus: {
      columnName: 'employment_status',
      type: 'string',
      columnType: 'Text'
    },
    healthCardNumber: {
      columnName: 'health_card_number',
      type: 'string',
      columnType: 'varchar(50)'
    },
    healthCardVersionCode: {
      columnName: 'health_card_version_code',
      type: 'string',
      columnType: 'varchar(50)'
    },
    healthCardProvince: {
      columnName: 'health_card_province',
      type: 'string',
      columnType: 'Text'
    },
    healthCardExpiryDate: {
      columnName: 'health_card_expiry_date',
      type: 'ref',
      columnType: 'DATE'
    },
    chartNumber: {
      columnName: 'chart_number',
      type: 'string',
      columnType: 'Text'
    },
    preferredOfficialLanguage: {
      columnName: 'preferred_official_language',
      type: 'string',
      columnType: 'Text'
    },
    preferredSpokenLanguage: {
      columnName: 'preferred_spoken_language',
      type: 'string',
      columnType: 'Text'
    },
    primaryPhysician: {
      columnName: 'primary_physician',
      type: 'string',
      columnType: 'varchar(50)'
    },
    primaryPhysicianAddress: {
      columnName: 'primary_physician_address',
      type: 'string',
      columnType: 'Text'
    },
    primaryPhysicianBilling: {
      columnName: 'primary_physician_billing',
      type: 'string',
      columnType: 'varchar(20)'
    },
    patientStatus: {
      columnName: 'patient_status',
      type: 'string',
      columnType: 'varchar(15)'
    },
    patientStatusDate: {
      columnName: 'patient_status_date',
      type: 'ref',
      columnType: 'DATE'
    },
    enrolledToPhysician: {
      columnName: 'enrolled_to_physician',
      type: 'string',
      columnType: 'varchar(25)'
    },
    enrolmentStatus: {
      columnName: 'enrolment_status',
      type: 'string',
      columnType: 'Text'
    },
    enrolmentDate: {
      columnName: 'enrolment_date',
      type: 'ref',
      columnType: 'DATE'
    },
    enrolmentTerminationDate: {
      columnName: 'enrolment_termination_date',
      type: 'ref',
      columnType: 'DATE'
    },
    enrolmentTerminationReason: {
      columnName: 'enrolment_termination_reason',
      type: 'string',
      columnType: 'TEXT'
    },
    patientNote: {
      columnName: 'patient_note',
      type: 'string',
      columnType: 'LONGTEXT'
    },
    sin: {
      type: 'string',
      columnType: 'varchar(20)'
    },
    address: {
      type: 'string',
      columnType: 'TEXT'
    },
    streetAddress: {
      columnName: 'street_address',
      type: 'string',
      columnType: 'TEXT'
    },
    city: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    provinceState: {
      columnName: 'province_state',
      type: 'string',
      columnType: 'varchar(50)'
    },
    country: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    postalZipCode: {
      columnName: 'postal_zip_code',
      type: 'string',
      columnType: 'varchar(50)'
    },
    residencePhone: {
      columnName: 'residence_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    cellPhone: {
      columnName: 'cell_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    workPhone: {
      columnName: 'work_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    workPhoneExtension: {
      columnName: 'work_phone_extension',
      type: 'string',
      columnType: 'Text'
    },
    patientEmailAddress: {
      columnName: 'patient_e_mail_address',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactFirstName: {
      columnName: 'contact_first_name',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactLastName: {
      columnName: 'contact_last_name',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactPurpose: {
      columnName: 'contact_purpose',
      type: 'string',
      columnType: 'TEXT'
    },
    contactResidencePhone: {
      columnName: 'contact_residence_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactCellPhone: {
      columnName: 'contact_cell_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactWorkPhone: {
      columnName: 'contact_work_phone',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactWorkPhoneExtension: {
      columnName: 'contact_work_phone_extension',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactEmailAddress: {
      columnName: 'contact_e_mail_address',
      type: 'string',
      columnType: 'varchar(50)'
    },
    contactNote: {
      columnName: 'contact_note',
      type: 'string',
      columnType: 'Text'
    },
    contactRelationship: {
      columnName: 'contact_relationship',
      type: 'string',
      columnType: 'TEXT'
    },
    providerFirstName: {
      columnName: 'provider_first_name',
      type: 'string',
      columnType: 'varchar(50)'
    },
    providerLastName: {
      columnName: 'provider_last_name',
      type: 'string',
      columnType: 'varchar(50)'
    },
    providerRole: {
      columnName: 'provider_role',
      type: 'string',
      columnType: 'Text'
    },
    ohipBillingNumber: {
      columnName: 'ohip_billing_number',
      type: 'number',
      columnType: 'INT'
    },
    cpsoNumber: {
      columnName: 'cpso_number',
      type: 'number',
      columnType: 'INT'
    },
    cnoNumber: {
      columnName: 'cno_number',
      type: 'number',
      columnType: 'INT'
    },
    startDate: {
      columnName: 'start_date',
      type: 'ref',
      columnType: 'DATE'
    },
    ageAtOnset: {
      columnName: 'age_at_onset',
      type: 'string',
      columnType: 'TEXT'
    },
    lifeStage: {
      columnName: 'life_stage',
      type: 'string',
      columnType: 'TEXT'
    },
    problemDiagnosisProcedure: {
      columnName: 'problem_diagnosis_procedure',
      type: 'string',
      columnType: 'TEXT'
    },
    treatment: {
      columnName: 'treatment',
      type: 'string',
      columnType: 'TEXT'
    },
    relationship: {
      columnName: 'relationship',
      type: 'string',
      columnType: 'Text'
    },
    familyMedicalHistroyNotes: {
      columnName: 'family_medical_histroy_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    dateOfOnset: {
      columnName: 'date_of_onset',
      type: 'ref',
      columnType: 'DATE'
    },
    ongoingHealthLifeStage: {
      columnName: 'ongoing_health_life_stage',
      type: 'string',
      columnType: 'Text'
    },
    resolutionDate: {
      columnName: 'resolution_date',
      type: 'ref',
      columnType: 'DATE'
    },
    diagnosisProblem: {
      columnName: 'diagnosis_problem',
      type: 'string',
      columnType: 'Text'
    },
    problemDescription: {
      columnName: 'problem_description',
      type: 'string',
      columnType: 'TEXT'
    },
    problemStatus: {
      columnName: 'problem_status',
      type: 'string',
      columnType: 'Text'
    },
    ongoingHealthNotes: {
      columnName: 'ongoing_health_notes',
      type: 'string',
      columnType: 'Text'
    },
    pastMedicalSurgicalDateOfOnset: {
      columnName: 'past_medical_surgical_date_of_onset',
      type: 'ref',
      columnType: 'DATE'
    },
    pastMedicalSurgicalLifeStage: {
      columnName: 'past_medical_surgical_life_stage',
      type: 'string',
      columnType: 'Text'
    },
    resolutionDatePastMedical: {
      columnName: 'resolution_date_past_medical',
      type: 'ref',
      columnType: 'DATE'
    },
    pastMedicalSurgicalDiagnosisProblem: {
      columnName: 'past_medical_surgical_diagnosis_problem',
      type: 'string',
      columnType: 'Text'
    },
    procedureDate: {
      columnName: 'procedure_date',
      type: 'ref',
      columnType: 'DATE'
    },
    pastMedicalSurgicalProcedure: {
      columnName: 'past_medical_surgical_procedure',
      type: 'string',
      columnType: 'Text'
    },
    pastMedicalSurgicalNotes: {
      columnName: 'past_medical_surgical_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    pastMedicalSurgicalProblemStatus: {
      columnName: 'past_medical_surgical_problem_status',
      type: 'string',
      columnType: 'Text'
    },
    immunizationName: {
      columnName: 'immunization_name',
      type: 'string',
      columnType: 'Text'
    },
    immunizationCode: {
      columnName: 'immunization_code',
      type: 'number',
      columnType: 'INT'
    },
    immunizationType: {
      columnName: 'immunization_type',
      type: 'string',
      columnType: 'Text'
    },
    manufacturer: {
      columnName: 'manufacturer',
      type: 'string',
      columnType: 'Text'
    },
    lotNo: {
      columnName: 'lot_#',
      type: 'string',
      columnType: 'Text'
    },
    route: {
      columnName: 'route',
      type: 'string',
      columnType: 'Text'
    },
    site: {
      columnName: 'site',
      type: 'string',
      columnType: 'Text'
    },
    dose: {
      columnName: 'dose',
      type: 'string',
      columnType: 'Text'
    },
    immunizationDate: {
      columnName: 'immunization_date',
      type: 'ref',
      columnType: 'DATE'
    },
    immunizationRefusedDate: {
      columnName: 'immunization_refused_date',
      type: 'ref',
      columnType: 'DATE'
    },
    refusedIndicator: {
      columnName: 'refused_indicator',
      type: 'string',
      columnType: 'Text'
    },
    instructions: {
      columnName: 'instructions',
      type: 'string',
      columnType: 'Text'
    },
    immunizationNotes: {
      columnName: 'immunization_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    prescriptionWrittenDate: {
      columnName: 'prescription_written_date',
      type: 'ref',
      columnType: 'DATE'
    },
    medicationStartDate: {
      columnName: 'medication_start_date',
      type: 'ref',
      columnType: 'DATE'
    },
    nameMedication: {
      columnName: 'name_medication',
      type: 'string',
      columnType: 'TEXT'
    },
    drugDescription: {
      columnName: 'drug_description',
      type: 'string',
      columnType: 'TEXT'
    },
    drugCode: {
      columnName: 'drug_code',
      type: 'string',
      columnType: 'TEXT'
    },
    drugStrengthMedication: {
      columnName: 'drug_strength_medication',
      type: 'string',
      columnType: 'TEXT'
    },
    dosage: {
      columnName: 'dosage',
      type: 'string',
      columnType: 'TEXT'
    },
    drugForm: {
      columnName: 'drug_form',
      type: 'string',
      columnType: 'TEXT'
    },
    medicationRoute: {
      columnName: 'medication_route',
      type: 'string',
      columnType: 'TEXT'
    },
    frequency: {
      columnName: 'frequency',
      type: 'string',
      columnType: 'TEXT'
    },
    duration: {
      columnName: 'duration',
      type: 'string',
      columnType: 'TEXT'
    },
    refillDuration: {
      columnName: 'refill_duration',
      type: 'string',
      columnType: 'TEXT'
    },
    quantity: {
      columnName: 'quantity',
      type: 'string',
      columnType: 'TEXT'
    },
    refillQuantity: {
      columnName: 'refill_quantity',
      type: 'string',
      columnType: 'TEXT'
    },
    numberOfRefillsRepeats: {
      columnName: 'number_of_refills_repeats',
      type: 'string',
      columnType: 'TEXT'
    },
    longTermMedication: {
      columnName: 'long_term_medication',
      type: 'string',
      columnType: 'TEXT'
    },
    pastMedicationIndicator: {
      columnName: 'past_medication_indicator',
      type: 'string',
      columnType: 'TEXT'
    },
    patientCompliance: {
      columnName: 'patient_compliance',
      type: 'string',
      columnType: 'TEXT'
    },
    medicationNotes: {
      columnName: 'medication_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    prescriptionInstructions: {
      columnName: 'prescription_instructions',
      type: 'string',
      columnType: 'TEXT'
    },
    prescribedByName: {
      columnName: 'prescribed_by_name',
      type: 'string',
      columnType: 'TEXT'
    },
    // prescribedByIdentifier: {
    //   columnName: 'prescribed_by_identifier',
    //   type: 'string',
    //   columnType: 'TEXT'
    // },
    // prescriptionIdentifier: {
    //   columnName: 'prescription_identifier',
    //   type: 'string',
    //   columnType: 'TEXT'
    // },
    // priorPrescriptionReference: {
    //   columnName: 'prior_prescription_reference',
    //   type: 'string',
    //   columnType: 'TEXT'
    // },
    treatmentType: {
      columnName: 'treatment_type',
      type: 'string',
      columnType: 'TEXT'
    },
    prescriptionStatus: {
      columnName: 'prescription_status',
      type: 'string',
      columnType: 'TEXT'
    },
    nonAuthoritativeIndicator: {
      columnName: 'non_authoritative_indicator',
      type: 'string',
      columnType: 'TEXT'
    },
    dispenseInterval: {
      columnName: 'dispense_interval',
      type: 'string',
      columnType: 'TEXT'
    },
    substitutionNotAllowed: {
      columnName: 'substitution_not_allowed',
      type: 'string',
      columnType: 'TEXT'
    },
    targetedDispensingFacilityServiceLocationAddress: {
      columnName: 'targeted_dispensing_facility_service_location_address',
      type: 'string',
      columnType: 'TEXT'
    },
    targetedDispensingFacilityServiceLocationName: {
      columnName: 'targeted_dispensing_facility_service_location_name',
      type: 'string',
      columnType: 'TEXT'
    },
    targetedDispensingFacilityServiceLocationIdentifier: {
      columnName: 'targeted_dispensing_facility_service_location_identifier',
      type: 'string',
      columnType: 'TEXT'
    },
    toBePickedUpWhen: {
      columnName: 'to_be_picked_up_when',
      type: 'string',
      columnType: 'TEXT'
    },
    problemCode: {
      columnName: 'problem_code',
      type: 'string',
      columnType: 'TEXT'
    },
    protocolIdentifier: {
      columnName: 'protocol_identifier',
      type: 'string',
      columnType: 'TEXT'
    },
    laboratoryName: {
      columnName: 'laboratory_name',
      type: 'string',
      columnType: 'TEXT'
    },
    laboratoryTestCode: {
      columnName: 'laboratory_test_code',
      type: 'string',
      columnType: 'TEXT'
    },
    laboratoryTestName: {
      columnName: 'laboratory_test_name',
      type: 'string',
      columnType: 'TEXT'
    },
    emrTestName: {
      columnName: 'emr_test_name',
      type: 'string',
      columnType: 'TEXT'
    },
    accessionNumber: {
      columnName: 'accession_number',
      type: 'string',
      columnType: 'TEXT'
    },
    collectionDateTime: {
      columnName: 'collection_date_time',
      type: 'string',
      columnType: 'TEXT'
    },
    resultValue: {
      columnName: 'result_value',
      type: 'string',
      columnType: 'TEXT'
    },
    resultUnitOfMeasure: {
      columnName: 'result_unit_of_measure',
      type: 'string',
      columnType: 'TEXT'
    },
    referenceRangeLow: {
      columnName: 'reference_range_low',
      type: 'string',
      columnType: 'TEXT'
    },
    referenceRangeHigh: {
      columnName: 'reference_range_high',
      type: 'string',
      columnType: 'TEXT'
    },
    referenceRangeTextBased: {
      columnName: 'reference_range_text_based',
      type: 'string',
      columnType: 'TEXT'
    },
    abnormalIndicator: {
      columnName: 'abnormal_indicator',
      type: 'string',
      columnType: 'TEXT'
    },
    testResultStatus: {
      columnName: 'test_result_status',
      type: 'string',
      columnType: 'TEXT'
    },
    orderingPractitioner: {
      columnName: 'ordering_practitioner',
      type: 'string',
      columnType: 'TEXT'
    },
    resultCopiedTo: {
      columnName: 'result_copied_to',
      type: 'string',
      columnType: 'TEXT'
    },
    labNotes: {
      columnName: 'lab_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    physicianNotes: {
      columnName: 'physician_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    labRequisitionDateTime: {
      columnName: 'lab_requisition_date_time',
      type: 'string',
      columnType: 'TEXT'
    },
    dateTimeResultsEnteredInEmr: {
      columnName: 'date_time_results_entered_in_emr',
      type: 'string',
      columnType: 'TEXT'
    },
    reviewerIdentity: {
      columnName: 'reviewer_identity',
      type: 'string',
      columnType: 'TEXT'
    },
    reviewDateTime: {
      columnName: 'review_date_time',
      type: 'string',
      columnType: 'TEXT'
    },
    blockedTestResult: {
      columnName: 'blocked_test_result',
      type: 'string',
      columnType: 'TEXT'
    },
    offendingAgent: {
      columnName: 'offending_agent',
      type: 'string',
      columnType: 'TEXT'
    },
    lergiesAdverseStartDate: {
      columnName: 'lergies_adverse_start_date',
      type: 'string',
      columnType: 'TEXT'
    },
    lifeStagelergiesAdverse: {
      columnName: 'life_stagelergies_adverse',
      type: 'string',
      columnType: 'TEXT'
    },
    severity: {
      columnName: 'severity',
      type: 'string',
      columnType: 'TEXT'
    },
    offendingAgentDrugCode: {
      columnName: 'offending_agent_drug_code',
      type: 'string',
      columnType: 'TEXT'
    },
    reactionType: {
      columnName: 'reaction_type',
      type: 'string',
      columnType: 'TEXT'
    },
    reactionDescription: {
      columnName: 'reaction_description',
      type: 'string',
      columnType: 'TEXT'
    },
    recordedDate: {
      columnName: 'recorded_date',
      type: 'string',
      columnType: 'TEXT'
    },
    lergiesAdverseNotes: {
      columnName: 'lergies_adverse_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    riskFactor: {
      columnName: 'risk_factor',
      type: 'string',
      columnType: 'TEXT'
    },
    exposureDetails: {
      columnName: 'exposure_details',
      type: 'string',
      columnType: 'TEXT'
    },
    riskFactorAgeAtOnset: {
      columnName: 'risk_factor_age_at_onset',
      type: 'string',
      columnType: 'TEXT'
    },
    riskFactorStartDate: {
      columnName: 'risk_factor_start_date',
      type: 'ref',
      columnType: 'DATE'
    },
    endDate: {
      columnName: 'end_date',
      type: 'ref',
      columnType: 'DATE'
    },
    riskFactorLifeStage: {
      columnName: 'risk_factor_life_stage',
      type: 'string',
      columnType: 'TEXT'
    },
    riskFactorNotes: {
      columnName: 'risk_factor_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    alertDescription: {
      columnName: 'alert_description',
      type: 'string',
      columnType: 'TEXT'
    },
    alertNotes: {
      columnName: 'alert_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    dateActive: {
      columnName: 'date_active',
      type: 'string',
      columnType: 'TEXT'
    },
    alertEndDate: {
      columnName: 'alert_end_date',
      type: 'ref',
      columnType: 'DATE'
    },
    sourceFacility: {
      columnName: 'source_facility',
      type: 'string',
      columnType: 'TEXT'
    },
    sourceFacilityId: {
      columnName: 'source_facility_id',
      type: 'string',
      columnType: 'TEXT'
    },
    sourceAuthor: {
      columnName: 'source_author',
      type: 'string',
      columnType: 'TEXT'
    },
    creationDate: {
      columnName: 'creation_date',
      type: 'ref',
      columnType: 'DATE'
    },
    receiveDate: {
      columnName: 'receive_date',
      type: 'ref',
      columnType: 'DATE'
    },
    reportContent: {
      columnName: 'report_content',
      type: 'string',
      columnType: 'TEXT'
    },
    sourceFacilityReportNumber: {
      columnName: 'source_facility_report_number',
      type: 'string',
      columnType: 'TEXT'
    },
    notes: {
      columnName: 'notes',
      type: 'string',
      columnType: 'TEXT'
    },
    reportClass: {
      columnName: 'report_class',
      type: 'string',
      columnType: 'TEXT'
    },
    reportSubClass: {
      columnName: 'report_sub_class',
      type: 'string',
      columnType: 'TEXT'
    },
    accompanyingSubClass: {
      columnName: 'accompanying_sub_class',
      type: 'string',
      columnType: 'TEXT'
    },
    accompanyingMnemonic: {
      columnName: 'accompanying_mnemonic',
      type: 'string',
      columnType: 'TEXT'
    },
    accompanyingDescription: {
      columnName: 'accompanying_description',
      type: 'string',
      columnType: 'TEXT'
    },
    reportStatus: {
      columnName: 'report_status',
      type: 'string',
      columnType: 'TEXT'
    },
    responsibleProvider: {
      columnName: 'responsible_provider',
      type: 'string',
      columnType: 'TEXT'
    },
    reportReviewerIdentity: {
      columnName: 'report_reviewer_identity',
      type: 'string',
      columnType: 'TEXT'
    },
    reportReviewDateTime: {
      columnName: 'report_review_date_time',
      type: 'string',
      columnType: 'TEXT'
    },
    appointmentDateTime: {
      columnName: 'appointment_date_time',
      type: 'ref',
      columnType: 'DATETIME'
    },
    appointmentDuration: {
      columnName: 'appointment_duration',
      type: 'string',
      columnType: 'TEXT'
    },
    appointmentStatus: {
      columnName: 'appointment_status',
      type: 'string',
      columnType: 'TEXT'
    },
    appointmentPurpose: {
      columnName: 'appointment_purpose',
      type: 'string',
      columnType: 'TEXT'
    },
    appointmentNotes: {
      columnName: 'appointment_notes',
      type: 'string',
      columnType: 'TEXT'
    },
    appointmentProviderIdentity: {
      columnName: 'appointment_provider_identity',
      type: 'string',
      columnType: 'TEXT'
    },
    bloodPressure: {
      columnName: 'blood_pressure',
      type: 'string',
      columnType: 'TEXT'
    },
    dateBloodPressure: {
      columnName: 'date_blood_pressure',
      type: 'ref',
      columnType: 'DATE'
    },
    heartRate: {
      columnName: 'heart_rate',
      type: 'string',
      columnType: 'TEXT'
    },
    dateHeartRate: {
      columnName: 'date_heart_rate',
      type: 'ref',
      columnType: 'DATE'
    },
    height: {
      columnName: 'height',
      type: 'string',
      columnType: 'TEXT'
    },
    dateHeight: {
      columnName: 'date_height',
      type: 'ref',
      columnType: 'DATE'
    },
    weight: {
      columnName: 'weight',
      type: 'string',
      columnType: 'TEXT'
    },
    dateWeight: {
      columnName: 'date_weight',
      type: 'ref',
      columnType: 'DATE'
    },
    bmi: {
      columnName: 'bmi',
      type: 'string',
      columnType: 'TEXT'
    },
    dateBmi: {
      columnName: 'date_bmi',
      type: 'ref',
      columnType: 'DATE'
    },
    waistCircumference: {
      columnName: 'waist_circumference',
      type: 'string',
      columnType: 'TEXT'
    },
    dateWaistCircumference: {
      columnName: 'date_waist_circumference',
      type: 'ref',
      columnType: 'DATE'
    },
    smokingStatus: {
      columnName: 'smoking_status',
      type: 'string',
      columnType: 'TEXT'
    },
    dateSmokingStatus: {
      columnName: 'date_smoking_status',
      type: 'ref',
      columnType: 'DATE'
    },
    smokingPacksDay: {
      columnName: 'smoking_packs_day',
      type: 'string',
      columnType: 'TEXT'
    },
    dateSmokingPacksDay: {
      columnName: 'date_smoking_packs_day',
      type: 'ref',
      columnType: 'DATE'
    },
    alcoholUseDrinksWeek: {
      columnName: 'alcohol_use_drinks_week',
      type: 'string',
      columnType: 'TEXT'
    },
    dateAlcoholUse: {
      columnName: 'date_alcohol_use',
      type: 'ref',
      columnType: 'DATE'
    },
    erectileFunction: {
      columnName: 'erectile_function',
      type: 'string',
      columnType: 'TEXT'
    },
    dateErectileFunction: {
      columnName: 'date_erectile_function',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1BeforePuffPersonalBestOf3: {
      columnName: 'fev1_before_puff_personal_best_of_3',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1Before: {
      columnName: 'date_fev1_before',
      type: 'ref',
      columnType: 'DATE'
    },
    fvcBeforePuff: {
      columnName: 'fvc_before_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFvcBeforePuff: {
      columnName: 'date_fvc_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1PercentBeforePuff: {
      columnName: 'fev1_percent_before_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1PercentBeforePuff: {
      columnName: 'date_fev1_percent_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1Predicted: {
      columnName: 'fev1_predicted',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1Predicted: {
      columnName: 'date_fev1_predicted',
      type: 'ref',
      columnType: 'DATE'
    },
    fevPredicted: {
      columnName: 'fev_predicted',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFvcPredictedBeforePuff: {
      columnName: 'date_fvc_predicted_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1PercentOfPredictedBeforePuff: {
      columnName: 'fev1_percent_of_predicted_before_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1PercentOfPredictedBeforePuff: {
      columnName: 'date_fev1_percent_of_predicted_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fvcRatioBeforePuff: {
      columnName: 'fvc_ratio_before_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFvcRatioBeforePuff: {
      columnName: 'date_fvc_ratio_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1FvcRatioBeforePuff: {
      columnName: 'fev1_fvc_ratio_before_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1FvcRatioBeforePuff: {
      columnName: 'date_fev1_fvc_ratio_before_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    pefPersonalBeforePuffBestOf3: {
      columnName: 'pef_personal_before_puff_best_of_3',
      type: 'string',
      columnType: 'TEXT'
    },
    datePefPersonalBeforePuffBestOf3: {
      columnName: 'date_pef_personal_before_puff_best_of_3',
      type: 'ref',
      columnType: 'DATE'
    },
    afterPuffPersonalBestOf3: {
      columnName: 'after_puff_personal_best_of_3',
      type: 'string',
      columnType: 'TEXT'
    },
    dateAfterPuff: {
      columnName: 'date_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fvcAfterPuff: {
      columnName: 'fvc_after_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFvcAfterPuff: {
      columnName: 'date_fvc_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1PercentAfterPuff: {
      columnName: 'fev1_percent_after_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1PercentAfterPuff: {
      columnName: 'date_fev1_percent_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1PercentOfPredictedAfterPuff: {
      columnName: 'fev1_percent_of_predicted_after_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1PercentOfPredictedAfterPuff: {
      columnName: 'date_fev1_percent_of_predicted_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fvcRatioAfterPuff: {
      columnName: 'fvc_ratio_after_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFvcRatioAfterPuff: {
      columnName: 'date_fvc_ratio_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    fev1FvcRatioAfterPuff: {
      columnName: 'fev1_fvc_ratio_after_puff',
      type: 'string',
      columnType: 'TEXT'
    },
    dateFev1FvcRatioAfterPuff: {
      columnName: 'date_fev1_fvc_ratio_after_puff',
      type: 'ref',
      columnType: 'DATE'
    },
    pefPersonalAfterPuffBestOf3: {
      columnName: 'pef_personal_after_puff_best_of_3',
      type: 'string',
      columnType: 'TEXT'
    },
    datePefPersonalAfterPuffBestOf3: {
      columnName: 'date_pef_personal_after_puff_best_of_3',
      type: 'ref',
      columnType: 'DATE'
    },
    o2Saturation: {
      columnName: 'o2_saturation',
      type: 'string',
      columnType: 'TEXT'
    },
    dateO2Saturation: {
      columnName: 'date_o2_saturation',
      type: 'ref',
      columnType: 'DATE'
    },
    responseAction: {
     columnName: 'response_action',
      type: 'ref',
     columnType: 'varchar(255)'
    },
    responseCode: {
      columnName: 'response_code',
      type: 'ref',
      columnType: 'varchar(100)'
    },
    responseDescription: {
      columnName: 'response_description',
      type: 'ref',
      columnType: 'LONGTEXT'
    },
    responseId: {
      columnName: 'response_id',
      type: 'ref',
      columnType: 'varchar(100)'
    },
    /**
     * Associations
     */
    patientsToList: {
      collection: 'patientsToList',
      via: 'patientId'
    },
    patientTasks: {
      collection: 'patientTasks',
      via: 'patientId'
    },
    patientMetadata: {
      collection: 'patientMetadata',
      via: 'patientId'
    },
    recentPatient: {
      collection: 'recentPatient',
      via: 'patientId'
    },
    diagnosticTypeId: {
      columnName: 'diagnostic_type_id',
      model: 'diagnostictype'
    },
    patientsWaitlist: {
      collection: 'patientsWaitlist',
      via: 'patientId'
    },
    patientNotes: {
      collection: 'patientnotes',
      via: 'patientId'
    },
    documentInbox: {
      collection: 'documentinbox',
      via: 'patientId'
    },
    physicianId: {
      columnName: 'physician_id',
      model: 'user'
    }
  }
};

