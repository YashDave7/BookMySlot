import React, { useEffect, useState } from 'react'

const Admin = () => {

    const [professionals, setProfessionals] = useState([]);
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [cut, setCut] = useState('');
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

    const getUsers = async () => {
        // API call.
        const response = await fetch(
            `http://localhost:5000/api/getAll/fetchUsers`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = await response.json();
        console.log(json);
        setUsers(json);
    };

    const getBookings = async () => {
        // API call.
        const response = await fetch(
            `http://localhost:5000/api/getAll/fetchBookings`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = await response.json();

        // Sum all paymentAmount
        let totalPayment = 0;
        json.forEach(item => {
            const parsedAmount = parseFloat(item.paymentAmount);
            if (!isNaN(parsedAmount)) {
                totalPayment += parsedAmount;
            }
        });

        const commission = totalPayment * 0.1;

        console.log(json);
        setBookings(json);
        setCut(commission);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getProfessionals();
            getUsers();
            getBookings();
            //eslint-disable-next-line
        } else {
            navigate("/");
        }
    }, []);

    return (
        <>
            <div className="container-fluid no-padding" style={{ backgroundColor: 'black' }}>
                <header className="d-flex flex-wrap py-2 mb-4 border-bottom">
                    <h4 className='text-white mx-5'>BookMySlot - Admin Dashboard</h4>
                </header>
            </div>

            <h3 className='mx-5 my-3 px-3'>Statastics</h3>
            <div className='card-group mx-5'>
                <div className="card text-center mb-3 mx-3" style={{ boxShadow: '0 0 7px green', height: '30vh', borderRadius: '20px' }}>
                    <div className="card-body">
                        <h1 className="card-title my-4">{users.length}+</h1>
                        <h4 className="card-text">Total No. of Users Registered</h4>
                    </div>
                </div>
                <div className="card text-center mb-3 mx-3" style={{ boxShadow: '0 0 7px green', height: '30vh', borderRadius: '20px' }}>
                    <div className="card-body">
                        <h1 className="card-title  my-4">{professionals.length}+</h1>
                        <h4 className="card-text">Total No. of Listed Professionals</h4>
                    </div>
                </div>
                <div className="card text-center mb-3 mx-3" style={{ boxShadow: '0 0 7px green', height: '30vh', borderRadius: '20px' }}>
                    <div className="card-body">
                        <h1 className="card-title  my-4">{bookings.length}+</h1>
                        <h4 className="card-text">Total No. of Transactions</h4>
                    </div>
                </div>
                <div className="card text-center mb-3 mx-3" style={{ boxShadow: '0 0 7px green', height: '30vh', borderRadius: '20px' }}>
                    <div className="card-body">
                        <h1 className="card-title  my-4">₹{cut}</h1>
                        <h4 className="card-text">Earning through commission</h4>
                    </div>
                </div>
            </div>

            <hr className='my-5' />

            <div className='card-group mx-5'>
                <div className="card mx-4 mb-3" style={{ boxShadow: '0 0 7px green', borderRadius: '20px' }}>
                    <h4 className="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check mx-2" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                        </svg>
                        Professionals Listed on BookMySlot
                    </h4>
                    <ul className="list-group list-group-flush">
                        {professionals.map((item, i) => (
                            <li className="list-group-item">{item.name}</li>
                        ))}
                    </ul>
                </div>
                {/* <div className="card mx-4 mb-3" style={{ boxShadow: '0 0 7px green', borderRadius: '20px' }}>
                    <h4 className="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-currency-rupee mx-2" viewBox="0 0 16 16">
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                        </svg>
                        Revenue genereated

                    </h4>
                    <ul className="list-group list-group-flush">
                        {cut}
                    </ul>
                </div> */}
            </div>

            <div class="container-fluid no-padding text-white" style={{ backgroundColor: 'black' }}>
                <footer class="py-3 mt-4">
                    <p class="text-center text-body-secondary">© 2023 Company, Inc</p>
                </footer>
            </div>
        </>
    )
}

export default Admin