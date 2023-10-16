

import React from 'react';
import './NotificationCard.css';

const NotificationCard = ({ message, timestamp }) => {
  return (
    <div className="notification-card">
      <div className="message">{message}</div>
      <div className="timestamp">{timestamp}</div>
    </div>
  );
};

export default NotificationCard;
