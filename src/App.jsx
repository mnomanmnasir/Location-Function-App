import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import VerificationCode from './pages/VerificationCode';
import SelectAccountType from './pages/SelectAccountType';
import CompleteProfile from './pages/CompleteProfile';
import BusinessRegistration from './pages/BusinessRegistration';
import BusinessEmployees from './pages/BusinessEmployees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification-code" element={<VerificationCode />} />
        <Route path="/select-account-type" element={<SelectAccountType />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/business-registration" element={<BusinessRegistration />} />
        <Route path="/business-employees" element={<BusinessEmployees />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;