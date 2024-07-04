import React, { useState } from 'react';
import Image from '../assets/Images/Login.jpg';
import Logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../Config/appwrite.js';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();  // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Create user
            const response = await account.create('unique()', email, password, name);
            console.log(response);

            // Update user preferences
            await account.updatePrefs({ name });

            alert('Registration successful');
            navigate('/login');  // Use navigate to redirect
        } catch (error) {
            console.error(error);
            if (error.code === 409) {
                alert('User already registered.');
            } else {
                navigate('/login');
            }
            
        }
    };

    return (
        <>
            <div className='w-full h-screen flex flex-col sm:flex-row bg-slate-200'>
                <div className='w-full sm:w-1/2 h-1/2 sm:h-full bg-black sm:flex hidden'>
                    <img src={Image} className='w-full h-full object-cover' alt='login' />
                </div>
                <div className='w-full sm:w-1/2 h-full flex justify-center items-center relative'>
                    <div className='w-full h-16 flex absolute top-0 left-0 p-4'>
                        <div className='w-44 h-16 flex'>
                            <img src={Logo} className='w-full h-full object-cover' alt='LOGO' />
                        </div>
                    </div>
                    <div className='w-full h-full sm:h-3/4 flex justify-center items-center flex-col'>
                        <div className='text-4xl font-serif font-medium mb-8'>Register</div>
                        <form className='w-3/4 max-w-sm flex flex-col' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Name'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700'
                            >
                                Register
                            </button>
                        </form>
                        <div className='mt-4'>
                            <Link to='/login' className='text-blue-500 hover:underline'>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
