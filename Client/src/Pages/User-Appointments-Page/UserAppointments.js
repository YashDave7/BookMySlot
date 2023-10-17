import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user_image from '../../Pages/User-Home-Page/images/reshma.png'

const UserAppointments = ({ setProfId }) => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    // Get all Appointments.
    const getAppointments = async () => {
        // API call.'
        const response = await fetch(`http://localhost:5000/api/userRoutes/fetchAppointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();

        setAppointments(json);
    }

    const cancelAppointment = async (id) => {
        try {
            // API call.
            await fetch(`http://localhost:5000/api/booking/usercancelappointment/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            // const json = response.json();

            // Logic to delete note at frontend.
            // const newNotes = notes.filter((note) => {
            //     return note._id !== id
            // })
            // setNotes(newNotes);
            // toast.success("Note Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAppointments()
            // eslint-disable-next-line
        }
        else {
            navigate('/user/login');
        }
    }, [])

    return (
        <>
            {/* <div>
                <h2>Your Appointments</h2>
                <div className="all_camps">
                    {appointments.map((item, i) => (
                        <div>
                            <div className="card-body">
                                {/* <div className='d-flex justify-content-between align-items-center'> 
                                <h5 className="card-title">{item.professionalname}</h5>
                                {/* </div> 
                                <div className='d-flex justify-content-between mb-0'>
                                    <span class="badge text-bg-secondary" style={{ "color": "#F4EEE0" }}>{item.email}</span>
                                    <div>
                                        <i className="fa-solid fa-pen-to-square" style={{ "fontSize": "20px" }}>
                                            {item.professionalemail}</i>
                                        <i className="fa-solid fa-trash mx-2" style={{ "fontSize": "20px" }}></i>
                                    </div>
                                </div>
                                <p className="my-2 font-weight-light" style={{ "fontWeight": "lighter", "fontStyle": "italic", "fontSize": "14px" }}>{item.profession},
                                    {item.professionalmobile},
                                    {item.date}
                                </p>
                                <p>{item.status}</p>
                                <button onClick={ () => cancelAppointment(item._id) }>Cancel Appointment</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div> */}

            <h2>Your Appointments</h2>
            <hr/>
            <div className='card-group'>
                <div class="card mx-3" style={{boxShadow: '0 0 10px grey'}}>
                    <img src="..." class="card-img-top img-fluid" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Dr. Reshma Malik</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
                <div class="card mx-3" style={{boxShadow: '0 0 10px grey'}}>
                    <img src="..." class="card-img-top img-fluid" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title" style={{fontWeight: 700}}>Dr. Reshma Malik</h5>
                        <p class="card-text">Profession, Specialization</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span>Date</span>:</li>
                        <li class="list-group-item">Time Slot:</li>
                        <li class="list-group-item">Contact</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Cancel Appointment</a>
                        
                    </div>
                </div>
                <div class="card mx-3" style={{boxShadow: '0 0 10px grey'}}>
                    <img src="..." class="card-img-top img-fluid" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Dr. Reshma Malik</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
                <div class="card mx-3" style={{boxShadow: '0 0 10px grey'}}>
                    <img src="..." class="card-img-top img-fluid" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Dr. Reshma Malik</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAppointments