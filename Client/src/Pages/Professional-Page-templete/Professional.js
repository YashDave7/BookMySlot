import React, { useState, useEffect } from "react";
// import MyCalendar from './MyCalendar';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';

const Professional = (props) => {
  // let navigate = useNavigate();
  const [professional, setProfessional] = useState({});
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);

  // const profID = props.profId;

  // API CALL TO FETCH DATA OF THE SELECTED PROFESSIONAL.
  const particularProfessional = async () => {
    try {
      // Extract profID from the URL
      const url = new URL(window.location.href);
      const profID = url.pathname.split('/').pop();
      if (!profID) {
        // Handle the case where profID is not defined properly
        throw new Error('profID is not defined');
      }
      // console.log(profID);
      // API call.
      const response = await fetch(
        `http://localhost:5000/api/authProfessional/particularProfessional/${profID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setProfessional(json);
      setTimeSlots(json.yearlyTimings);
    } catch (error) {
    }
  };

  const bookAppointment = async () => {
    try {
      // Extract profID from the URL
      const url = new URL(window.location.href);
      const profID = url.pathname.split('/').pop();
      if (!profID) {
        throw new Error('profID is not defined');
      }

      // Make sure selectedTime and date are defined
      if (!selectedTime || !date) {
        throw new Error('selectedTime or date is not defined');
      }

      // API call.
      const response = await fetch(
        `http://localhost:5000/api/booking/bookappointment/${profID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ timing: selectedTime, appointmentDate: date.toUTCString() })
        }
      );
      const json = await response.json();
      console.log(json);
      // setProfessional(json);
    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      particularProfessional();
      //eslint-disable-next-line
    } else {
      navigate("/user/login");
    }
  }, []);



  useEffect(() => {
    // Filter appointments based on selected date
    const filtered = timeSlots.filter(timeslot => new Date(timeslot.day).toDateString() === date.toDateString());
    setFilteredTimeSlots(filtered);
    // console.log(timeSlots, "ehlloo");
    // console.log(filtered);
  }, [date, timeSlots, selectedTime]);

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTime(timeSlot);
    console.log(selectedTime);
    console.log(date);
  };

  const onChange = date => {
    setDate(date);
  };

  return (
    <>
      {/* <div>
        Heoooooollllo
        {professional.name},
        {professional.profession}
      </div>
      <button onClick={bookAppointment}>Book Appointment</button> */}

      <div className="container-fluid no-padding text-center">
        <div className="row">
          <div className="col-8" style={{ border: "2px solid red" }}>
            profile
          </div>
          <div className="col-4" style={{ border: "2px solid red" }}>
            <Calendar
              onChange={onChange}
              value={date}
            />
          </div>

          {/* <!-- Force next columns to break to new line at md breakpoint and up --> */}
          <div className="w-100 d-none d-md-block"></div>

          <div className="col-8" style={{ border: "2px solid red" }}>
            .col-6 .col-sm-4
          </div>
          <div className="col-4" style={{ border: "2px solid red" }}>
            <h3>Available Slots</h3>
            <div className="container">
              {filteredTimeSlots.map((slot, index) => (
                <div key={index} className="col-md-4">
                  {slot.timeslots.map((eachSlot, i) => (
                    <div key={i}>
                      <button
                        style={{
                          // backgroundColor: selectedTimeSlots.includes(timeFrame)
                          //   ? "#9AA4EC"
                          //   : "transparent",
                          // color: selectedTimeSlots.includes(timeFrame)
                          //   ? "white"
                          //   : "black",
                        }}
                        className="btn time-slot my-2"
                        onClick={() => handleTimeSlotClick(eachSlot.timeFrame)}
                      >
                        {eachSlot.timeFrame}
                      </button>
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={bookAppointment} className="btn btn-success">Book Appointment</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Professional;
