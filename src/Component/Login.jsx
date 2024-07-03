import React, { useState } from 'react';
import Image from '../assets/Images/Login.jpg';
import Logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../Config/appwrite.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(email, password);
            alert('Login Successful');
            navigate('/home');
        } catch (error) {
            console.log('Login Failed:', error);
            if (error.code === 401) {
                alert('Invalid credentials. Please try again.');
            } else {
                alert(`Login failed: ${error.message}`);
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
                        <div className='text-4xl font-serif font-medium mb-8'>Login</div>
                        <form className='w-3/4 max-w-sm flex flex-col' onSubmit={handleLogin}>
                            <input
                                type='email'
                                placeholder='Email'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                className='p-2 mb-4 border border-gray-300 rounded-md'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700'
                            >
                                Login
                            </button>
                        </form>
                        <div className='mt-4'>
                            <Link to='/register' className='text-blue-500 hover:underline'>
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
