import React from 'react'

const Banner = () => {
    return (
        <div className="flex flex-col xs:flex-row items-center justify-between bg-gradient-to-r from-green-100 to-blue-100 rounded-lg md:p-10 p-4 shadow mb-8 gap-4 xs:gap-0">
            <div>
                <h2 className="md:text-4xl xs:text-2xl font-semibold text-green-800">🎉 Free Delivery & 30% OFF!</h2>
                <p className="md:text-xl text-md text-gray-700 mt-1">
                    Get <strong>Free Delivery</strong> on orders above <strong>$100</strong> and enjoy
                    <strong> 30% Discount</strong> on payments via Card or UPI.
                </p>
            </div>
            <img
                src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                alt="Promotions"
                className="md:w-28 md:h-28  w-20 h-20 animate-bounce"
            />
        </div>
    )
}

export default Banner;
