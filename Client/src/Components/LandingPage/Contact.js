import React from 'react'
import Contact_img from '../../Pages/Landing-Page/Images/contact.png';

const Contact = () => {
    return (
        <div>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-10 mx-auto col-lg-6">
                        <form action="mailto:dhamanagebasavraj@gmail.com" method="post" enctype="text/plain" className="p-4 p-md-5 bg-body-tertiary" style={{ boxShadow: '0 0 5px grey' }}>
                            <div className="form-floating mb-3" >
                                <input type='text' name="Name" className="form-control" placeholder="Enter Your Name" />
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" name="Email" className="form-control" placeholder="Enter Your Email" />
                            </div>
                            <div className="form-floating mb-3">
                                <textarea name="YourMessage" className='form-control' placeholder="Enter Your Message" style={{ height: 150 }} />
                            </div>

                            <input type="submit" name="" className='py-2 text-center form-control text-white' style={{ backgroundColor: '#9AA4EC', border: '1px solid #9aa4ec', fontWeight: 700, borderRadius: '5px', cursor: 'pointer' }} />

                        </form>
                    </div>
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="display-5" style={{ fontSize: '4 rem', fontWeight: 'bolder', color: 'black' }}>
                            Contact Us
                        </h1>
                        <img src={Contact_img} alt='contactUs' width={500} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact