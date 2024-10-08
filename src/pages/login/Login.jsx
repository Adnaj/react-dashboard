import React from 'react'
import './login.css';
import { images } from '../../assets/images'
import Header from '../../components/header/Header'


function Login() {
  return (
    <div className='login-page'>
      <Header className="absolute w-full top-[30px]" />
      <div className=" flex login-container">
        {/* Left Section */}
        <div className="w-[45%] login-left flex items-center justify-center lg:pt-[70px]">
          <div className='max-w-[55%]'> 
          <img className='w-full max-w-[469px]   h-auto' src={images.Loginbg} alt="" />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-[55%] bg-white flex items-center justify-center lg:pt-[70px]">
          <div className="">
            <div className='login-head'>
              <h4 >Login</h4>
              <h2>Welcome Back !</h2>
            </div>

            <form className="space-y-5 login-form">
              {/* Email Field */}
              <div className='relative'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  User name
                </label>
                <input
                  type="text"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                />
                <img className='input-svg' src={images.EmailIcon} alt="" />
              </div>

              {/* Password Field */}
              <div className='relative'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="password"
                />
                <img className='input-svg' src={images.PassIcon} alt="" />
              </div>

              {/* Login Button */}
              <div>
                <button
                  type="submit"
                  className="w-full  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 mt-[10px]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
