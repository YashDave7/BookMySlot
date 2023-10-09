import React, { useState, useEffect } from 'react'

const UserHomePage = () => {

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
    getProfessionals();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <>
        <div className="all_camps">
          {professionals.map((item, i) => (
            <div>
              {item.name},
              {item.email},
              {item.mobile},
              {item.profession},
              {item.specialisation},
              {item.address}
            </div>
          ))}
        </div>
      </>
    </>
  )
}

export default UserHomePage