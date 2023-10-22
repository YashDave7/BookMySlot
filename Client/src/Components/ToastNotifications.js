import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ToastNotifications = () => {
    return (
        <>
            <ToastContainer position="bottom-center" theme="colored" autoClose={3000} />
        </>
    )
}

export default ToastNotifications