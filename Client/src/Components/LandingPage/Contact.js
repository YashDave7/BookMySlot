import React from 'react'
import Contact_img from '../../Pages/Landing-Page/Images/contact.png';

const Contact = () => {
  return (
    <div>
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
            <div className="col-md-10 mx-auto col-lg-6">
                <form className="p-4 p-md-5 bg-body-tertiary" style={{boxShadow: '0 0 5px grey'}}>
                <div className="form-floating mb-3" >
                    <input type="text" className="form-control" id="floatingName" placeholder="Enter Your Name" />
                </div>    
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="Enter Your Email"/>
                </div>
                <div className="form-floating mb-3">
                    <textarea className='form-control' placeholder="Enter Your Message" style={{height: 150}}/>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit" style={{backgroundColor: '#9AA4EC', border: '1px solid #9aa4ec', fontWeight: 700}}>Send Message</button>
                </form>
            </div>
            <div className="col-lg-6 text-center text-lg-start">
                <img src={Contact_img} alt='contactUs' width={500}/>
                <h1 className="display-5" style={{ fontSize: '4 rem', fontWeight: 'bolder', color: '#6b74b8' }}>
  Contact Us
</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Contact