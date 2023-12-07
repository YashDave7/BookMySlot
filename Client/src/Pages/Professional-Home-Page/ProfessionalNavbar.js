import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import "./Navbar.css";

export default function Navbar(props) {
    const url = new URL(window.location.href);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light border" style={{ backgroundColor: '#B9E1DC', padding: '10px 50px', fontWeight: 700 }}>
                <a className="navbar-brand" href="/">BookMySlot</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn custom-btn my-2 my-sm-0" type="submit" style={{color:'#ff4d4d'}}>Search</button>
                    </form> */}
                    {/* <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="user/login" style={{color:'white'}}>Join as a User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/professional/register" style={{color:'white'}}>Login/Signup</Link>
                        </li>
                    </ul> */}
                    {(url.pathname === '/') || (!localStorage.getItem('token')) ?
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="professional/register">Join as a User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/login">Login/Signup</Link>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-link" to="/professional/home">Appointments</Link>
                            <Link className="nav-link" to="/professional/finance">Finance</Link>
                            {/* <Link className="nav-link" to="/professional/notifications">Notifications</Link> */}
                            <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                        </ul>
                    }
                </div>
            </nav>
        </>
    );
}
