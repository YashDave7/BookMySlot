import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import './UserLoginSignin.css';

const ProfessionalLogin = () => {
    let navigate = useNavigate();

    // REGISTER API.
    const [registerCredentials, setRegisterCredentials] = useState({ email: '', name: '', mobile: '', profession: '', specialisation: '', age: '', gender: '', address: '', city: '', fees: '', timing: '', password: '' });
    const onChangeRegister = (e) => {
        setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (registerCredentials.password !== registerCredentials.confirmPassword) {
            console.log(credentials);
            toast.error("Passwords dont match");
            return
        }
        try {
            const response = await fetch(`http://localhost:5000/api/authProfessional/createprofessional`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: registerCredentials.email, name: registerCredentials.name, mobile: registerCredentials.mobile, profession: registerCredentials.profession, specialisation: registerCredentials.specialisation, age: registerCredentials.age, gender: registerCredentials.gender, address: registerCredentials.address, city: registerCredentials.city, fees: registerCredentials.fees, timing: registerCredentials.timing, password: registerCredentials.password })
            });
            const json = await response.json()
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                navigate("/professional/home");
                toast.success("Account Created Successfully");
            }
            else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }


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
            const json = await response.json()
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
    }

    const toggleLogin = () => {
        console.log("Toggle to Login");
    }
    return (
        <>
            <div className="form-modal">
                <div className="form-toggle">
                    <button id="" onClick={toggleLogin}>log in</button>
                    <button id="" onClick={toggleRegister}>Register</button>
                </div>
                <div id="login-form">
                    <form onSubmit={handleLoginSubmit}>
                        <input type="email" name='email' onChange={onChangeLogin} defaultValue={loginCredentials.email} placeholder="Enter email" />
                        <input type="password" name='password' onChange={onChangeLogin} defaultValue={loginCredentials.password} placeholder="Enter password" />
                        <button type="submit" className="btn login">login</button>
                        <p><Link to="">Forgotten account</Link></p>
                        <hr />
                    </form>
                </div>
                <div id="signup-form">
                    <form onSubmit={handleRegisterSubmit}>
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
                        <button type="submit" className="btn signup">create account</button>
                        <p>Clicking <strong>create account</strong> means that you are agree to our <Link to="">terms of services</Link>.</p>
                        <hr />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfessionalLogin