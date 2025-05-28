import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';
import store from './redux/store';

// Lazy-loaded components
const Home = lazy(() => import('./components/HomePage/LandingPage'));
const ProductDetail = lazy(() => import('./components/ProductDetails'));
const CheckOut = lazy(() => import('./components/CheckOut'));
const OrderPage = lazy(() => import('./components/OrderPage'));
const NotFound = lazy(() => import('./components/NotFound'));
const Product = lazy(() => import('./components/ProductList'));
const Cart = lazy(() => import('./components/Cart'));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Suspense fallback={<div className="text-center mt-10 text-gray-500 min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productDetails/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/orderHistory" element={<OrderPage />} />
            <Route path="/products" element={<Product />} />
            {/* <Route path="/products/:id" element={<Product />} /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Header from './components/Header'
// import { Outlet } from 'react-router-dom'
// import { Footer } from './components/Footer'
// import { Provider } from 'react-redux'
// import store from './redux/store'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Provider store={store}>
//       <Header />
//       <Outlet />
//       <Footer/>
//       </Provider>
//     </>
//   )
// }

// export default App
