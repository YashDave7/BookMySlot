// src/WelcomeMessage.js

import React from 'react';
import './styles/WelcomeMessage.css'
import lawyer from './img/lawyer.png'

function WelcomeMessage() {
  return (
    <div className='cont'>
      <div className="messages">
      <img src={lawyer} />
      <h1>Welcome Back, Lawyer !</h1>
    </div>
    </div>
    
  );
}

export default WelcomeMessage;
