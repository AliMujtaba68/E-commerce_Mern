import React from 'react';

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <p className="text-lg text-gray-600 mb-4">
                    <strong className="font-semibold text-gray-800">Phone:</strong> +1 234 567 8901
                </p>
                <p className="text-lg text-gray-600">
                    <strong className="font-semibold text-gray-800">Address:</strong> 123 Main Street, Karachi, Pakistan
                </p>
            </div>
        </div>
    );
};

export default Contact;
