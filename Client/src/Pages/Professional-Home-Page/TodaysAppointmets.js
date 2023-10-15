import React, { useState } from "react";
import user_img from "../../Pages/User-Home-Page/images/reshma.png";

const TodaysAppointmets = () => {

  const [clients, setClients] = useState([]);

  

  return (
    <div>
      <h2 className="py-3">Today's Appointments</h2>
      <div>
        {clients.map((item, i) => (
          <div
            className="card mb-3 mt-3"
            style={{ width: "100%", boxShadow: "0 0 10px grey" }}
          >
            <div className="row g-0">
              <div className="col-md-2">
                <img src={user_img} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 700 }}>
                    Yash Dave
                  </h5>
                  <p className="card-text">
                    <span
                      className="px-2 py-2 text-white mr-3"
                      style={{ backgroundColor: "#F4A4A4", borderRadius: "7px" }}
                    >
                      10AM to 11AM
                    </span>


                  </p>
                  <p className="card-text">Student</p>
                  <p className="card-text text-secondary">Mumabi, Maharashtra</p>
                </div>
              </div>
              <div className="col-md-2 m-auto">
                <button
                  className="btn text-white py-2"
                  style={{
                    backgroundColor: "#D83A22",
                    fontWeight: 700,
                    border: "1px solid black",
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* <div
        className="card mb-3 mt-3"
        style={{ width: "100%", boxShadow: "0 0 10px grey" }}
      >
        <div className="row g-0">
          <div className="col-md-2">
            <img src={user_img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: 700 }}>
                Yash Dave
              </h5>
              <p className="card-text">
                <span
                  className="px-2 py-2 text-white mr-3"
                  style={{ backgroundColor: "#F4A4A4", borderRadius: "7px" }}
                >
                  10AM to 11AM 
                </span>

                
              </p>
              <p className="card-text">Student</p>
              <p className="card-text text-secondary">Mumabi, Maharashtra</p>
            </div>
          </div>
          <div className="col-md-2 m-auto">
            <button
              className="btn text-white py-2"
              style={{
                backgroundColor: "#D83A22",
                fontWeight: 700,
                border: "1px solid black",
              }}
            >
              Review 
            </button>
          </div>
        </div>
      </div>

      <div
        className="card mb-3 mt-3"
        style={{ width: "100%", boxShadow: "0 0 10px grey" }}
      >
        <div className="row g-0">
          <div className="col-md-2">
            <img src={user_img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: 700 }}>
                Yash Dave
              </h5>
              <p className="card-text">
                <span
                  className="px-2 py-2 text-white mr-3"
                  style={{ backgroundColor: "#F4A4A4", borderRadius: "7px" }}
                >
                  10AM to 11AM 
                </span>

                
              </p>
              <p className="card-text">Student</p>
              <p className="card-text text-secondary">Mumabi, Maharashtra</p>
            </div>
          </div>
          <div className="col-md-2 m-auto">
            <button
              className="btn text-white py-2"
              style={{
                backgroundColor: "#D83A22",
                fontWeight: 700,
                border: "1px solid black",
              }}
            >
              Review 
            </button>
          </div>
        </div>
      </div>

      <div
        className="card mb-3 mt-3"
        style={{ width: "100%", boxShadow: "0 0 10px grey" }}
      >
        <div className="row g-0">
          <div className="col-md-2">
            <img src={user_img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: 700 }}>
                Yash Dave
              </h5>
              <p className="card-text">
                <span
                  className="px-2 py-2 text-white mr-3"
                  style={{ backgroundColor: "#F4A4A4", borderRadius: "7px" }}
                >
                  10AM to 11AM 
                </span>

                
              </p>
              <p className="card-text">Student</p>
              <p className="card-text text-secondary">Mumabi, Maharashtra</p>
            </div>
          </div>
          <div className="col-md-2 m-auto">
            <button
              className="btn text-white py-2"
              style={{
                backgroundColor: "#D83A22",
                fontWeight: 700,
                border: "1px solid black",
              }}
            >
              Review 
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TodaysAppointmets;
