// ─────────────────────────────────────────────────────────────────────────────
// clinical.ts — Extended types for all role-specific workspaces
// ─────────────────────────────────────────────────────────────────────────────

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

// ── Prescription ──────────────────────────────────────────────────────────────
export interface Prescription {
  id: string;
  patientId: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribingDoctor: string;
  prescriptionDate: string;
  nextReviewDate: string;
  status: 'Active' | 'Completed' | 'Discontinued';
}

export interface PrescriptionAdministration {
  prescriptionId: string;
  medicine: string;
  scheduledTime: string;
  status: 'Scheduled' | 'Administered' | 'Pending' | 'Missed';
  updatedBy: string;
  updatedAt: string;
}

// ── Vitals ────────────────────────────────────────────────────────────────────
export interface VitalRecord {
  id: string;
  patientId: string;
  timestamp: string;
  spo2: number;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  bloodSugar: number;
  recordedBy: string;
}

// ── Lab Reports ───────────────────────────────────────────────────────────────
export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  result: string;
  unit: string;
  referenceRange: string;
  date: string;
  previousResult?: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  status: 'Completed' | 'Pending' | 'Processing';
  reportedBy: string;
}

export interface BloodSampleRecord {
  id: string;
  patientId: string;
  testName: string;
  sampleType: string;
  collectionDateTime: string;
  collectedBy: string;
  status: 'Requested' | 'Collected' | 'Sent to Lab' | 'Completed';
}

// ── Allergy ───────────────────────────────────────────────────────────────────
export interface AllergyRecord {
  id: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
  dateRecorded: string;
  source: string;
}

// ── Emergency History ─────────────────────────────────────────────────────────
export interface EmergencyRecord {
  id: string;
  patientId: string;
  date: string;
  eventType: string;
  notes: string;
  department: string;
  outcome: string;
}

// ── Follow-up / Deadlines ─────────────────────────────────────────────────────
export interface FollowUp {
  patientId: string;
  nextCheckupDate: string;
  nextCheckupNote: string;
  nextLabTestDate: string;
  requiredTest: string;
  labTestStatus: 'Pending' | 'Scheduled' | 'Completed';
}

// ── Medicine / Pharmacy ───────────────────────────────────────────────────────
export interface Medicine {
  id: string;
  name: string;
  composition: string;
  strength: string;
  manufacturer: string;
  availableQuantity: number;
  unit: string;
  batchNumber: string;
  expiryDate: string;
  category: string;
}

// ── Laboratory ────────────────────────────────────────────────────────────────
export interface AvailableTest {
  id: string;
  name: string;
  category: string;
  sampleType: string;
  availability: 'Available' | 'Limited' | 'Unavailable';
  estimatedTurnaround: string;
}

export interface LabEquipmentItem {
  id: string;
  name: string;
  type: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Offline';
  supportedTests: string[];
  lastMaintenance: string;
}

// ── Department / Staff ────────────────────────────────────────────────────────
export interface DoctorStaff {
  id: string;
  name: string;
  specialization: string;
  level: 'Intern' | 'Junior Resident' | 'Senior Resident' | 'Consultant';
  availability: 'Available' | 'Assigned' | 'Unavailable';
  currentPatientCount: number;
  department: string;
}

export interface PatientAssignment {
  patientId: string;
  patientName: string;
  priority: PriorityLevel;
  requiredSpecialty: string;
  assignedDoctor: string | null;
  aiRecommendedDoctor?: string;
}

// ── Enriched Patient (extends base) ──────────────────────────────────────────
export interface ClinicalPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  admissionDate: string;
  room: string;
  department: string;
  assignedDoctor: string;
  primaryDiagnosis: string;
  priority: PriorityLevel;
  aiPriorityScore: number;        // 0–1 from ML model
  codeStatus: 'Full Code' | 'DNR' | 'DNI';
  nextCheckup: string;
  nextBloodReport: string;
  latestVitalStatus: string;
  latestLabStatus: string;
  lastUpdateTime: string;
}
