import Navbar from './Components/Navbar/Navbar';
import UserLoginSignin from './Pages/User-Login-Signup/UserLoginSignin';
import LandingPage from './Pages/Landing-Page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastNotifications from './Components/ToastNotifications';
import ProfessionalLogin from './Pages/Professional-Login-Registration/ProfessionalLogin';
import UserHomePage from './Pages/User-Home-Page/UserHomePage';
import ProfessionalHomePage from './Pages/Professional-Home-Page/ProfessionalHomePage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastNotifications />
        <Routes>
          <Route exact path='/' element={ <LandingPage /> } />
          <Route exact path='/user/login' element={ <UserLoginSignin /> } />
          <Route exact path='/user/signup' element={ <UserLoginSignin /> } />
          <Route exact path='/user/home' element={ <UserHomePage /> } />
          <Route exact path='/professional/register' element={ <ProfessionalLogin /> } />
          <Route exact path='/professional/home' element={ <ProfessionalHomePage /> } />
        </Routes>
      </Router>

    </>
  );
}

export default App;
