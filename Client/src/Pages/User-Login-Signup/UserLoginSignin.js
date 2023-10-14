import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserLoginSignin.css';
import calimg from "./images/cartoon.png"

const UserLoginSignin = () => {
    let navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(true);  // Added state to control login form visibility
    const [showSignup, setShowSignup] = useState(false);

    // LOGIN API.
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
            });
            const json = await response.json()
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                toast.success("Logged In Successfully");
                navigate("/user/home");
            }
            else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.log("Hello");
            toast.error("Something went wrong");
        }
    }

    // SIGNUP API.
    const [signupCredentials, setSignupCredentials] = useState({ email: '', name: '', mobile: '', password: '' });
    const onChangeSignup = (e) => {
        setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupCredentials.password !== signupCredentials.confirmPassword) {
            console.log(credentials);
            toast.error("Passwords dont match");
            return
        }
        try {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: signupCredentials.name, email: signupCredentials.email, mobile: signupCredentials.mobile, password: signupCredentials.password })
            });
            const json = await response.json()
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                toast.success("Account Created Successfully");
                navigate("/user/home");
            }
            else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    // const [loginStyle, setLoginStyle] = useState('login-toggle');
    // const [signupStyle, setSignupStyle] = useState('signup-toggle');

    const toggleSignup = () => {
        console.log("Toggle to Signup");
        setShowLogin(false);
        setShowSignup(true);
    }

    const toggleLogin = () => {
        console.log("Toggle to Login");
        setShowLogin(true);
        setShowSignup(false);
    }


    return (
        <>
            <div className="form-modal">
                
                <div className="form-toggle">
                    <button id="" onClick={toggleLogin}>log in</button>
                    <button id="" onClick={toggleSignup}>sign up</button>
                </div>
                <div className='login-page-image'>
                    <div>
                    <img  className='calender-img' src={calimg}></img>
                    </div>
                {showLogin && (
                <div id="login-form">
                    <form onSubmit={handleLoginSubmit}>
                        <input type="email" name='email' onChange={onChange} defaultValue={loginCredentials.email} placeholder="Enter email" />
                        <input type="password" name='password' onChange={onChange} defaultValue={loginCredentials.password} placeholder="Enter password" />
                        <button type="submit" className="btn login">login</button>
                        {/* <hr /> */}
                        <p className='form-details'><Link to="">Forgotten account</Link></p>
                        
                    </form>
                </div>
                )}
                {showSignup && (
                <div id="signup-form">
                    <form onSubmit={handleSignupSubmit}>
                        <input type="email" name='email' defaultValue={signupCredentials.email} onChange={onChangeSignup} placeholder="Enter your email" />
                        <input type="text" name='name' defaultValue={signupCredentials.name} onChange={onChangeSignup} placeholder="Enter your name" />
                        <input type="number" name='mobile' defaultValue={signupCredentials.mobile} onChange={onChangeSignup} placeholder="Enter your mobile no." />
                        <input type="password" name='password' defaultValue={signupCredentials.password} onChange={onChangeSignup} placeholder="Create password" />
                        <input type="password" name='confirmPassword' defaultValue={signupCredentials.confirmPassword} onChange={onChangeSignup} placeholder="Confirm password" />
                        <button type="submit" className="btn signup">create account</button>
                        {/* <hr /> */}
                        <p className='form-details'>Clicking <strong>create account</strong> means that you are agree to our <Link to="">terms of services</Link>.</p>
                        {/* <hr /> */}
                    </form>
                </div>
                )}
            </div>
            </div>
        </>
    )
}

export default UserLoginSignin