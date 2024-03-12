import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserLoginSignin.css';
import calimg from "./images/cartoon.png"
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

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

    const onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Login Successful! User: ', profile);
        toast.success("Logged In Successfully");
        navigate("/user/home");
        // Here, you might want to do something like send the user data to your backend for authentication
    };

    const onFailure = (error) => {
        console.log('Login Failed!', error);
    };

    // const login = async (code) => {
    //     return fetch('/api/auth/google', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ code }),
    //     }).then((res) => {
    //         if (res.ok) {
    //             return res.json();
    //         } else {
    //             return Promise.reject(res);
    //         }
    //     });
    // };

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

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '85252673721-94ig6ugsoribq0cg4auieqppn6o9ar79.apps.googleusercontent.com',
                scope: ''
            })
        };

        gapi.load('client:auth2', start);
    });


    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <>
            <div className="form-modal" style={{ textAlign: 'center' }}>

                <div className="form-toggle" style={{ marginBottom: '20px' }}>
                    <button style={{ padding: '10px', backgroundColor: '#3498db', color: '#fff', cursor: 'pointer', marginRight: '10px' }} onClick={toggleLogin}>Log In</button>
                    <button style={{ padding: '10px', backgroundColor: '#2ecc71', color: '#fff', cursor: 'pointer' }} onClick={toggleSignup}>Sign Up</button>
                </div>

                <div className='login-page-image' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <img className='calender-img' src={calimg} height={"530px"} alt="Calendar" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                    </div>

                    {showLogin && (
                        <div id="login-form" style={{ marginLeft: '20px' }}>
                            <form onSubmit={handleLoginSubmit}>
                                <input type="email" name='email' onChange={onChange} defaultValue={loginCredentials.email} placeholder="Enter email" style={{ marginBottom: '10px', padding: '8px' }} />
                                <input type="password" name='password' onChange={onChange} defaultValue={loginCredentials.password} placeholder="Enter password" style={{ marginBottom: '10px', padding: '8px' }} />
                                <button type="submit" className="btn login" style={{ backgroundColor: '#3498db', color: '#fff', padding: '10px', cursor: 'pointer', marginTop: '10px' }}>Login</button>
                                <p className='form-details' style={{ marginTop: '10px' }}><Link to="">Forgotten account</Link></p>
                                <GoogleLogin
                                    clientId="85252673721-94ig6ugsoribq0cg4auieqppn6o9ar79.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-login-button">
                                            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" className="google-icon" />
                                            <span className="google-text">Sign in with Google</span>
                                        </button>
                                    )}
                                />

                            </form>
                        </div>
                    )}

                    {showSignup && (
                        <div id="signup-form" style={{ marginLeft: '20px' }}>
                            <form onSubmit={handleSignupSubmit}>
                                <input type="email" name='email' defaultValue={signupCredentials.email} onChange={onChangeSignup} placeholder="Enter your email" style={{ marginBottom: '10px', padding: '8px' }} />
                                <input type="text" name='name' defaultValue={signupCredentials.name} onChange={onChangeSignup} placeholder="Enter your name" style={{ marginBottom: '10px', padding: '8px' }} />
                                <input type="number" name='mobile' defaultValue={signupCredentials.mobile} onChange={onChangeSignup} placeholder="Enter your mobile no." style={{ marginBottom: '10px', padding: '8px' }} />
                                <input type="password" name='password' defaultValue={signupCredentials.password} onChange={onChangeSignup} placeholder="Create password" style={{ marginBottom: '10px', padding: '8px' }} />
                                <input type="password" name='confirmPassword' defaultValue={signupCredentials.confirmPassword} onChange={onChangeSignup} placeholder="Confirm password" style={{ marginBottom: '10px', padding: '8px' }} />
                                <button type="submit" className="btn signup" style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px', cursor: 'pointer', marginTop: '10px' }}>Create Account</button>
                                <p className='form-details' style={{ marginTop: '10px' }}>Clicking <strong>create account</strong> means that you agree to our <Link to="">terms of services</Link>.</p>
                                <div className="g-signin2" data-onsuccess="onSignIn" style={{ marginTop: '10px' }}></div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>

    )
}

export default UserLoginSignin