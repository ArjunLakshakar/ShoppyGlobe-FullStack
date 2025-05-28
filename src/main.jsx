import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/HomePage/LandingPage.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Cart from './components/Cart.jsx'
import OrderPage from './components/OrderPage.jsx'
// import CheckOut from './components/CheckOut.jsx'
import NotFound from './components/NotFound.jsx'

// const appRoutes = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <LandingPage />,
//       }, {
//         path: '/products',
//         element: <ProductList />
//       }, {
//         path: '/productDetails/:id',
//         element: <ProductDetails />
//       }, {
//         path: '/cart',
//         element: <Cart />
//       }, {
//         path: '/orderHistory',
//         element: <OrderPage />
//       },
//       {
//         path: '/checkout',
//         element: <CheckOut />
//       }
//     ],
//     errorElement: <NotFound />,
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={appRoutes} /> */}
    <App />
  </StrictMode>)
