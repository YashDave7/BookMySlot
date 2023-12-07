import React, { useState, useEffect } from "react";
// import MyCalendar from './MyCalendar';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import './style/MyCalendar.css';
import './style/professional.css';
import user_img from '../../Pages/User-Home-Page/images/reshma.png';
import axios from 'axios';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Professional = (props) => {
  // let navigate = useNavigate();
  const [professional, setProfessional] = useState({});     // storing professional data.
  const [user, setUser] = useState({});     // storing professional data.
  const [reviews, setReviews] = useState([]);               // storing professional reviews.
  const [date, setDate] = useState(new Date());             // selected date for booking.
  const [selectedTime, setSelectedTime] = useState('');     // selected time slot.
  const [slotId, setSlotId] = useState('');                 // selected slot id for style changing.
  const [timeSlots, setTimeSlots] = useState([]);           // all the timeslots.
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);   // timeslots for a particular day.
  const [cost, setCost] = useState(199);                            // cost of each appointment.
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [avgRating, setAvgRating] = useState(0);            // average of all the reviews.
  const [rating, setRating] = useState(0);                  // write review section.
  const [review, setReview] = useState('');                 // write review section.


  // Function to calculate average rating for a professional
  const calculateAverageRating = () => {
    let totalRatings = 0;
    const numberOfRatings = reviews.length || 0;
    if (numberOfRatings === 0) {
      return 0;
    }
    reviews.forEach((review) => {
      totalRatings += parseInt(review.rate);
    });

    setAvgRating((totalRatings / numberOfRatings).toFixed(1)); // rounding to 1 decimal places

    return totalRatings / numberOfRatings;
  };


  // API CALL TO FETCH DATA OF THE SELECTED PROFESSIONAL.
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        }
      );
      const json = await response.json();
      setUser(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

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
      setCost(json.fees);
      setReviews(json.reviews);
      calculateAverageRating();
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
      toast.error('Something Went wrong');
      console.log(error);
    }
  };

  // PAYMENT API.
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

  // API TO BOOK APPOINTMENT.
  const bookAppointment = async () => {
    try {
      // Extract profID from the URL
      const url = new URL(window.location.href);
      const profID = url.pathname.split('/').pop();
      // const dateID = x;
      // const slotID = ;
      if (!profID) {
        throw new Error('profID is not defined');
      }

      // Make sure selectedTime and date are defined
      if (!selectedTime || !date) {
        throw new Error('selectedTime or date is not defined');
      }

      // Get the components of the date
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so we add 1
      const day = date.getDate().toString().padStart(2, '0');

      // Combine the components into the desired format
      const formattedDate = `${year}-${month}-${day}`;

      // console.log(profID);
      console.log(date.toDateString());
      const update = await fetch(
        `http://localhost:5000/api/professionalRoutes/updateSlotAvailability/${profID}/${slotId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ day: formattedDate })
        }
      );
      console.log(update);

      // API call.
      const response = await fetch(
        `http://localhost:5000/api/booking/bookappointment/${profID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ timing: selectedTime, appointmentDate: date.toDateString(), bookingStatus: 'Future Appointment', paymentStatus: 'Paid' })
        }
      );
      const json = await response.json();
      toast.success('Appointment Scheduled Successfully');
    } catch (error) {
      toast.error('Something Went wrong');
      console.log(error);
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      particularProfessional();
      fetchUserData();
      //eslint-disable-next-line
    } else {
      navigate("/user/login");
    }
  }, []);



  useEffect(() => {
    particularProfessional();
    // Filter appointments based on selected date
    const filtered = timeSlots.filter(timeslot => new Date(timeslot.day).toDateString() === date.toDateString());
    setFilteredTimeSlots(filtered);
  }, [date, timeSlots, selectedTime]);

  const handleTimeSlotClick = (timeSlot, id) => {
    setSelectedTime(timeSlot);
    setSlotId(id);
    console.log(selectedTime);
    console.log(date);
  };

  const onChange = (date) => {
    console.log(date);
    setDate(date);
  };


  // Function to generate star icons based on the rating
  const generateStarIcons = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#4EA1D3"
          className="bi bi-star-fill mx-1"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#4EA1D3"
          className="bi bi-star-half mx-1"
          viewBox="0 0 16 16"
        >
          <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
        </svg>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg
          key={`empty_${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#4EA1D3"
          className="bi bi-star mx-1"
          viewBox="0 0 16 16"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      );
    }
    // console.log(stars);
    return stars;
  };

  // GIVE RATING.
  const handleRating = (value) => {
    setRating(value);
  };

  // WRITE REVIEW.
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // API TO WRITE REVIEW.
  const writeReview = async () => {
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
        `http://localhost:5000/api/writeReview/review/${profID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ rate: rating, review: review })
        }
      );
      const json = await response.json();
      // Reset the review state after successful submission
      setReview('');
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };



  // Check if the logged-in user has already submitted a review
  const hasUserReviewed = reviews.some((review) => review.user_id === user._id);

  return (
    <>
      <Navbar />
      {/* <div>
        Heoooooollllo
        {professional.name},
        {professional.profession}
      </div>
      <button onClick={bookAppointment}>Book Appointment</button> */}

      <div className="container-fluid no-padding">
        <div className="row">
          <div className="col-8" >
            <h3 className="mt-3">Profession Profile</h3>
            <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey', borderRadius: '10px' }}>
              <div className="row g-0">
                <div className="col-md-2">
                  <img src={user_img} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontWeight: 700 }}>{professional.name}</h5>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>{avgRating}</span>

                      <span className="stars">
                        {generateStarIcons(avgRating)}
                      </span>

                      <small className="mx-3">{reviews.length} Ratings </small>
                    </p>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>Profession: </span>{professional.profession}
                    </p>
                    <p className="card-text">
                      <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>Address: </span> {professional.address}
                    </p>
                    <p className="card-text text-secondary">
                      <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>City: </span> {professional.city}
                    </p>
                    <p className="card-text text-secondary">
                      <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>Fees: </span> {professional.fees} per session
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-5" style={{ border: '1px dashed #9AA4EC' }} />

          </div>
          <div className="col-4 mt-2" >
            <Calendar
              onChange={onChange}
              value={date}
            />
          </div>

          {/* <!-- Force next columns to break to new line at md breakpoint and up --> */}
          <div className="w-100 d-none d-md-block"></div>
          <div className="col-8" >
            <div className="card mb-3 mt-3" style={{ width: '100%', border: 'none' }}>
              <h3>Reviews</h3>
              {!hasUserReviewed && (
                <div className="mx-3 writeReview">
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        style={{ cursor: 'pointer' }}
                        fill={index < rating ? 'yellow' : 'currentColor'}
                        className="mx-1 bi bi-star"
                        viewBox="0 0 16 16"
                        onClick={() => handleRating(index + 1)}
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    ))}
                  </div>
                  <textarea
                    style={{ borderRadius: '18px', padding: '20px' }}
                    name="review"
                    value={review}
                    onChange={handleReviewChange}
                    cols="120"
                    rows="3"
                    placeholder="Write a review..."
                  ></textarea>
                  <button className="btn" onClick={() => {
                    if (rating && review) {
                      writeReview();
                    }
                    else {
                      alert('Write something in review');
                    }
                  }}>
                    Submit
                  </button>
                </div>
              )}
              {reviews && reviews.map((item, i) => (
                <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 3px grey', borderRadius: '20px' }}>
                  <div className="row g-0">
                    <div className="col-md-2">
                      <img src={user_img} className="img-fluid rounded-start" alt="..." style={{ height: '80px' }} />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontWeight: 700, fontSize: '15px' }}>{item.username}</h5>

                        <p style={{width: '135%'}} className="">
                          <span>{item.review}</span>
                      <span style={{fontStyle: 'italic', float: 'right' }}>{new Date(item.date).toDateString()}</span>
                        </p>
                      </div>
                    </div>
                    <p className="card-text my-4">
                      {/* <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>
                          {isNaN(calculateAverageRating()) ? 0.0 : calculateAverageRating().toFixed(1)}
                        </span> */}

                      <span className="stars">
                        {generateStarIcons(item.rate)}
                      </span>
                      {/* <small className="mx-3"> {item.length} Ratings </small> */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="col-4">
            <h3 className="mt-3">Available Slots on {date.toDateString()}</h3>
            <div className="mt-4 container">
              {filteredTimeSlots.map((slot, index) => (
                // <div className="">
                <div key={index} className="row">
                  {slot.timeslots.map((eachSlot, i) => (
                    <div key={i} className="col-md-4">
                      <button
                        style={{
                          backgroundColor: eachSlot.status === 'Not Available' ? 'grey' : 'white',
                          border: eachSlot.status === 'Not Available' ? '2px solid grey' : '2px solid green',
                          color: eachSlot.status === 'Not Available' ? 'white' : 'green',
                          cursor: eachSlot.status === 'Not Available' ? 'not-allowed' : 'pointer',
                          backgroundColor: selectedSlot === eachSlot._id ? 'green' : (eachSlot.status === 'Not Available' ? 'grey' : 'white'),
                          color: selectedSlot === eachSlot._id ? 'white' : (eachSlot.status === 'Not Available' ? 'white' : 'green')
                        }}
                        className="time-slot my-2 btn"
                        onClick={() => {
                          if (eachSlot.status !== 'Not Available') {
                            handleTimeSlotClick(eachSlot.timeFrame, eachSlot._id);
                            setSelectedSlot(eachSlot._id);
                          }
                        }}
                      >
                        {eachSlot.timeFrame}
                      </button>
                    </div>
                  ))}
                  {/* </div> */}
                </div>
              ))}

              <button onClick={() => {
                if (date && selectedTime) {
                  handlePayment();
                }
                else {
                  alert('Select a date and timeslot to book an appointment');
                }
              }} className=" my-3 btn btn-success">Book Appointment</button>

            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
};

export default Professional;
