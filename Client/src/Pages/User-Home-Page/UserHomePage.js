import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user_img from '../../Pages/User-Home-Page/images/reshma.png'
import "./card.css";
import banner from "./images/banner-doctor.jpg"
import ad from "./images/ad-counsellor.jpg"
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserHomePage = ({ setProfId }) => {
  let navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // FILTERS LOGIC.
  const filterProfessionals = (professionals, selectedFilter, searchTerm) => {
    return professionals.filter((professional) => {
      const matchesSearch =
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.specialisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" ||
        calculateAverageRating(professional) >= selectedFilter;

      return matchesSearch && matchesFilter;
    });
  };

  const filteredProfessionals = filterProfessionals(
    professionals,
    selectedFilter,
    searchTerm
  );

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle sorting
  const handleSort = (sortBy) => {
    let sortedProfessionals = [...professionals];

    switch (sortBy) {
      case 'priceLowToHigh':
        sortedProfessionals.sort((a, b) => a.fees - b.fees);
        break;
      case 'priceHighToLow':
        sortedProfessionals.sort((a, b) => b.fees - a.fees);
        break;
      case 'ratings':
        sortedProfessionals.sort((a, b) => {
          const ratingA = calculateAverageRating(a);
          const ratingB = calculateAverageRating(b);
          return ratingB - ratingA;
        });
        break;
      default:
        break;
    }

    setProfessionals(sortedProfessionals);
  };

  // Function to handle profession filter change
const handleProfessionChange = (profession) => {
  let filteredProfessionals = [];

  switch (profession) {
    case 'doctor':
      filteredProfessionals = professionals.filter(professional => professional.profession.toLowerCase() === 'doctor');
      break;
    case 'lawyer':
      filteredProfessionals = professionals.filter(professional => professional.profession.toLowerCase() === 'lawyer');
      break;
    case 'therapist':
      filteredProfessionals = professionals.filter(professional => professional.profession.toLowerCase() === 'therapist');
      break;
    case 'counsellor':
      filteredProfessionals = professionals.filter(professional => professional.profession.toLowerCase() === 'counsellor');
      break;
    default:
      filteredProfessionals = professionals; // Show all professionals if no specific profession selected
      break;
  }

  // Update the filtered professionals
  setProfessionals(filteredProfessionals);
};


  // Function to reset filters
  const resetFilters = () => {
    setSelectedFilter('all'); // Reset selected filter to 'all'
    setSearchTerm(''); // Reset search term to empty string
    setProfessionals(getProfessionals); // Reset professionals list to the original list fetched from API
  };



  return (
    <>
      <Navbar />

      <div className="container-fluid no-padding">
        <div className="row">
          <div className="mx-5 filters" >
            <div className="dropdown mt-2 mr-3">
              <button style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={() => handleSort('priceLowToHigh')}>Price (Low to High)</button>
                <button className="dropdown-item" onClick={() => handleSort('priceHighToLow')}>Price (High to Low)</button>
                <button className="dropdown-item" onClick={() => handleSort('ratings')}>Ratings</button>
              </div>
            </div>

            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Professionals"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
            <div className="fil-btn"><button className="btn text-white py-2" style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec' }} onClick={() => handleFilterChange(4)}>Ratings 4+</button></div>
            <div className="fil-btn"><button className="btn text-white py-2" style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec' }}>Location</button></div>
            <div className="fil-btn"><button className="btn text-white py-2" style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec' }}  onClick={resetFilters}>Reset Filters</button></div>
            {/* <button className="btn btn-danger">Reset Filters</button> */}
            <div className="dropdown mt-2 mr-3">
              <button style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profession
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={() => handleProfessionChange('doctor')}>Doctor</button>
                <button className="dropdown-item" onClick={() => handleProfessionChange('lawyer')}>Lawyer</button>
                <button className="dropdown-item" onClick={() => handleProfessionChange('therapist')}>Therapist</button>
                <button className="dropdown-item" onClick={() => handleProfessionChange('counsellor')}>Counsellor</button>

              </div>
            </div>
          </div>
          <div
            className="col-12 px-5"

          >
            <img style={{ height: '15vh' }} className="mt-3 banner-img" src={banner}></img>
          </div>

          <div className="col-9 px-5" style={{ height: '700px', overflow: 'scroll' }} >
            {filteredProfessionals.map((item, i) => (
              <div onClick={() => goToProfessional(item._id)} key={i} className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 10px grey', cursor: 'pointer', borderRadius: '10px', overflow: 'hidden' }}>
                <div className="row g-0">
                  <div className="col-md-2">
                    <img src={user_img} className="img-fluid rounded-start" alt="Profile" style={{ height: '100%', borderRadius: '10px 0 0 10px' }} />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: 700 }}>{item.name}</h5>
                      <p className="card-text">
                        <span className='px-2 py-1 text-white mr-3' style={{ backgroundColor: '#F4A4A4', borderRadius: '7px' }}>
                          {isNaN(calculateAverageRating(item)) ? 0.0 : calculateAverageRating(item).toFixed(1)}
                        </span>

                        <span className="stars">
                          {generateStarIcons(calculateAverageRating(item))}
                        </span>
                        <small className="mx-3"> {item.reviews.length} Ratings </small>
                      </p>
                      <p className="card-text">
                        {item.profession} - {item.specialisation}
                      </p>
                      <p className="card-text">
                        Fees: {item.fees} per session
                      </p>
                      <p className="card-text text-secondary">
                        {item.address}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 m-auto">
                    <button className="btn text-white py-2" style={{ backgroundColor: '#9AA4EC', fontWeight: 700, border: '1px solid #9aa4ec', borderRadius: '0 10px 10px 0' }}>Book Your Appointment</button>
                  </div>
                </div>
              </div>

            ))}
          </div>

          <div
            className="col-3 px-5"
          >
            <img className="side-img" src={ad}></img>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;
