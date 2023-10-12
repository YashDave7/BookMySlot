import Navbar from './Components/Navbar/Navbar';
import UserLoginSignin from './Pages/User-Login-Signup/UserLoginSignin';
import LandingPage from './Pages/Landing-Page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastNotifications from './Components/ToastNotifications';
import ProfessionalLogin from './Pages/Professional-Login-Registration/ProfessionalLogin';
import UserHomePage from './Pages/User-Home-Page/UserHomePage';
import ProfessionalHomePage from './Pages/Professional-Home-Page/ProfessionalHomePage';
import DoctorDashboard from './Pages/Doctor-Professional-Side/DoctorDashboard';
import LawyerDashboard from './Pages/Lawyer-Professional-side/LawyerDashboard';
import CounsellorDashboard from './Pages/Counsellor-Professional-Side/CounsellorDashboard';
import '../src/App.css'
import React, { useContext } from 'react';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastNotifications />
        <Routes>
        <Route path="/doctordashboard" element={<DoctorDashboard/>} />
          <Route path="/lawyerdashboard" element={<LawyerDashboard/>} />
          <Route path="/counsellordashboard" element={<CounsellorDashboard/>} />
          <Route exact path='/user/login' element={ <UserLoginSignin /> } />
          <Route exact path='/user/signup' element={ <UserLoginSignin /> } />
          <Route exact path='/user/home' element={ <UserHomePage /> } />
          <Route exact path='/professional/register' element={ <ProfessionalLogin /> } />
          <Route exact path='/professional/home' element={<DoctorDashboard/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
