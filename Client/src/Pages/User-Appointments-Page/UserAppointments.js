import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
            <div>
                <h2>Your Appointments</h2>
                <div className="all_camps">
                    {appointments.map((item, i) => (
                        <div>
                            <div className="card-body">
                                {/* <div className='d-flex justify-content-between align-items-center'> */}
                                <h5 className="card-title">{item.professionalname}</h5>
                                {/* </div> */}
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
            </div>
        </>
    )
}

export default UserAppointments