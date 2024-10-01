import React, { useState } from 'react';

const CustomSelect = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative mb-4">
            <label className="block text-gray-200 mb-1">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300 flex justify-between items-center"
            >
                <span>{value || 'Select an option'}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m-4 12V5" />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-gray-800 shadow-lg">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer hover:bg-blue-600 p-2 text-gray-200 transition duration-200"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
