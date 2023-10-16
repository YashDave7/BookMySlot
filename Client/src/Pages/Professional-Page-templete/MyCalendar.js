import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange = (date) => {
    this.setState({ date });
  };

  render() {
    return (

      <div className="Calendar">
        <h1>My Calendar</h1>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>


    );
  }
}

export default MyCalendar;
