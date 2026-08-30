import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Existing Super Admin pages
import { Dashboard } from './pages/Dashboard';
import { ModelLab } from './pages/ModelLab';
import { Experiments } from './pages/Experiments';
import { ModelMonitoring } from './pages/ModelMonitoring';
import { Simulation } from './pages/Simulation';
import { PatientProfile } from './pages/PatientProfile';
import { PatientList } from './pages/PatientList';
import { Monitoring } from './pages/Monitoring';
import { AIExplainability } from './pages/AIExplainability';
import { AlertCenter } from './pages/AlertCenter';
import { Handover } from './pages/Handover';
import { Settings } from './pages/Settings';
import { PatientTimeline } from './pages/PatientTimeline';
import { ResearchAnalytics } from './pages/ResearchAnalytics';
import { Login } from './pages/Login';
import { StartupVideo } from './components/StartupVideo';
import { LoadingProvider } from './context/LoadingContext';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Doctor workspace
import { DoctorPatients } from './pages/doctor/DoctorPatients';
import { DoctorPatientProfile } from './pages/doctor/DoctorPatientProfile';
import { DoctorPrescriptions } from './pages/doctor/DoctorPrescriptions';
import { DoctorVitalReports } from './pages/doctor/DoctorVitalReports';
import { DoctorLabReports } from './pages/doctor/DoctorLabReports';
import { DoctorFollowUp } from './pages/doctor/DoctorFollowUp';
import { DoctorAIAssistant } from './pages/doctor/DoctorAIAssistant';

// Nurse workspace
import { NursePatients } from './pages/nurse/NursePatients';
import { NursePatientProfile } from './pages/nurse/NursePatientProfile';
import { NurseRecordVitals } from './pages/nurse/NurseRecordVitals';
import { NurseBloodSamples } from './pages/nurse/NurseBloodSamples';
import { NursePrescriptions } from './pages/nurse/NursePrescriptions';
import { NurseAllergiesEmergencies } from './pages/nurse/NurseAllergiesEmergencies';

// Department workspace
import { DeptDashboard } from './pages/department/DeptDashboard';
import { DeptPatients } from './pages/department/DeptPatients';
import { DeptDoctorAvailability } from './pages/department/DeptDoctorAvailability';
import { DeptAssignments } from './pages/department/DeptAssignments';
import { DeptStaffOverview } from './pages/department/DeptStaffOverview';

// Pharmacy workspace
import { PharmDashboard } from './pages/pharmacy/PharmDashboard';
import { PharmMedicineList } from './pages/pharmacy/PharmMedicineList';
import { PharmManufacturers } from './pages/pharmacy/PharmManufacturers';
import { PharmPatientContext } from './pages/pharmacy/PharmPatientContext';

// Laboratory workspace
import { LabDashboard } from './pages/laboratory/LabDashboard';
import { LabAvailableTests } from './pages/laboratory/LabAvailableTests';
import { LabEquipment } from './pages/laboratory/LabEquipment';
import { LabPatientReports } from './pages/laboratory/LabPatientReports';
import { LabReportHistory } from './pages/laboratory/LabReportHistory';

// Role → default home page mapping
const ROLE_HOME: Record<string, string> = {
  'super-admin': '/dashboard',
  'doctor': '/doctor/patients',
  'nurse': '/nurse/patients',
  'department': '/department/dashboard',
  'pharmacy': '/pharmacy/dashboard',
  'laboratory': '/lab/dashboard',
};

function App() {
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('doctor');
  const [userName, setUserName] = useState('Clinical User');

  const handleLogin = (role: string, username: string) => {
    setUserRole(role);
    setUserName(username || 'Clinical User');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasSeenVideo(true);
  };

  const roleHome = ROLE_HOME[userRole] ?? '/dashboard';

  if (!hasSeenVideo && !isAuthenticated) {
    return <StartupVideo onComplete={() => setHasSeenVideo(true)} />;
  }

  return (
    <LoadingProvider>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to={roleHome} replace /> : <Login onLogin={handleLogin} />
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            isAuthenticated
              ? <Layout userRole={userRole} userName={userName} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }>
            {/* Default redirect to role home */}
            <Route index element={<Navigate to={roleHome} replace />} />

            {/* ─── Super Admin ─── */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="model-lab" element={<ModelLab />} />
            <Route path="experiments" element={<Experiments />} />
            <Route path="model-monitoring" element={<ModelMonitoring />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="ai-explain" element={<AIExplainability />} />
            <Route path="alerts" element={<AlertCenter />} />
            <Route path="handover" element={<Handover />} />
            <Route path="timeline" element={<PatientTimeline />} />
            <Route path="research" element={<ResearchAnalytics />} />
            <Route path="settings" element={<Settings />} />

            {/* ─── Doctor workspace ─── */}
            <Route path="doctor/patients" element={<DoctorPatients />} />
            <Route path="doctor/patients/:id" element={<DoctorPatientProfile />} />
            <Route path="doctor/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="doctor/vitals" element={<DoctorVitalReports />} />
            <Route path="doctor/lab-reports" element={<DoctorLabReports />} />
            <Route path="doctor/followup" element={<DoctorFollowUp />} />
            <Route path="doctor/ai-assistant" element={<DoctorAIAssistant />} />

            {/* ─── Nurse workspace ─── */}
            <Route path="nurse/patients" element={<NursePatients />} />
            <Route path="nurse/patients/:id" element={<NursePatientProfile />} />
            <Route path="nurse/vitals" element={<NurseRecordVitals />} />
            <Route path="nurse/blood-samples" element={<NurseBloodSamples />} />
            <Route path="nurse/prescriptions" element={<NursePrescriptions />} />
            <Route path="nurse/allergies" element={<NurseAllergiesEmergencies />} />
            <Route path="nurse/emergencies" element={<NurseAllergiesEmergencies />} />

            {/* ─── Department workspace ─── */}
            <Route path="department/dashboard" element={<DeptDashboard />} />
            <Route path="department/patients" element={<DeptPatients />} />
            <Route path="department/doctors" element={<DeptDoctorAvailability />} />
            <Route path="department/assignments" element={<DeptAssignments />} />
            <Route path="department/staff" element={<DeptStaffOverview />} />

            {/* ─── Pharmacy workspace ─── */}
            <Route path="pharmacy/dashboard" element={<PharmDashboard />} />
            <Route path="pharmacy/medicines" element={<PharmMedicineList />} />
            <Route path="pharmacy/manufacturers" element={<PharmManufacturers />} />
            <Route path="pharmacy/patient-context" element={<PharmPatientContext />} />
            <Route path="pharmacy/allergy-alerts" element={<PharmPatientContext />} />

            {/* ─── Laboratory workspace ─── */}
            <Route path="lab/dashboard" element={<LabDashboard />} />
            <Route path="lab/tests" element={<LabAvailableTests />} />
            <Route path="lab/equipment" element={<LabEquipment />} />
            <Route path="lab/reports" element={<LabPatientReports />} />
            <Route path="lab/history" element={<LabReportHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
