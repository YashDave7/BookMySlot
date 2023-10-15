import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user_img from '../../Pages/User-Home-Page/images/reshma.png'
// import "./card.css";

const UserHomePage = ({ setProfId }) => {
  let navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);

  const getProfessionals = async () => {
    // API call.
    const response = await fetch(
      `http://localhost:5000/api/getAll/fetchProfessionals`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setProfessionals(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfessionals();
      //eslint-disable-next-line
    } else {
      navigate("/user/login");
    }
  }, []);

  const goToProfessional = (professionalId) => {
    const newProfId = professionalId;
    setProfId(newProfId);
    navigate(`/user/professional/${professionalId}`);
  };


  // Function to calculate average rating for a professional
  const calculateAverageRating = (professional) => {
    let totalRatings = 0;
    let numberOfRatings = professional.reviews.length;
    if (numberOfRatings === 0) {
      return 0;
    }
    professional.reviews.forEach((review) => {
      totalRatings += parseInt(review.rate);
    });
    console.log(totalRatings / numberOfRatings);
    return totalRatings / numberOfRatings;
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
          className="bi bi-star-fill"
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
          className="bi bi-star-half"
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
          className="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M8 13.187l-4.389 2.256c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.386-.443-.149-1.149.282-.95l4.898.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898-.696c.441-.062.668.507.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187zm0-11.962v10.775l3.793 2.051-.723-4.12a.527.527 0 0 1 .152-.476l3.117-2.972-4.324-.615a.532.532 0 0 1-.405-.295L8 1.225z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
      {/* <div className="ad">
        Advertisement
      </div>
      <div className='main'>
        <div className='side-ad'>
          Advertisement
        </div>
        <div className='main-card'>
          {professionals.map((item, i) => (
            <div onClick={() => goToProfessional(item._id)} className="card">
              <div className="card-image">

              </div>
              <div className="card-info">
                <div className="prof-name">
                  {item.name}
                </div>
                <div className="rating">
                  <span className="rate-avg">4.8</span>
                  <span>124 Ratings</span>
                </div>
                <div className="prof-city">
                  {item.city}
                </div>
                <div className="prof-specialisation">
                  <span>{item.specialisation}</span>
                  {/* <span>Glaucoma</span> */}
      {/* </div>
                <div className="book">
                  <button>Book Appointment</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="all_camps"> */}
      {/* {professionals.map((item, i) => (
            <div onClick={() => goToProfessional(item._id)}>
            <h5 className="card-title">{item.name}</h5>
              
                <div className='d-flex justify-content-between mb-0'>
                  <span class="badge text-bg-secondary" style={{ "color": "#F4EEE0" }}>{item.email}</span>
                  <div>
                    <i className="fa-solid fa-pen-to-square" style={{ "fontSize": "20px" }}>
                      {item.mobile}</i>
                    <i className="fa-solid fa-trash mx-2" style={{ "fontSize": "20px" }}></i>
                  </div>
                </div>
                <p className="my-2 font-weight-light" style={{ "fontWeight": "lighter", "fontStyle": "italic", "fontSize": "14px" }}>{item.profession},
                  {item.specialisation},
                  {item.address}
                </p>
                <p>Reviews:</p>
                {item.reviews.map((review, index) => (
                  <p key={index}>{review.review}, {review.rate}</p>
                ))}
              </div>

            </div>
          ))} */}
      {/* </div>
      </div> */}

      <div className="container-fluid no-padding">
        <div className="row">
          <div
            className="col-12 px-5"
            style={{ border: "2px solid red", height: "20vh" }}
          >
            ADVERTISEMENT-1
          </div>

          <div className="col-9 px-5" style={{ border: "2px solid red" }}>
            {professionals.map((item, i) => (
              <div onClick={() => goToProfessional(item._id)} key={i} className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey', cursor: 'pointer' }}>
                <div className="row g-0">
                  <div className="col-md-2">
                    <img src={user_img} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: 700 }}>{item.name}</h5>
                      <p className="card-text">
                        <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>
                          {isNaN(calculateAverageRating(item)) ? 0.0 : calculateAverageRating(item).toFixed(1)}
                        </span>

                        <span className="stars">
                          {generateStarIcons(item.averageRating)}
                        </span>
                        <small className="mx-3"> {item.reviews.length} Ratings </small>
                      </p>
                      <p className="card-text">
                        {item.profession} <br />
                        <span>{item.specialisation}</span>
                      </p>
                      <p className="card-text text-secondary">
                        {item.address}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 m-auto">
                    <button className="btn text-white py-2" style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black' }}>Book Your Appointment</button>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey'}}>
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
                      Cardiologist
                    </p>
                    <p className="card-text text-secondary">
                      Mumabi, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="col-md-3 m-auto">
                  <button className="btn text-white py-2" style={{backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black'}}>Book Your Appointment</button>
                </div>
              </div>
            </div>

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
                      Cardiologist
                    </p>
                    <p className="card-text text-secondary">
                      Mumabi, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="col-md-3 m-auto">
                  <button className="btn text-white py-2" style={{backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black'}}>Book Your Appointment</button>
                </div>
              </div>
            </div>

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
                      Cardiologist
                    </p>
                    <p className="card-text text-secondary">
                      Mumabi, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="col-md-3 m-auto">
                  <button className="btn text-white py-2" style={{backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid black'}}>Book Your Appointment</button>
                </div>
              </div>
            </div> */}
          </div>

          <div
            className="col-3 px-5"
            style={{ border: "2px solid red", height: "100vh" }}
          >
            ADVERTISEMENT-2
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
