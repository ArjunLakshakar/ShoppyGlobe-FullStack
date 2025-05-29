import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faShippingFast, faMoneyBillWave, faGift, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const data = [{
        heading: "Free Shipping",
        para: "For all Orders Over $100",
        icon: faShippingFast
    },
    {
        heading: "Money Back Guarantee",
        para: "30 Days Money Back Guarantee",
        icon: faMoneyBillWave
    },
        , {
        heading: "Special Gifts",
        para: "Contact us Anytime",
        icon: faGift
    }, {
        heading: "24/7 Support",
        para: "Dedicated 24/7 Support",
        icon: faHeadset
    }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="min-h-[90vh] bg-gradient-to-r from-purple-300 to-pink-100 flex flex-col-reverse sm:flex-row items-center justify-between px-4 md:px-16 py-12 overflow-hidden relative">
                <img src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png" alt="Sparkle" className="w-10 h-10 xs:w-12 xs:h-12  md:w-16 md:h-16 absolute top-10 right-6 md:right-16 animate-bounce opacity-70" />
                <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Heart" className="w-8 h-8 md:w-10 md:h-10 absolute bottom-6 left-4 md:left-8 animate-bounce opacity-70" />

                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left space-y-6 z-10 mb-5">
                    <span className="inline-block bg-yellow-300 text-yellow-900 text-sm md:text-md px-4 py-1 rounded-full font-semibold tracking-wide shadow-sm">
                        🔥 Trending Now
                    </span>
                    <h1 className="text-2xl sm:text-2xl lg:text-5xl font-extrabold text-pink-700 uppercase tracking-wider">
                        Limited Time Offer
                    </h1>
                    <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Flat 30% Off On Fashion
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-xl text-gray-700 font-medium">
                        Prices starting from <span className="font-bold text-gray-900">$19.99</span>
                    </p>
                    <button onClick={() => navigate('/products')} className="inline-block bg-pink-600 hover:bg-pink-500 text-white text-base md:text-lg font-semibold px-4 md:px-8 py-2 md:py-3 rounded-full transition duration-300 shadow-lg hover:shadow-2xl">
                        Shop Now
                    </button>
                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start text-sm sm:text-base text-gray-700">
                        <div className="flex items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" alt="Delivery" className="w-6 h-6 sm:w-7 sm:h-7" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="Secure" className="w-6 h-6 sm:w-7 sm:h-7" />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>

                {/* Image Section */}

                <div className="sm:w-1/2 flex justify-center items-center z-10">
                    <img
                        src="/img/modal.png"
                        alt="Fashion"
                        className="w-full max-w-md sm:max-w-4xl rounded-xl transition-transform duration-500 hover:scale-105 object-contain"
                    />
                </div>

            </div>


            {/* Feature Cards */}
            <section className='p-6 bg-pink-100'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {["/img/watch.png", "/img/bag.png", "/img/band.png"].map((img, idx) => (
                        <div key={idx} className='flex flex-col sm:flex-row items-center p-4 gap-4 md:gap-8 rounded-2xl text-white shadow-md h-auto' style={{ backgroundColor: ["#6a4196", "#c83236", "#7c9474"][idx] }}>
                            <div className='w-full sm:w-1/3 flex justify-center items-center p-2'>
                                <img src={img} alt='Product' className='h-40 sm:h-52 w-auto transition-transform duration-500 transform scale-100 hover:scale-110' />
                            </div>
                            <div className='flex flex-col gap-2 sm:gap-4 text-center sm:text-left'>
                                <h3 className='text-xl sm:text-3xl md:text-4xl font-bold'>
                                    {["Smart Digital Watch", "Leather Handbag", "Fitness Tracker Band"][idx]}
                                </h3>
                                <p className='text-lg sm:text-2xl md:text-3xl'>Starting at <span className='font-bold'>${["39.99", "9.00", "19.29"][idx]}</span></p>
                                <Link to="/products" state={{ label: ["Watch", "Handbag", "Fitness Tracker Band"][idx] }} className='inline-flex items-center justify-center sm:justify-start text-base sm:text-xl md:text-2xl text-white hover:underline'>Shop Now <span className='ml-1'>&rarr;</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Categories Section */}
            <section className='p-6 md:p-8 bg-gray-50'>
                <h2 className='text-2xl md:text-3xl font-bold text-center text-gray-700 mb-6'>Shop by Category</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center'>
                    {[{ label: "Shirt", img: "/img/t-shirts.avif" }, { label: "Dress", img: "/img/dresses.png" }, { label: "Watch", img: "/img/watch2.jpg" }, { label: "Sneakers", img: "/img/Sneakers.jpg" }, { label: "Sunglasses", img: "/img/glasses.jpg" }].map((cat, i) => (
                        <Link to="/products" state={{ label: cat.label }} key={i} className="bg-purple-200 shadow-md p-3 rounded-lg hover:shadow-lg transition-transform hover:rotate-3">
                            <img src={cat.img} alt={cat.label} className="w-full h-40 sm:h-60 object-cover mx-auto mb-2 rounded-md" />
                            <p className="text-gray-700 font-medium text-sm sm:text-base">{cat.label}</p>
                        </Link>
                    ))}
                </div>
            </section>


            {/* Info Section */}
            <section className='flex flex-col sm:flex-row flex-wrap bg-blue-500 p-6 rounded-lg shadow-md justify-around mx-4 sm:mx-8 my-8 gap-6'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left'>
                        <FontAwesomeIcon icon={item.icon} className='text-white text-3xl sm:text-4xl' />
                        <div className='flex flex-col'>
                            <h3 className='text-lg sm:text-xl font-semibold text-gray-100'>{item.heading}</h3>
                            <p className='text-sm sm:text-base text-gray-100'>{item.para}</p>
                        </div>
                    </div>
                ))}
            </section>


            {/* Testimonials Section */}
            <section className='p-6 md:p-8 bg-pink-100'>
                <h2 className='text-2xl md:text-3xl font-bold text-center text-gray-700 mb-6'>What Our Clients Say..</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {[{
                        name: "Arjun Lakshakar",
                        text: "The quality is amazing. Got my dress in 2 days! It fits perfectly and the fabric feels premium. Definitely shopping again!",
                        rating: 5,
                        img: "/img/user1.jpg"
                    }, {
                        name: "Aaman P.",
                        text: "Excellent service and fast delivery. Their support team resolved my issue in minutes. Very satisfied with the purchase!",
                        rating: 4,
                        img: "/img/user2.jpg"
                    }, {
                        name: "Pranav G.",
                        text: "Love the trendy collections every season! I always find something new and exciting. Great prices and style.",
                        rating: 5,
                        img: "/img/user3.jpg"
                    }].map((review, i) => (
                        <div key={i} className='bg-gray-100 p-6 rounded-lg shadow text-center italic'>
                            {/* <img src={review.img} alt={review.name} className='w-12 h-12 mx-auto rounded-full mb-4' /> */}

                            <p className='italic mb-2'>"{review.text}"</p>
                            <div className='text-yellow-500 text-lg mb-2'>
                                {"⭐".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </div>
                            <p className='font-semibold text-gray-800'>{review.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default LandingPage;