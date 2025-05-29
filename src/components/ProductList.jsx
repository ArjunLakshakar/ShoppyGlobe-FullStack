import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import ProductItem from "./ProductItem";
import { useLocation, useParams } from "react-router-dom";
import useFetchProducts from "./hooks/useFetchProducts";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const Api = "https://dummyjson.com/products?limit=1000";
  const { products, categories, error } = useFetchProducts(Api);

  useEffect(() => {
    if (location.state?.label) {
      setSearchQuery(location.state.label);
    }
    window.scrollTo(0, 0);
  }, [location.state]);


  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  // Filter products based on selected category and search query
  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto mb-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 font-serif"
        >PRODUCT CATALOG</h1>

        {/* Category & Search Filter */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-60 px-4 py-2 rounded-full focus:outline-none text-xl border-2 border-white"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 md:w-40 focus:outline-none text-xl border-2 border-white rounded-full"
          />
        </div>

        {/* Discount Banner Card */}
        <div className="bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 rounded-lg shadow-md p-6 flex flex-col xs:flex-row items-center justify-between mb-8 gap-3">
          <div>
            <h2 className="sm:text-3xl  md:text-5xl text-3xl font-bold text-red-600 mb-2">Get 30% OFF !</h2>
            <p className="text-gray-700 text:lg sm:text-xl md:text-2xl">Enjoy a 30% discount on all prepaid purchases. Hurry up! 🛍️</p>
          </div>
          <img
            src="./img/BagIcon.png"
            alt="Discount Offer"
            className="sm:w-36 sm:h-36 w-28 h-28 mt-4 md:mt-0  "
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mb-4 text-xl font-semibold">
            Failed to load products: {error}
          </p>
        )}


        {/* Product Grid */}
        {!error && (
          filtered.length !== 0 ?
            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 llg:grid-cols-4 gap-6">
              {filtered.map(product => (
                <ProductItem product={product} key={product.id} onAddToCart={handleAddToCart} />
              ))}
            </div>
            :
            <div className=" text-center text-gray-500 text-xl italic mt-10">
              No products found matching your search.
            </div>
        )}

      </div>
    </div>
  );
};

export default ProductList;
