import React, { useState, useEffect } from "react";
import MyCalendar from "../Professional-Home-Page/MyCalendar";
// import { Link, useNavigate } from 'react-router-dom';
// import { isHtmlElement } from 'react-router-dom/dist/dom';

const Professional = (props) => {
  // let navigate = useNavigate();
  const [professional, setProfessional] = useState([]);
  const [loading, setLoading] = useState(true);
  const profID = props.profId;

  const particularProfessional = async () => {
    try {
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
      console.log(json);
      setProfessional(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const bookAppointment = async () => {
    // API call.
    const response = await fetch(
      `http://localhost:5000/api/booking/bookappointment/${props.profId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setProfessional(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      particularProfessional();
      //eslint-disable-next-line
    } else {
      navigate("/user/login");
    }
  }, [props.profId]);

  //time slot
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // Define your time slots as an array
  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    // Add more time slots here...
  ];

  const handleTimeSlotClick = (timeSlot) => {
    // Check if the time slot is already selected
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(
        selectedTimeSlots.filter((slot) => slot !== timeSlot)
      );
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
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
            <MyCalendar />
          </div>

          {/* <!-- Force next columns to break to new line at md breakpoint and up --> */}
          <div className="w-100 d-none d-md-block"></div>

          <div className="col-8" style={{ border: "2px solid red" }}>
            .col-6 .col-sm-4
          </div>
          <div className="col-4" style={{ border: "2px solid red" }}>
            <h3>Available Slots</h3>
            <div className="container">
              {timeSlots.map((timeSlot, index) => (
                <div key={index} className="col-md-4">
                  <button
                    style={{
                      backgroundColor: selectedTimeSlots.includes(timeSlot)
                        ? "#9AA4EC"
                        : "transparent",
                      color: selectedTimeSlots.includes(timeSlot)
                        ? "white"
                        : "black",
                    }}
                    className="btn time-slot my-2"
                    onClick={() => handleTimeSlotClick(timeSlot)}
                  >
                    {timeSlot}
                  </button>
                </div>
              ))}
                <button className="btn btn-success">Book My Slot</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Professional;
