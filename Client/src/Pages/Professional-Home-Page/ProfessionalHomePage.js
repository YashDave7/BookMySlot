import React from 'react'
import MyCalendar from './MyCalendar';
import { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';
import ProfDashboard from './ProfDashboard';
// import TodaysAppointmets from './TodaysAppointmets';
import user_img from "../../Pages/User-Home-Page/images/reshma.png";

const ProfessionalHomePage = () => {

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState('');
  const [date, setDate] = useState(new Date());

  // API CALL TO FETCH ALL THE APPOINTMENTS.
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

  // API CALL TO CANCEL A APPOINTMENT BY PROFESSIONAL.
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

  // API CALL TO GET LOGGED IN PROFESSIONAL'S DETAILS.
  const getProfessionalDetails = async () => {
    try {
      // API call.
      const response = await fetch(`http://localhost:5000/api/authProfessional/getprofessional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setProfessionalDetails(json);
      console.log(professionalDetails);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAppointments()
      getProfessionalDetails();
      // eslint-disable-next-line
    }
    else {
      navigate('/professional/register');
    }
  }, [])

  useEffect(() => {
    // Filter appointments based on selected date
    const filtered = appointments.filter(appointment => new Date(appointment.appointmentDate).toDateString() === date.toDateString());
    setFilteredAppointments(filtered);
    console.log(date.toDateString());
    console.log(appointments);
    console.log(filtered);
  }, [date, appointments]);

  const onChange = date => {
    setDate(date);
  };

  return (
    <>
      <div className='container-fluid no-padding'>
        <div className='row'>
          <div className='side_bar col-2' >
            <ProfDashboard />
          </div>
          <div className='col-10'>
            <div className="container-fluid no-padding">
              <div className="row">
                <div className="col-12" style={{ border: "2px solid red", height: '15vh' }}>
                  <div className="message">
                    {/* <img src={doctor} /> */}
                    <h1>Hello, {professionalDetails.name}</h1> 
                    <p>You have {filteredAppointments.length} appointments today.</p>
                  </div>
                </div>
                <div className="col-8" style={{ border: "2px solid red" }}>
                  {/* <TodaysAppointmets/> */}
                  <div>
                    <h2 className="py-3"> {date.toDateString()} Appointments</h2>
                    <div>
                      {filteredAppointments.map((item, i) => (
                        <div
                          className="card mb-3 mt-3"
                          style={{ width: "100%", boxShadow: "0 0 10px grey" }}
                        >
                          <div className="row g-0">
                            <div className="col-md-2">
                              <img src={user_img} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 700 }}>
                                  {item.username}
                                </h5>
                                <p className="card-text">
                                  <span
                                    className="px-2 py-2 text-white mr-3"
                                    style={{ backgroundColor: "#F4A4A4", borderRadius: "7px" }}
                                  >
                                    {item.timing}
                                  </span>


                                </p>
                                {/* <p className="card-text">Student</p> */}
                                <p className="card-text text-secondary">
                                  <button
                                    className="btn text-white py-2"
                                    style={{
                                      backgroundColor: "#D83A22",
                                      fontWeight: 700,
                                      border: "1px solid black",
                                      marginRight: "10px"
                                    }}
                                  >
                                    {item.bookingStatus}
                                  </button>
                                  <button
                                    className="btn text-white py-2"
                                    style={{
                                      backgroundColor: "#D83A22",
                                      fontWeight: 700,
                                      border: "1px solid black",
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-2 m-auto">
                              <button
                                className="btn text-white py-2"
                                style={{
                                  backgroundColor: "#D83A22",
                                  fontWeight: 700,
                                  border: "1px solid black",
                                }}
                              >
                                {item.paymentStatus}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-4" style={{ border: "2px solid red" }}>
                  <div className="Calendar">
                    <h1>Calendar</h1>
                    <Calendar
                      onChange={onChange}
                      value={date}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="all_camps">
        {filteredAppointments.map((item, i) => (
          <div key={i}>
            <div className="card-body">
              {/* <div className='d-flex justify-content-between align-items-center'> 
              <h5 className="card-title">{item.username}</h5>
              {/* </div> 
              <div className='d-flex justify-content-between mb-0'>
                <span className="badge text-bg-secondary" style={{ "color": "#F4EEE0" }}>{item.email}</span>
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
      </div> */}

    </>
  )
}

export default ProfessionalHomePage