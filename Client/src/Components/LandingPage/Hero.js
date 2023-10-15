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
                <h1 className="display-5 fw-bolder text-body-emphasis lh-1 mb-3">Your Path to Hassel-free Appointments Start Here.</h1>
                <p className="lead text-secondary">Streamlining Appointments for Clients and Service Providers. We're a thriving community where clients and professionals unite. With our intuitive platform, clients can find and connect with professionals across a wide range of industries. At the same time, professionals can leverage our tools to streamline their scheduling, enhance their visibility, and focus on what they do best.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" className="btn btn-lg px-4 me-md-2 text-white" style={{backgroundColor: '#9AA4EC', border: '1px solid black', fontWeight: 700}}>User Login</button>
                    <button type="button" className="btn btn-lg px-4 mx-4 text-white" style={{backgroundColor: '#9AA4EC', border: '1px solid black', fontWeight: 700}}>Admin Login</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Hero