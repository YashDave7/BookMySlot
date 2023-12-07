import React from "react";
import './style/ProfessionalSidebar.css';
import { Link } from 'react-router-dom';

const ProfessionalSidebar = () => {
  return (
    <div>
      <nav className="SideMenu">
        <ul style={{textDecoration: 'none', backgroundColor: ' #B9E1DC'}}>
          <li>
            <Link className="nav-link" to="/professional/home" style={{textDecoration: 'none', color:'black'}}>Appointments</Link>
          </li>
          <li>
            <Link className="nav-link" to="/professional/finance" style={{textDecoration: 'none', color:'black'}}>Finance</Link>
          </li>
          {/* <li>
            <Link className="nav-link" to="/professional/home" style={{textDecoration: 'none', color:'black'}}>Notifications</Link>
          </li> */}
          <li>
            <Link className="nav-link" to="/professional/home" style={{textDecoration: 'none', color:'black'}}>LogOut</Link>
          </li>
          
          
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          
          
        </ul>
      </nav>
    </div>
  );
};

export default ProfessionalSidebar;
