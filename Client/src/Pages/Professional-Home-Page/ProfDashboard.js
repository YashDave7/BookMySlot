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
          <li>Notifications</li>
          <li>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfDasboard;
