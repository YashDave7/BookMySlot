import React, { useState, useEffect } from "react";
// import MyCalendar from './MyCalendar';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';
import user_img from '../../Pages/User-Home-Page/images/reshma.png';
import axios from 'axios';

const Professional = (props) => {
  // let navigate = useNavigate();
  const [professional, setProfessional] = useState({});
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [cost, setCost] = useState(199);

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
      setCost(json.fees)
    } catch (error) {
    }
  };

  // API TO HANDLE PAYMENT.
  const handlePayment = async () => {
    try {

      if (!localStorage.getItem("token")) {
        alert("You have not logged in.");
        return navigate("/");
      }
      // console.log("Hanlde")
      const orderUrl = "http://localhost:5000/api/pay/orders";
      const { data } = await axios.post(
        orderUrl,
        { amount: cost },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
          },
        }
      );
      console.log("2nd")
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    console.log("In init")
    const options = {
      key: "rzp_test_zkRk5Km3mrtYWp",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/payment/verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
            },
          });
          console.log(data);
          if (data.status) {
            alert("Purchased PrepPro Succesfully");
            //Update in DB
            //fetch user id
            // userDetails(); 

            // navigate("") --> to a page to show order and pay id 
            navigate("/user/appointments")
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log(options)
    const rzp1 = new window.Razorpay(options);


    rzp1.open();
    bookAppointment();
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
          body: JSON.stringify({ timing: selectedTime, appointmentDate: date.toUTCString(), bookingStatus: 'Future Appointment', paymentStatus: 'Paid' })
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

      <div className="container-fluid no-padding">
        <div className="row">
          <div className="col-8" style={{ border: "2px solid red" }}>
            <h3>Profession Profile</h3>
            <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey'}}>
              <div className="row g-0">
                <div className="col-md-2">
                  <img src={user_img} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title" style={{fontWeight: 700}}>Dr. Reshma Malik</h5>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{backgroundColor: '#F4A4A4', borderRadius: '7px'}}>4.5</span>
                      
                      <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4EA1D3" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4EA1D3" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4EA1D3" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4EA1D3" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4EA1D3" class="bi bi-star-half" viewBox="0 0 16 16">
                        <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
                      </svg>
                      
                      <small className="mx-3">205 Ratings </small>
                    </p>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{backgroundColor: '#F4A4A4', borderRadius: '7px'}}>Profession: </span>Cardiologist
                    </p>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{backgroundColor: '#F4A4A4', borderRadius: '7px'}}>Address: </span> Sanjay Gandhi National Park, Borivali East, 400066
                    </p>
                    <p className="card-text text-secondary">
                      <span className='px-2 py-1 text-white mr-3' style={{backgroundColor: '#F4A4A4', borderRadius: '7px'}}>Location: </span>Mumabi, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="col-md-3 m-auto">
                  <button className="btn text-white py-2 mb-2" style={{backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black'}}>Book Your Appointment</button>
                  <button className="btn text-white py-2" style={{backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black'}}>Tap to Rate</button>
                </div>
              </div>
            </div>
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
            <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey'}}>
              <h1>About Us</h1>
            </div>
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
              <button onClick={handlePayment} className="btn btn-success">Book Appointment</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Professional;
