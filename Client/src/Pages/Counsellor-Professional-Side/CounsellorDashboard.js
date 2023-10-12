// import styled from 'styled-components'
import React, { useContext } from 'react';
import './styles/CounsellorDashboard.css'

import SideMenu from './SideMenu';
import WelcomeMessage from './WelcomeMessage1';
import Lawyer from './Counsellor';
import MyCalendar from './MyCalendar';

const DoctorDashboard = (props) =>{
  return(
    <div className='main'>
       <SideMenu/>
  
       <WelcomeMessage/>
       
       <MyCalendar />

    </div>
      
      

  );
}




export default DoctorDashboard