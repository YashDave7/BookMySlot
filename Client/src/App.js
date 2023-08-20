import Navbar from './Components/Navbar/Navbar';
import UserLoginSignin from './Pages/User-Login-Signup/UserLoginSignin';
import LandingPage from './Pages/Landing-Page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastNotifications from './Components/ToastNotifications';

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
        </Routes>
      </Router>

    </>
  );
}

export default App;
