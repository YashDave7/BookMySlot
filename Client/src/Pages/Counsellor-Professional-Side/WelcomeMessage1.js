// src/WelcomeMessage.js

import React from 'react';
import './styles/WelcomeMessage.css'
import counsellor from './img/counsellor.png'

function WelcomeMessage() {
  return (
    <div className='cont'>
      <div className="messaging">
      <img src={counsellor} />
      <h1>Welcome Back, Counsellor !</h1>
    </div>
    </div>
    
  );
}

export default WelcomeMessage;
