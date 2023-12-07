import React from 'react'
import ProfDashboard from './ProfDashboard';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfessionalNavbar from '../Professional-Home-Page/ProfessionalNavbar';
import ProfessionalFooter from '../Professional-Home-Page/ProfessionalFooter';

const Finance = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalEarning, setTotalEarning] = useState('');
  const [todaysEarning, setTodaysEarning] = useState('');

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

     // Sort appointments in descending order of dates
  const sortedPayments = json.sort((a, b) => new Date(b.date) - new Date(a.date));


    // Summing all paymentAmount values
let totalAmount = 0;
json.forEach(item => {
  const parsedAmount = parseFloat(item.paymentAmount);
  if (!isNaN(parsedAmount)) {
    totalAmount += parsedAmount;
  }
});

let todaysEarning = 0;
const today = new Date().toISOString().slice(0, 10); // Get today's date in the format 'YYYY-MM-DD'

json.forEach(item => {
  if (item.date === today) {
    const parsedAmount = parseFloat(item.paymentAmount);
    if (!isNaN(parsedAmount)) {
      todaysEarning += parsedAmount;
    }
  }
});


    setTotalEarning(totalAmount); 
    setTodaysEarning(todaysEarning)
    setAppointments(sortedPayments);
  }

  useEffect(() => {
    fetchAppointments()
  }, []);

  return (
    <>
    <ProfessionalNavbar />
      <div className='row'>
        <div className='side_bar col-2' style={{ backgroundColor: '#B9E1DC' }} >
          <ProfDashboard />
        </div>
        <div className='col-10' style={{ border: '2px solid red' }}>
          <h2 className='text-center my-5'>Your Earning Details</h2>
          <div className='card-group'>
            <div className="card text-center mb-3 mx-3" >
              <div className="card-body" style={{ borderRadius: '20px', boxShadow: '0 0 7px red' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#D83A22" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                </svg>
                <p className="card-text">Today's Earnings:</p>
                <h3 className='card-text'>₹{totalEarning}</h3>
                {/* <a href="#" className="btn text-white" style={{ backgroundColor: '#D83A22' }}>Analyze</a> */}
              </div>
            </div>
            {/* <div className="card text-center mb-3 mx-3" >
              <div className="card-body" style={{ borderRadius: '20px', boxShadow: '0 0 7px red' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#D83A22" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                </svg>
                <p className="card-text">This Week's Earnings:</p>
                <h3 className='card-text'>₹1000</h3>
                      </div>
            </div> */}
            <div className="card text-center mb-3 mx-3" >
              <div className="card-body" style={{ borderRadius: '20px', boxShadow: '0 0 7px red' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#D83A22" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                </svg>
                <p className="card-text">All Time Earnings:</p>
                <h3 className='card-text'>₹{totalEarning}</h3>
                {/* <a href="#" className="btn text-white" style={{ backgroundColor: '#D83A22' }}>Analyze</a> */}
              </div>
            </div>
          </div>

          <hr className='my-4' style={{ border: '1px dashed #D83A22' }} />
          <h2 className='text-center my-4'>Payment History</h2>

          {appointments.map((item, i) => (
            <div className="card mb-3 mt-3" style={{ width: '100%', boxShadow: '0 0 3px grey', borderRadius: '20px' }}>
              <div className="row g-0">
                <div className="col-md-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="green" class="bi bi-check-circle-fill mt-4 mx-3" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontWeight: 700 }}>{item.username}</h5>

                    <p className="card-text">
                      Payment ID: {item._id}
                    </p>
                    <p className="card-text">
                    Amount: {item.paymentAmount}
                    </p>
                    <p className="card-text">
                    Payment Time: {item.date} 
                    </p>
                  </div>
                </div>
                <div className="col-md-3 m-auto">
                  <h3>{item.paymentStatus}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProfessionalFooter/>
    </>
  )
}

export default Finance