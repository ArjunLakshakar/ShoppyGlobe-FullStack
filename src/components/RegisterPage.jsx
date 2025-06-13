import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from './hooks/NotificationService';
import logoImage from '/favicon.png';


function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://shoppyglobe-fullstack.onrender.com/register', formData);
      successNotification("Registration Successful", "Your account has been created! 🎉");
      setFormData({ username: '', email: '', password: '' }); // Clear form
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      errorNotification("Registration Failed", "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex  bg-gradient-to-r from-pink-100 to-purple-200 ">
      {/* Left Side - Form */}
      <div className="w-full md:w-2/4  flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Create Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <label className=" block text-sm font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your name"
              required
            />


            <label className="block text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
              required
            />

            <label className="block text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Create a password"
              required
            />

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-md text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Welcome */}
      <div className="hidden md:flex w-2/4 flex-col items-center justify-center p-10 text-center bg-purple-200 rounded-l-full shadow-lg gap-6">
        <div className="flex flex-col items-center gap-6">
          <div className='flex items-center justify-center  md:gap-4 lg:gap-8 2xl:gap-14'>
            <img src={logoImage} alt="ShoppyGlobe" className="md:w-24 lg:w-28 xl:w-32 2xl:w-36" />
            <h1 className="flex flex-col md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-purple-700 ">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Oleo Script, serif' }}>
                ShoppyGlobe
              </span>
            </h1>
          </div>
          <p className="mt-4 text-lg lg:text-xl text-purple-600 max-w-lg">
            Discover the best deals and shop with ease. Register to explore your personalized shopping experience!
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
