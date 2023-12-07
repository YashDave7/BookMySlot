import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import profimg from "./meeting.jpg"
// import './UserLoginSignin.css';

const ProfessionalLogin = () => {
    let navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(true);  // Added state to control login form visibility
    const [showRegister, setShowRegister] = useState(false);

    // // REGISTER API.
    // const [registerCredentials, setRegisterCredentials] = useState({ email: '', name: '', mobile: '', profession: '', specialisation: '', age: '', gender: '', address: '', city: '', fees: '', timing: '', password: '' });
    // const onChangeRegister = (e) => {
    //     setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    // }

    // const handleRegisterSubmit = async (e) => {
    //     e.preventDefault();
    //     if (registerCredentials.password !== registerCredentials.confirmPassword) {
    //         console.log(credentials);
    //         toast.error("Passwords dont match");
    //         return
    //     }
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/authProfessional/createprofessional`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ email: registerCredentials.email, name: registerCredentials.name, mobile: registerCredentials.mobile, profession: registerCredentials.profession, specialisation: registerCredentials.specialisation, age: registerCredentials.age, gender: registerCredentials.gender, address: registerCredentials.address, city: registerCredentials.city, fees: registerCredentials.fees, timing: registerCredentials.timing, password: registerCredentials.password })
    //         });
    //         const json = await response.json()
    //         console.log(json);
    //         if (json.authToken) {
    //             // Save the authToken and Redirect.
    //             localStorage.setItem('token', json.authToken);
    //             navigate("/professional/home");
    //             toast.success("Account Created Successfully");
    //         }
    //         else {
    //             toast.error("Invalid credentials");
    //         }
    //     } catch (error) {
    //         toast.error("Something went wrong");
    //     }
    // }

    const [registerCredentials, setRegisterCredentials] = useState({ email: '', name: '', mobile: '', profession: '', specialisation: '', age: '', gender: '', address: '', city: '', fees: '', startTime: '', endTime: '', eachSlotTime: '', password: '', confirmPassword: '' });

    const onChangeRegister = (e) => {
        setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (registerCredentials.password !== registerCredentials.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/authProfessional/createprofessional`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: registerCredentials.name,
                    email: registerCredentials.email,
                    mobile: registerCredentials.mobile,
                    profession: registerCredentials.profession,
                    specialisation: registerCredentials.specialisation,
                    age: registerCredentials.age,
                    gender: registerCredentials.gender,
                    address: registerCredentials.address,
                    city: registerCredentials.city,
                    fees: registerCredentials.fees,
                    // startTime: registerCredentials.startTime,
                    // endTime: registerCredentials.endTime,
                    // eachSlotTime: registerCredentials.eachSlotTime,
                    password: registerCredentials.password
                })
            });
            const json = await response.json();
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                navigate("/professional/home");
                toast.success("Account Created Successfully");
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    // LOGIN API.
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const onChangeLogin = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    }


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/authProfessional/loginprofessional`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
            });
            const text = await response.text(); // Get the response as text

            // console.log("Response from the server:", text); // Log the response

            const json = JSON.parse(text);
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                toast.success("Logged In Successfully");
                navigate("/professional/home");
            }
            else {
                console.log("HELLLLLLO");
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.log("Hello");
            toast.error("Something went wrong");
        }
    }

    const toggleRegister = () => {
        console.log("Toggle to Register");
        setShowLogin(false);
        setShowRegister(true);
    }

    const toggleLogin = () => {
        console.log("Toggle to Login");
        setShowLogin(true);
        setShowRegister(false);
    }
    return (
        <>
            <div className="form-modal">
                <div id='prof-toggle' className="form-toggle">
                    <button style={{ backgroundColor: '#B9E1DC', color: 'black'}} id="" onClick={toggleLogin}>log in</button>
                    <button style={{ backgroundColor: '#B9E1DC', color: 'black'}} id="" onClick={toggleRegister}>Register</button>
                </div>
                <div className='login-page-image'>
                    <div>
                        <img id='proff' className='calender-img' src={profimg}></img>
                    </div>
                    {showLogin && (
                        <div id="login-form">
                            <form onSubmit={handleLoginSubmit}>
                                <input type="email" name='email' onChange={onChangeLogin} defaultValue={loginCredentials.email} placeholder="Enter email" />
                                <input type="password" name='password' onChange={onChangeLogin} defaultValue={loginCredentials.password} placeholder="Enter password" />
                                <button id='prof-btn' style={{ backgroundColor: '#B9E1DC', color: 'black'}} type="submit" className="btn login">login</button>
                                <p id='prof-details' className='form-details'><Link to="">Forgotten account</Link></p>
                                {/* <hr /> */}
                            </form>
                        </div>
                    )}

                    {showRegister && (
                        <div id="signup-form">
                            {/* <form onSubmit={handleRegisterSubmit}>
                        <input type="text" name='name' defaultValue={registerCredentials.name} onChange={onChangeRegister} placeholder="Enter your name" />
                        <input type="email" name='email' defaultValue={registerCredentials.email} onChange={onChangeRegister} placeholder="Enter your email" />
                        <input type="number" name='mobile' defaultValue={registerCredentials.mobile} onChange={onChangeRegister} placeholder="Enter your mobile no." />
                        <input type="text" name='profession' defaultValue={registerCredentials.profession} onChange={onChangeRegister} placeholder="Select your Profession" />
                        <input type="text" name='specialisation' defaultValue={registerCredentials.specialisation} onChange={onChangeRegister} placeholder="Enter Specialisation" />
                        <input type="number" name='age' defaultValue={registerCredentials.age} onChange={onChangeRegister} placeholder="Enter your age" />
                        <input type="text" name='gender' defaultValue={registerCredentials.gender} onChange={onChangeRegister} placeholder="Select your gender" />
                        <input type="text" name='address' defaultValue={registerCredentials.address} onChange={onChangeRegister} placeholder="Enter Address" />
                        <input type="text" name='city' defaultValue={registerCredentials.city} onChange={onChangeRegister} placeholder="Enter City" />
                        <input type="number" name='fees' defaultValue={registerCredentials.fees} onChange={onChangeRegister} placeholder="Enter approx fees" />
                        <input type="text" name='timing' defaultValue={registerCredentials.timing} onChange={onChangeRegister} placeholder="Enter Timing" />
                        <input type="password" name='password' defaultValue={registerCredentials.password} onChange={onChangeRegister} placeholder="Enter Password" />
                        <input type="password" name='confirmPassword' defaultValue={registerCredentials.confirmPassword} onChange={onChangeRegister} placeholder="Confirm password" />
                        <button id='prof-btn' type="submit" className="btn signup">create account</button>
                        <p id='prof-details' className='form-details'>Clicking <strong>create account</strong> means that you are agree to our <Link to="">terms of services</Link>.</p>
                    </form> */}
                            <form onSubmit={handleRegisterSubmit}>
                                <input type="text" name="name" value={registerCredentials.name} onChange={onChangeRegister} placeholder="Enter your name" />
                                <input type="email" name="email" value={registerCredentials.email} onChange={onChangeRegister} placeholder="Enter your email" />
                                <input type="text" name="mobile" value={registerCredentials.mobile} onChange={onChangeRegister} placeholder="Enter your mobile no." />
                                <input type="text" name="profession" value={registerCredentials.profession} onChange={onChangeRegister} placeholder="Select your Profession" />
                                <input type="text" name="specialisation" value={registerCredentials.specialisation} onChange={onChangeRegister} placeholder="Enter Specialisation" />
                                <input type="number" name="age" value={registerCredentials.age} onChange={onChangeRegister} placeholder="Enter your age" />
                                <input type="text" name="gender" value={registerCredentials.gender} onChange={onChangeRegister} placeholder="Select your gender" />
                                <input type="text" name="address" value={registerCredentials.address} onChange={onChangeRegister} placeholder="Enter Address" />
                                <input type="text" name="city" value={registerCredentials.city} onChange={onChangeRegister} placeholder="Enter City" />
                                <input type="number" name="fees" value={registerCredentials.fees} onChange={onChangeRegister} placeholder="Fees per session" />
                                {/* Modify timing input to accept an array */}
                                <input type="number" name="startTime" value={registerCredentials.startTime} onChange={onChangeRegister} placeholder="Enter Start Time" />
                                <input type="number" name="endTime" value={registerCredentials.endTime} onChange={onChangeRegister} placeholder="Enter End Time" />
                                <input type="number" name="eachSlotTime" value={registerCredentials.eachSlotTime} onChange={onChangeRegister} placeholder="Enter Total Slot Time" />
                                <input type="password" name="password" value={registerCredentials.password} onChange={onChangeRegister} placeholder="Enter Password" />
                                <input type="password" name="confirmPassword" value={registerCredentials.confirmPassword} onChange={onChangeRegister} placeholder="Confirm password" />
                                <button id="prof-btn" style={{ backgroundColor: '#B9E1DC', color: 'black'}} type="submit" className="btn signup">
                                    create account
                                </button>
                                <p id="prof-details" className="form-details">
                                    Clicking <strong>create account</strong> means that you agree to our{" "}
                                    <Link to="">terms of services</Link>.
                                </p>
                                {/* <hr /> */}
                            </form>

                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default ProfessionalLogin