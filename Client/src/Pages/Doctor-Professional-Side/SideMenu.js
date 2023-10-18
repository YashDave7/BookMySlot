
import React from 'react';
import './style/SideMenu.css'

function SideMenu() {
  return (
    <div className='side'>
        <nav className="SideMenu">
      
      <ul>
      <Link className="nav-link" to="/professional/home">Appointments</Link>
      <Link className="nav-link" to="/professional/finance">Finance</Link>
        {/* <li>Patients</li> */}
      
      </ul>
    </nav>
    </div>
    
  );
}

export default SideMenu;
