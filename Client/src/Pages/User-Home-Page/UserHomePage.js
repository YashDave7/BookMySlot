import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserHomePage = () => {
  let navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);

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
    getProfessionals();
    //eslint-disable-next-line
  }, [])

  const goToProfessional = () => {
    // setSelectedProfessionals();
    navigate(`/professional/`, {userid: 'yash'});
  }

  return (
    <>
      <>
        <div className="all_camps">
          {professionals.map((item, i) => (
            <div onClick={goToProfessional}>
              <div className="card-body">
                {/* <div className='d-flex justify-content-between align-items-center'> */}
                <h5 className="card-title">{item.name}</h5>
                {/* </div> */}
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
              {item.address}</p>
              </div>
              
            </div>
          ))}
        </div>
      </>
    </>
  )
}

export default UserHomePage