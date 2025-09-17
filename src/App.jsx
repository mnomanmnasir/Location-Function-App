import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import VerificationCode from './pages/VerificationCode';
import SelectAccountType from './pages/SelectAccountType';
import CompleteProfile from './pages/CompleteProfile';
import BusinessRegistration from './pages/BusinessRegistration';
import BusinessEmployees from './pages/BusinessEmployees';
import ResetPassword from './pages/resetPassword';
import ResetVerifyCode from './pages/resetVerifyCode';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/select-account-type" element={<SelectAccountType />} />
          
          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard" ele  ment={<Dashboard />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/business-registration" element={<BusinessRegistration />} />
            <Route path="/business-employees" element={<BusinessEmployees />} />
          {/* </Route> */}
          
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-verify-code" element={<ResetVerifyCode />} />
          
          {/* 404 - Not Found */}
          <Route path="*" element={
            <div style={{ padding: '20px' }}>
              <h2>404: Page Not Found</h2>
              <p>The page you are looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;