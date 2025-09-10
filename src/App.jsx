import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import VerificationCode from './pages/VerificationCode';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification-code" element={<VerificationCode />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;