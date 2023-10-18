import React from "react";
import './style/ProfDashboard.css';
import { Link } from 'react-router-dom';

const ProfDasboard = () => {
  return (
    <div>
      <nav className="SideMenu">
        <ul>
          <li>
            <Link className="nav-link" to="/professional/home">Appointments</Link>
          </li>
          <li>
            <Link className="nav-link" to="/professional/finance">Finance</Link>
          </li>
          <li>
            <Link className="nav-link" to="/professional/home">Notifications</Link>
          </li>
          <li>
            <Link className="nav-link" to="/professional/home">LogOut</Link>
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
