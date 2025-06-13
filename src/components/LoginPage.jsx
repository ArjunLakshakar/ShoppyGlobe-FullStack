import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '/favicon.png';
import { errorNotification, successNotification } from './hooks/NotificationService';
import { storeTokenWithExpiry } from './hooks/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://shoppyglobe-fullstack.onrender.com/login', formData);
      successNotification("Login Successful", "Welcome back! Happy shopping 🛍️");

      storeTokenWithExpiry(response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setFormData({ email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      errorNotification("Login Failed", "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200 gap-6">
      <div className="lg:w-3/5 w:2/5 hidden md:flex flex-col items-center justify-center p-10 text-center bg-purple-200 rounded-r-full shadow-lg gap-6 ">
        <div className='flex items-center justify-center  md:gap-4 lg:gap-8 2xl:gap-14'>
          <img src={logoImage} alt="ShoppyGlobe" className="md:w-24 lg:w-28 xl:w-32 2xl:w-40 mb-6" />
          <h1 className=" flex flex-col md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-purple-700">Welcome to <span className='bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent' style={{ fontFamily: 'Oleo Script, serif' }}> ShoppyGlobe</span></h1>
        </div>
        <p className="mt-4 text-lg lg:text-xl text-purple-600 max-w-md">
          Discover the best deals and shop with ease. Log in to explore your personalized shopping experience!
        </p>
      </div>

      <div className="w-full lg:w-2/5 md:w-3/5 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Welcome Back!</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            
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
                placeholder="Enter your password"
                required
              />
            
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-md text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-pink-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;








// import axios from 'axios';
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logoImage from '/favicon.png'; // Add your logo or relevant image in assets folder

// function LoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = React.useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/login', formData);
//       alert(response.data.message || "Login successful!");
//       localStorage.setItem('token', response.data.token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//       setFormData({ email: '', password: '' });
//       navigate('/');
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
//       {/* Left Side - Branding or Image */}
//       <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-10 text-center">
//         <img src={logoImage} alt="ShoppyGlobe" className="w-40 mb-6" />
//         <h1 className="text-4xl font-extrabold text-purple-700">Welcome to ShoppyGlobe</h1>
//         <p className="mt-4 text-lg text-purple-600 max-w-md">
//           Discover the best deals and shop with ease. Log in to explore your personalized shopping experience!
//         </p>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4">
//           <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Welcome Back!</h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-pink-500 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
