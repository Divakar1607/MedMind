// ─────────────────────────────────────────────────────────────────────────────
// clinicalData.ts — Rich mock data for all 6 role-specific workspaces
// ─────────────────────────────────────────────────────────────────────────────
import type {
  ClinicalPatient, Prescription, VitalRecord, LabReport, BloodSampleRecord,
  AllergyRecord, EmergencyRecord, FollowUp, Medicine, AvailableTest,
  LabEquipmentItem, DoctorStaff, PatientAssignment,
  PrescriptionAdministration
} from '../types/clinical';

// ── Patients ──────────────────────────────────────────────────────────────────
export const MOCK_PATIENTS: ClinicalPatient[] = [
  { id: 'P-1001', name: 'Rajesh Mehta', age: 67, gender: 'Male', mrn: 'MRN-10012', admissionDate: '2026-08-20', room: 'ICU-4A', department: 'Cardiology', assignedDoctor: 'Dr. Arun Kumar', primaryDiagnosis: 'Acute Myocardial Infarction', priority: 'CRITICAL', aiPriorityScore: 0.93, codeStatus: 'Full Code', nextCheckup: '2026-09-01', nextBloodReport: '2026-08-31', latestVitalStatus: 'Deteriorating', latestLabStatus: 'Results Pending', lastUpdateTime: '08:42 AM' },
  { id: 'P-1002', name: 'Priya Nair', age: 54, gender: 'Female', mrn: 'MRN-10013', admissionDate: '2026-08-22', room: 'Ward-2B', department: 'Neurology', assignedDoctor: 'Dr. Arun Kumar', primaryDiagnosis: 'Ischemic Stroke', priority: 'HIGH', aiPriorityScore: 0.78, codeStatus: 'Full Code', nextCheckup: '2026-09-02', nextBloodReport: '2026-09-01', latestVitalStatus: 'Stable', latestLabStatus: 'Completed', lastUpdateTime: '09:15 AM' },
  { id: 'P-1003', name: 'Suresh Babu', age: 43, gender: 'Male', mrn: 'MRN-10014', admissionDate: '2026-08-25', room: 'Ward-3C', department: 'General Medicine', assignedDoctor: 'Dr. Meena Shah', primaryDiagnosis: 'Type 2 Diabetes — Ketoacidosis', priority: 'HIGH', aiPriorityScore: 0.71, codeStatus: 'Full Code', nextCheckup: '2026-09-05', nextBloodReport: '2026-09-03', latestVitalStatus: 'Improving', latestLabStatus: 'Completed', lastUpdateTime: '10:00 AM' },
  { id: 'P-1004', name: 'Anita Sharma', age: 72, gender: 'Female', mrn: 'MRN-10015', admissionDate: '2026-08-18', room: 'Ward-1A', department: 'Pulmonology', assignedDoctor: 'Dr. Arun Kumar', primaryDiagnosis: 'COPD Exacerbation', priority: 'MEDIUM', aiPriorityScore: 0.52, codeStatus: 'DNR', nextCheckup: '2026-09-08', nextBloodReport: '2026-09-06', latestVitalStatus: 'Stable', latestLabStatus: 'Completed', lastUpdateTime: '07:30 AM' },
  { id: 'P-1005', name: 'Vikram Reddy', age: 31, gender: 'Male', mrn: 'MRN-10016', admissionDate: '2026-08-28', room: 'Ward-4D', department: 'Orthopedics', assignedDoctor: 'Dr. Meena Shah', primaryDiagnosis: 'Femur Fracture Post-Op', priority: 'LOW', aiPriorityScore: 0.21, codeStatus: 'Full Code', nextCheckup: '2026-09-12', nextBloodReport: '2026-09-10', latestVitalStatus: 'Stable', latestLabStatus: 'Completed', lastUpdateTime: '06:00 AM' },
];

// ── Prescriptions ─────────────────────────────────────────────────────────────
export const MOCK_PRESCRIPTIONS: Prescription[] = [
  { id: 'RX-001', patientId: 'P-1001', medicine: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take after food', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-20', nextReviewDate: '2026-09-01', status: 'Active' },
  { id: 'RX-002', patientId: 'P-1001', medicine: 'Atorvastatin', dosage: '40mg', frequency: 'Once at night', duration: '30 days', instructions: 'Take at bedtime', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-20', nextReviewDate: '2026-09-01', status: 'Active' },
  { id: 'RX-003', patientId: 'P-1001', medicine: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with water', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-20', nextReviewDate: '2026-09-01', status: 'Active' },
  { id: 'RX-004', patientId: 'P-1001', medicine: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take with food', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-15', nextReviewDate: '2026-08-20', status: 'Completed' },
  { id: 'RX-005', patientId: 'P-1002', medicine: 'Alteplase', dosage: '0.9 mg/kg IV', frequency: 'Single dose', duration: '1 day', instructions: 'Administer per protocol', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-22', nextReviewDate: '2026-08-25', status: 'Completed' },
  { id: 'RX-006', patientId: 'P-1002', medicine: 'Enoxaparin', dosage: '40mg SC', frequency: 'Once daily', duration: '14 days', instructions: 'Subcutaneous injection', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-23', nextReviewDate: '2026-09-02', status: 'Active' },
  { id: 'RX-007', patientId: 'P-1004', medicine: 'Salbutamol Inhaler', dosage: '2 puffs', frequency: 'PRN (as needed)', duration: 'Ongoing', instructions: 'Use during breathing difficulty', prescribingDoctor: 'Dr. Arun Kumar', prescriptionDate: '2026-08-18', nextReviewDate: '2026-09-08', status: 'Active' },
];

// ── Prescription Administration (Nurse updates) ───────────────────────────────
export const MOCK_PRESCRIPTION_ADMIN: PrescriptionAdministration[] = [
  { prescriptionId: 'RX-001', medicine: 'Aspirin 75mg', scheduledTime: '08:00 AM', status: 'Administered', updatedBy: 'Nurse Divya', updatedAt: '2026-08-30 08:10' },
  { prescriptionId: 'RX-002', medicine: 'Atorvastatin 40mg', scheduledTime: '10:00 PM', status: 'Scheduled', updatedBy: 'Nurse Divya', updatedAt: '2026-08-30 08:10' },
  { prescriptionId: 'RX-003', medicine: 'Metoprolol 25mg', scheduledTime: '08:00 AM', status: 'Administered', updatedBy: 'Nurse Preethi', updatedAt: '2026-08-30 08:20' },
  { prescriptionId: 'RX-003', medicine: 'Metoprolol 25mg', scheduledTime: '08:00 PM', status: 'Pending', updatedBy: '', updatedAt: '' },
];

// ── Vital Records ─────────────────────────────────────────────────────────────
export const MOCK_VITALS: VitalRecord[] = [
  { id: 'V-001', patientId: 'P-1001', timestamp: '2026-08-30 08:00', spo2: 92, systolicBP: 88, diastolicBP: 58, heartRate: 118, respiratoryRate: 24, temperature: 37.8, bloodSugar: 142, recordedBy: 'Nurse Divya' },
  { id: 'V-002', patientId: 'P-1001', timestamp: '2026-08-30 04:00', spo2: 90, systolicBP: 85, diastolicBP: 55, heartRate: 122, respiratoryRate: 26, temperature: 38.1, bloodSugar: 156, recordedBy: 'Nurse Preethi' },
  { id: 'V-003', patientId: 'P-1001', timestamp: '2026-08-29 20:00', spo2: 94, systolicBP: 92, diastolicBP: 61, heartRate: 110, respiratoryRate: 22, temperature: 37.6, bloodSugar: 138, recordedBy: 'Nurse Preethi' },
  { id: 'V-004', patientId: 'P-1001', timestamp: '2026-08-29 14:00', spo2: 95, systolicBP: 98, diastolicBP: 65, heartRate: 102, respiratoryRate: 20, temperature: 37.4, bloodSugar: 128, recordedBy: 'Nurse Divya' },
  { id: 'V-005', patientId: 'P-1002', timestamp: '2026-08-30 09:00', spo2: 97, systolicBP: 128, diastolicBP: 78, heartRate: 76, respiratoryRate: 16, temperature: 36.8, bloodSugar: 112, recordedBy: 'Nurse Ranjani' },
  { id: 'V-006', patientId: 'P-1004', timestamp: '2026-08-30 07:30', spo2: 93, systolicBP: 118, diastolicBP: 72, heartRate: 88, respiratoryRate: 22, temperature: 36.9, bloodSugar: 104, recordedBy: 'Nurse Divya' },
];

// ── Lab Reports ───────────────────────────────────────────────────────────────
export const MOCK_LAB_REPORTS: LabReport[] = [
  { id: 'LR-001', patientId: 'P-1001', testName: 'Troponin I', result: '4.82', unit: 'ng/mL', referenceRange: '<0.04', date: '2026-08-30', previousResult: '2.11', trend: 'UP', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
  { id: 'LR-002', patientId: 'P-1001', testName: 'CK-MB', result: '68', unit: 'U/L', referenceRange: '0–25', date: '2026-08-30', previousResult: '44', trend: 'UP', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
  { id: 'LR-003', patientId: 'P-1001', testName: 'CBC — WBC', result: '11.2', unit: 'K/µL', referenceRange: '4.0–11.0', date: '2026-08-30', previousResult: '9.8', trend: 'UP', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
  { id: 'LR-004', patientId: 'P-1001', testName: 'Serum Creatinine', result: '1.8', unit: 'mg/dL', referenceRange: '0.7–1.2', date: '2026-08-29', previousResult: '1.6', trend: 'UP', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
  { id: 'LR-005', patientId: 'P-1001', testName: 'BNP', result: 'Pending', unit: 'pg/mL', referenceRange: '<100', date: '2026-08-30', previousResult: '920', trend: 'STABLE', status: 'Pending', reportedBy: '' },
  { id: 'LR-006', patientId: 'P-1002', testName: 'PT/INR', result: '1.4', unit: '', referenceRange: '0.9–1.1', date: '2026-08-30', previousResult: '1.6', trend: 'DOWN', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
  { id: 'LR-007', patientId: 'P-1002', testName: 'CBC — Platelet', result: '182', unit: 'K/µL', referenceRange: '150–400', date: '2026-08-30', previousResult: '176', trend: 'STABLE', status: 'Completed', reportedBy: 'Lab Analyst Kiran' },
];

// ── Blood Sample Records ──────────────────────────────────────────────────────
export const MOCK_BLOOD_SAMPLES: BloodSampleRecord[] = [
  { id: 'BS-001', patientId: 'P-1001', testName: 'Troponin I', sampleType: 'Venous Blood', collectionDateTime: '2026-08-30 06:00', collectedBy: 'Nurse Divya', status: 'Completed' },
  { id: 'BS-002', patientId: 'P-1001', testName: 'BNP', sampleType: 'Venous Blood', collectionDateTime: '2026-08-30 07:30', collectedBy: 'Nurse Preethi', status: 'Sent to Lab' },
  { id: 'BS-003', patientId: 'P-1002', testName: 'PT/INR', sampleType: 'Venous Blood', collectionDateTime: '2026-08-30 07:00', collectedBy: 'Nurse Ranjani', status: 'Completed' },
  { id: 'BS-004', patientId: 'P-1004', testName: 'ABG', sampleType: 'Arterial Blood', collectionDateTime: '2026-08-30 06:30', collectedBy: 'Nurse Divya', status: 'Requested' },
];

// ── Allergies ─────────────────────────────────────────────────────────────────
export const MOCK_ALLERGIES: AllergyRecord[] = [
  { id: 'AL-001', patientId: 'P-1001', allergen: 'Penicillin', reaction: 'Anaphylaxis', severity: 'Life-threatening', dateRecorded: '2022-04-10', source: 'Patient History' },
  { id: 'AL-002', patientId: 'P-1001', allergen: 'Contrast Dye (Iodine)', reaction: 'Hives, Urticaria', severity: 'Moderate', dateRecorded: '2024-01-15', source: 'Previous Admission' },
  { id: 'AL-003', patientId: 'P-1002', allergen: 'Aspirin (NSAIDs)', reaction: 'Bronchospasm', severity: 'Severe', dateRecorded: '2021-09-22', source: 'Patient Reported' },
  { id: 'AL-004', patientId: 'P-1004', allergen: 'Latex', reaction: 'Contact Dermatitis', severity: 'Mild', dateRecorded: '2023-06-01', source: 'Nurse Assessment' },
];

// ── Emergency History ─────────────────────────────────────────────────────────
export const MOCK_EMERGENCIES: EmergencyRecord[] = [
  { id: 'EM-001', patientId: 'P-1001', date: '2026-08-20', eventType: 'Cardiac Arrest (STEMI)', notes: 'Code Blue activated at 14:32. CPR for 3 min, ROSC achieved. Transferred to Cath Lab.', department: 'Emergency', outcome: 'Stabilised — ICU Transfer' },
  { id: 'EM-002', patientId: 'P-1001', date: '2024-11-08', eventType: 'Hypotensive Episode', notes: 'BP dropped to 78/50 during dialysis session. Fluids administered.', department: 'Nephrology', outcome: 'Resolved' },
  { id: 'EM-003', patientId: 'P-1002', date: '2026-08-22', eventType: 'Acute Ischaemic Stroke', notes: 'Sudden onset right-sided weakness and aphasia. CT confirmed ischaemic stroke. tPA administered within 3h window.', department: 'Emergency', outcome: 'Stabilised — Neurology Ward' },
];

// ── Follow-up ─────────────────────────────────────────────────────────────────
export const MOCK_FOLLOWUPS: FollowUp[] = [
  { patientId: 'P-1001', nextCheckupDate: '2026-09-01', nextCheckupNote: 'Post-STEMI follow-up — review ECG and echo results', nextLabTestDate: '2026-08-31', requiredTest: 'Troponin I + BNP', labTestStatus: 'Pending' },
  { patientId: 'P-1002', nextCheckupDate: '2026-09-02', nextCheckupNote: 'Neurological assessment + INR review', nextLabTestDate: '2026-09-01', requiredTest: 'PT/INR + CBC', labTestStatus: 'Scheduled' },
  { patientId: 'P-1004', nextCheckupDate: '2026-09-08', nextCheckupNote: 'Pulmonary function test and spirometry', nextLabTestDate: '2026-09-06', requiredTest: 'ABG + CBC', labTestStatus: 'Pending' },
];

// ── Medicines ─────────────────────────────────────────────────────────────────
export const MOCK_MEDICINES: Medicine[] = [
  { id: 'M-001', name: 'Aspirin', composition: 'Acetylsalicylic Acid', strength: '75mg', manufacturer: 'Sun Pharma', availableQuantity: 480, unit: 'Tablets', batchNumber: 'SP-2026-A1', expiryDate: '2028-06', category: 'Antiplatelet' },
  { id: 'M-002', name: 'Atorvastatin', composition: 'Atorvastatin Calcium', strength: '40mg', manufacturer: 'Cipla Ltd', availableQuantity: 360, unit: 'Tablets', batchNumber: 'CP-2026-B4', expiryDate: '2028-03', category: 'Statin' },
  { id: 'M-003', name: 'Metoprolol Succinate', composition: 'Metoprolol Succinate', strength: '25mg', manufacturer: 'Dr. Reddy\'s', availableQuantity: 240, unit: 'Tablets', batchNumber: 'DR-2026-C2', expiryDate: '2027-12', category: 'Beta Blocker' },
  { id: 'M-004', name: 'Enoxaparin Sodium', composition: 'Low Molecular Weight Heparin', strength: '40mg/0.4mL', manufacturer: 'Sanofi India', availableQuantity: 80, unit: 'Pre-filled Syringes', batchNumber: 'SI-2026-D1', expiryDate: '2027-09', category: 'Anticoagulant' },
  { id: 'M-005', name: 'Salbutamol', composition: 'Salbutamol Sulphate', strength: '100mcg/puff', manufacturer: 'GSK India', availableQuantity: 45, unit: 'Inhalers', batchNumber: 'GK-2026-E3', expiryDate: '2027-06', category: 'Bronchodilator' },
  { id: 'M-006', name: 'Insulin Glargine', composition: 'Insulin Glargine (Recombinant)', strength: '100 IU/mL', manufacturer: 'Novo Nordisk India', availableQuantity: 28, unit: 'Vials (10mL)', batchNumber: 'NN-2026-F2', expiryDate: '2027-04', category: 'Insulin' },
  { id: 'M-007', name: 'Furosemide', composition: 'Furosemide', strength: '40mg', manufacturer: 'Lupin Ltd', availableQuantity: 18, unit: 'Tablets', batchNumber: 'LP-2026-G1', expiryDate: '2027-11', category: 'Diuretic' },
  { id: 'M-008', name: 'Amoxicillin + Clavulanate', composition: 'Amoxicillin Trihydrate + Clavulanic Acid', strength: '500mg + 125mg', manufacturer: 'Alkem Labs', availableQuantity: 120, unit: 'Capsules', batchNumber: 'AL-2026-H3', expiryDate: '2027-08', category: 'Antibiotic' },
];

// ── Available Lab Tests ───────────────────────────────────────────────────────
export const MOCK_LAB_TESTS: AvailableTest[] = [
  { id: 'T-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', sampleType: 'Venous Blood (EDTA)', availability: 'Available', estimatedTurnaround: '2–4 hours' },
  { id: 'T-002', name: 'Troponin I (High Sensitivity)', category: 'Biochemistry', sampleType: 'Venous Blood (Serum)', availability: 'Available', estimatedTurnaround: '1–2 hours' },
  { id: 'T-003', name: 'PT/INR', category: 'Coagulation', sampleType: 'Venous Blood (Citrate)', availability: 'Available', estimatedTurnaround: '1–2 hours' },
  { id: 'T-004', name: 'Arterial Blood Gas (ABG)', category: 'Blood Gas', sampleType: 'Arterial Blood (Heparinised)', availability: 'Available', estimatedTurnaround: '30 min' },
  { id: 'T-005', name: 'Liver Function Test (LFT)', category: 'Biochemistry', sampleType: 'Venous Blood (Serum)', availability: 'Available', estimatedTurnaround: '4–6 hours' },
  { id: 'T-006', name: 'Renal Function Test (RFT)', category: 'Biochemistry', sampleType: 'Venous Blood (Serum)', availability: 'Available', estimatedTurnaround: '4–6 hours' },
  { id: 'T-007', name: 'Urine Routine (Urinalysis)', category: 'Urine', sampleType: 'Mid-stream Urine', availability: 'Available', estimatedTurnaround: '1–2 hours' },
  { id: 'T-008', name: 'Blood Culture', category: 'Microbiology', sampleType: 'Venous Blood (Aerobic + Anaerobic)', availability: 'Limited', estimatedTurnaround: '24–72 hours' },
  { id: 'T-009', name: 'BNP (Brain Natriuretic Peptide)', category: 'Biochemistry', sampleType: 'Venous Blood (EDTA)', availability: 'Available', estimatedTurnaround: '2–3 hours' },
  { id: 'T-010', name: 'HbA1c', category: 'Biochemistry', sampleType: 'Venous Blood (EDTA)', availability: 'Available', estimatedTurnaround: '4–6 hours' },
];

// ── Lab Equipment ─────────────────────────────────────────────────────────────
export const MOCK_EQUIPMENT: LabEquipmentItem[] = [
  { id: 'EQ-001', name: 'Sysmex XN-1000', type: 'Haematology Analyser', status: 'In Use', supportedTests: ['CBC', 'Differential Count'], lastMaintenance: '2026-08-01' },
  { id: 'EQ-002', name: 'Cobas e 411', type: 'Immunoassay Analyser', status: 'Available', supportedTests: ['Troponin I', 'BNP', 'HbA1c', 'TSH'], lastMaintenance: '2026-07-15' },
  { id: 'EQ-003', name: 'Stago STA-R Max', type: 'Coagulation Analyser', status: 'Available', supportedTests: ['PT/INR', 'aPTT', 'Fibrinogen'], lastMaintenance: '2026-08-10' },
  { id: 'EQ-004', name: 'GEM Premier 3500', type: 'Blood Gas Analyser', status: 'In Use', supportedTests: ['ABG', 'Electrolytes', 'Glucose'], lastMaintenance: '2026-08-20' },
  { id: 'EQ-005', name: 'VITROS 5600', type: 'Chemistry Analyser', status: 'Maintenance', supportedTests: ['LFT', 'RFT', 'Lipid Profile', 'CK-MB'], lastMaintenance: '2026-08-28' },
  { id: 'EQ-006', name: 'BD BACTEC FX', type: 'Blood Culture System', status: 'Available', supportedTests: ['Blood Culture', 'Sensitivity'], lastMaintenance: '2026-07-30' },
];

// ── Doctor Staff ──────────────────────────────────────────────────────────────
export const MOCK_DOCTORS: DoctorStaff[] = [
  { id: 'D-001', name: 'Dr. Arun Kumar', specialization: 'Cardiology', level: 'Senior Resident', availability: 'Assigned', currentPatientCount: 3, department: 'Cardiology' },
  { id: 'D-002', name: 'Dr. Meena Shah', specialization: 'General Medicine', level: 'Senior Resident', availability: 'Assigned', currentPatientCount: 2, department: 'General Medicine' },
  { id: 'D-003', name: 'Dr. Rajan Pillai', specialization: 'Neurology', level: 'Consultant', availability: 'Available', currentPatientCount: 0, department: 'Neurology' },
  { id: 'D-004', name: 'Dr. Kavitha Iyer', specialization: 'Pulmonology', level: 'Junior Resident', availability: 'Available', currentPatientCount: 1, department: 'Pulmonology' },
  { id: 'D-005', name: 'Dr. Sathish Kumar', specialization: 'Orthopedics', level: 'Intern', availability: 'Assigned', currentPatientCount: 2, department: 'Orthopedics' },
  { id: 'D-006', name: 'Dr. Anjali Rao', specialization: 'Emergency Medicine', level: 'Junior Resident', availability: 'Unavailable', currentPatientCount: 4, department: 'Emergency' },
];

// ── Patient Assignments ───────────────────────────────────────────────────────
export const MOCK_ASSIGNMENTS: PatientAssignment[] = [
  { patientId: 'P-1001', patientName: 'Rajesh Mehta', priority: 'CRITICAL', requiredSpecialty: 'Cardiology', assignedDoctor: 'Dr. Arun Kumar', aiRecommendedDoctor: 'Dr. Arun Kumar' },
  { patientId: 'P-1002', patientName: 'Priya Nair', priority: 'HIGH', requiredSpecialty: 'Neurology', assignedDoctor: 'Dr. Arun Kumar', aiRecommendedDoctor: 'Dr. Rajan Pillai' },
  { patientId: 'P-1003', patientName: 'Suresh Babu', priority: 'HIGH', requiredSpecialty: 'General Medicine', assignedDoctor: 'Dr. Meena Shah', aiRecommendedDoctor: 'Dr. Meena Shah' },
  { patientId: 'P-1004', patientName: 'Anita Sharma', priority: 'MEDIUM', requiredSpecialty: 'Pulmonology', assignedDoctor: 'Dr. Arun Kumar', aiRecommendedDoctor: 'Dr. Kavitha Iyer' },
  { patientId: 'P-1005', patientName: 'Vikram Reddy', priority: 'LOW', requiredSpecialty: 'Orthopedics', assignedDoctor: 'Dr. Meena Shah', aiRecommendedDoctor: 'Dr. Sathish Kumar' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getPatientPrescriptions(patientId: string) {
  return MOCK_PRESCRIPTIONS.filter(p => p.patientId === patientId);
}
export function getPatientVitals(patientId: string) {
  return MOCK_VITALS.filter(v => v.patientId === patientId);
}
export function getPatientLabReports(patientId: string) {
  return MOCK_LAB_REPORTS.filter(l => l.patientId === patientId);
}
export function getPatientAllergies(patientId: string) {
  return MOCK_ALLERGIES.filter(a => a.patientId === patientId);
}
export function getPatientEmergencies(patientId: string) {
  return MOCK_EMERGENCIES.filter(e => e.patientId === patientId);
}
export function getPatientFollowUp(patientId: string) {
  return MOCK_FOLLOWUPS.find(f => f.patientId === patientId) ?? null;
}
export function getPatientBloodSamples(patientId: string) {
  return MOCK_BLOOD_SAMPLES.filter(b => b.patientId === patientId);
}
