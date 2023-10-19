import Navbar from './Components/Navbar/Navbar';
import UserLoginSignin from './Pages/User-Login-Signup/UserLoginSignin';
import LandingPage from './Pages/Landing-Page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastNotifications from './Components/ToastNotifications';
import ProfessionalLogin from './Pages/Professional-Login-Registration/ProfessionalLogin';
import UserHomePage from './Pages/User-Home-Page/UserHomePage';
import ProfessionalHomePage from './Pages/Professional-Home-Page/ProfessionalHomePage';
import '../src/App.css'
import React, { useState } from 'react';
import Professional from './Pages/Professional-Page-templete/Professional';
import UserAppointments from './Pages/User-Appointments-Page/UserAppointments';
import NotificationPage from './Pages/Notifications-User/NotificationPage';
import Footer from './Components/Footer/Footer';
import Finance from './Pages/Professional-Finance-Page/Finance';
import Admin from './Pages/Admin/Admin';
import ProfessionalNotificationPage from './Pages/Notifications-Professional/ProfessionalNotificationPage';
function App() {

  const [profId, setProfId] = useState('');

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <ToastNotifications />
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route exact path='/user/login' element={<UserLoginSignin />} />
          <Route exact path='/user/home' element={<UserHomePage setProfId={setProfId} />} />
          <Route exact path='/user/appointments' element={<UserAppointments />} />
          <Route exact path='/user/professional/:id' element={<Professional profId={profId} />} />
          <Route exact path='/user/notifications' element={<NotificationPage />} />

          {/* PROFESSIONAL ROUTES */}
          <Route exact path='/professional/register' element={<ProfessionalLogin />} />
          <Route exact path='/professional/home' element={<ProfessionalHomePage />} />
          <Route exact path='/professional/finance' element={<Finance />} />
          <Route exact path='/professional/notifications' element={<ProfessionalNotificationPage />} />

          {/* ADMIN ROUTES */}
          <Route exact path='/admin' element={<Admin />} />
        </Routes>

        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
