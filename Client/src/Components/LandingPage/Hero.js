import React from 'react'
import Hero_img from '../../Pages/Landing-Page/Images/Hero.png';

const Hero = () => {
  return (
    <div>
        <div className="container col-xxl-8 px-2 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src={Hero_img} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
            </div>
            <div className="col-lg-6">
            <h1 className="display-5" style={{ fontSize: '4rem', fontWeight: 'bolder', color: '#6b74b8' }}>
  Your Path to Hassle-free Appointments Starts Here!
</h1>
<br />
                <p className="lead text-secondary">Connecting Clients and Professionals. Streamlined scheduling and enhanced visibility for seamless collaboration.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" className="btn btn-lg px-4 me-md-2 text-white" style={{backgroundColor: '#9AA4EC', border: '1px solid #9AA4EC ', fontWeight: 700}}>User Login</button>
                    <button type="button" className="btn btn-lg px-4 mx-4 text-white" style={{backgroundColor: '#9AA4EC', border: '1px solid #9AA4EC', fontWeight: 700}}>Admin Login</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}


export default Hero