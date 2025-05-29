import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-purple-200 to-pink-100  text-center px-4">
            <div>
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-2xl mt-4 text-gray-800">Page Not Found</p>
                <p className="text-gray-600 mt-2">Sorry, the page you are looking for doesn't exist or has been moved.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
