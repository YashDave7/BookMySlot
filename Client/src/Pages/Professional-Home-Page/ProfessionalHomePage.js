import React from 'react'
import MyCalendar from './MyCalendar';
import { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';

const ProfessionalHomePage = () => {

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [date, setDate] = useState(new Date());

  const fetchAppointments = async () => {
    // API call.'
    const response = await fetch(`http://localhost:5000/api/professionalRoutes/fetchAppointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();

    setAppointments(json);
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      // API call.
      await fetch(`http://localhost:5000/api/booking/professionalcancelappointment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      // const json = response.json();

      // Logic to delete note at frontend.
      // const newNotes = notes.filter((note) => {
      //     return note._id !== id
      // })
      // setNotes(newNotes);
      // toast.success("Note Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAppointments()
      // eslint-disable-next-line
    }
    else {
      navigate('/professional/register');
    }
  }, [])

  useEffect(() => {
    // Filter appointments based on selected date
    const filtered = appointments.filter(appointment => new Date(appointment.date).toDateString() === date.toDateString());
    setFilteredAppointments(filtered);
  }, [date, appointments]);

  const onChange = date => {
    setDate(date);
  };

  return (
    <>
      Professional Home Page
      {/* <MyCalendar /> */}

      <div className="Calendar">
        <h1>Calendar</h1>
        <Calendar
          onChange={onChange}
          value={date}
        />
      </div>

      <div className="all_camps">
        {filteredAppointments.map((item, i) => (
          <div key={i}>
            <div className="card-body">
              {/* <div className='d-flex justify-content-between align-items-center'> */}
              <h5 className="card-title">{item.username}</h5>
              {/* </div> */}
              <div className='d-flex justify-content-between mb-0'>
                <span class="badge text-bg-secondary" style={{ "color": "#F4EEE0" }}>{item.email}</span>
                <div>
                  <i className="fa-solid fa-pen-to-square" style={{ "fontSize": "20px" }}>
                    {item.useremail}</i>
                  <i className="fa-solid fa-trash mx-2" style={{ "fontSize": "20px" }}></i>
                </div>
              </div>
              <p className="my-2 font-weight-light" style={{ "fontWeight": "lighter", "fontStyle": "italic", "fontSize": "14px" }}>{item.profession},
                {item.professionalmobile}
                <br />
                {item.date}
              </p>
              <p>{item.status}</p>
              <button onClick={() => cancelAppointment(item._id)}>Cancel Appointment</button>
            </div>

          </div>
        ))}
      </div>

    </>
  )
}

export default ProfessionalHomePage