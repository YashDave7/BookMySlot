
import React from 'react';
import './style/WelcomeMessage1.css'
import doctor from './img/doctor.png'

function WelcomeMessage() {
  return (
    <div className='cont'>
      <div className="message">
        <img src={doctor} />
        <h1>Welcome Back, Doctor !</h1>
      </div>
    </div>

  );
}

export default WelcomeMessage;
