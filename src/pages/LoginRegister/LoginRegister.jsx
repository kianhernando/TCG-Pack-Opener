import React, { useState } from 'react';
import './LoginRegister.css';
import MainPage from '../MainPage/MainPage';
import { Link } from 'react-router-dom';
import { supabase } from '../../auth/supabaseClient';
import { useMusicController } from '../../controllers/MusicController';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    // ADD STATES FOR FORM INPUT
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const { playMusic } = useMusicController();

    // INPUT HANDLER
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // LOGIN HANDLER
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) throw error;
            
            // Store user session data
            const { data: { user } } = await supabase.auth.getUser()
            console.log('Logged in user:', user);
            
            // Redirect to main page or handle successful login
            window.location.href = '/main';
        } catch (error) {
            console.error('Login error:', error.message);
            alert(error.message);
        }
    };

    // REGISTER HANDLER
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                    }
                }
            });
            if (error) {
                console.error('Registration error:', error.message);
                alert(error.message);
                return;
            }
            
            if (data?.user) {
                console.log('Registration successful:', data.user);
                setShowNotification(true);
                setFormData({
                    email: '',
                    password: '',
                    username: ''
                });
                setTimeout(() => setShowNotification(false), 5000);
            }
        } catch (error) {
            console.error('Registration error:', error.message);
            alert('An unexpected error occurred during registration.');
        }
    };

    const registerLink = () => {
        setAction(' active');
    };
    const loginLink = () => {
        setAction('');
    };
    return (
        <>
            {showNotification && (
                <div className="email-notification">
                    Please check your email to confirm your registration!
                </div>
            )}
            <div className={`wrapper${action}`}>
                <div className='form-box login'>
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input 
                                type='email' 
                                name='email'
                                placeholder='Email' 
                                required 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='password' 
                                name='password'
                                placeholder='Password' 
                                required 
                                onChange={handleChange}
                            />
                        </div>

                        <div className='remember-forgot'>
                            <label><input type='checkbox' />Remember Me</label>
                            <a href='#'>Forgot Password</a>
                        </div>

                        <button type='submit'>Login</button>

                        <div className='register-link'>
                            <p>Don't have an account? <a href='#' onClick=
                            {registerLink}>Register</a></p>
                        </div>
                    </form>
                </div>

                <div className='form-box register'>
                    <form onSubmit={handleRegister}>
                        <h1>Register</h1>
                        <div className='input-box'>
                            <input 
                                type='text' 
                                name='username'
                                placeholder='Username' 
                                required 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='email' 
                                name='email'
                                placeholder='Email' 
                                required 
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='password' 
                                name='password'
                                placeholder='Password' 
                                required 
                                onChange={handleChange}
                            />
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
        </>
    )
}


export default LoginRegister;