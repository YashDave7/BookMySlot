import React, { useState, useEffect } from 'react';
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
          "auth-token": localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setProfessional(json);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      particularProfessional();
      //eslint-disable-next-line
    }
    else {
      navigate('/user/login');
    }
  }, [props.profId])

  return (
    <>
      <div>
        Heoooooollllo
        {professional.name},
        {professional.profession}
      </div>
      <button onClick={bookAppointment}>Book Appointment</button>
    </>
  )
}

export default Professional