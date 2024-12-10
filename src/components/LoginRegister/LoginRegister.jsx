import React, { useState } from 'react';
import './LoginRegister.css';
import MainPage from '../../pages/MainPage';
import { Link } from 'react-router-dom';

const LoginRegister = () => {

     const [action, setAction] = useState('');

     const registerLink = () => {
         setAction(' active');
     };
     const loginLink = () => {
         setAction('');

     };
     return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form action=''>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' required />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                    </div>

                    <div className='remember-forgot'>
                        <label><input type='checkbox' />Remember Me</label>
                        <a href='#'>Forgot Password</a>
                    </div>
                    {/* <Link to={MainPage}> */}
                    <button type='submit' onClick={() => window.location.href = 'pages/MainPage.js'}>Login</button>
                    {/* </Link> */}
                    {/* <Link to={"./mainpage"}>Login</Link> */}
                    <div className='register-link'>
                        <p>Don't have an account? <a href='#' onClick=
                        {registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form action=''>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' required />
                    </div>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' required />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                    </div>

                    <div className='remember-forgot'>
                        <label><input type='checkbox' />I agree to the terms & conditions</label>
                    </div>

                    <button type='submit'>Register</button>
                    
                    <div className='register-link'>
                        <p>Already have an account? <a href='#' onClick=
                        {loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
     )
}
export default LoginRegister