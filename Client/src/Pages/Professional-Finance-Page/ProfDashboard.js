import React from "react";
import './style/ProfDashboard.css';
import { Link } from 'react-router-dom';

const ProfDasboard = () => {
  return (
    <div>
      <nav className="SideMenu">
        <ul style={{textDecoration: 'none'}}>
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

export default ProfDasboard;
