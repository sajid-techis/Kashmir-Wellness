import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetailsThunk } from '../../features/products/productSlice';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.product.product);
    const status = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(getProductDetailsThunk(id));
    }, [id, dispatch]);

    if (status === 'Loading') {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (status === 'Failed') {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (status === 'Success' && product) {
        return (
            <div className="bg-gradient-to-b from-green-800 to-blue-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-5xl mx-auto mt-8 mb-20 px-4 sm:px-4 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-6 bg-gradient-to-r from-green-900 to-blue-800 rounded-3xl shadow-2xl p-6 md:p-8 pb-12 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                        
                        {/* Product Image */}
                        <div className="w-full sm:w-1/2 relative">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-xl"></div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-gray-100">
                            <h1 className="text-5xl font-extrabold mb-3 leading-tight tracking-wide drop-shadow-lg">
                                {product.name}
                            </h1>
                            <p className="text-lg mb-4 leading-relaxed drop-shadow-lg">
                                {product.description}
                            </p>

                            {/* Product Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                                <p>
                                    <strong className="block font-semibold text-gray-200">Price: </strong>
                                    <span className="text-yellow-400 text-2xl">${product.price}</span>
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Brand: </strong>
                                    {product.brand}
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Stock: </strong>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Expiration: </strong>
                                    {new Date(product.expirationDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Prescription: </strong>
                                    {product.prescriptionRequired ? 'Yes' : 'No'}
                                </p>
                            </div>

                            {/* Ratings */}
                            <div className="mt-6 flex items-center space-x-4 text-base">
                                <div className="bg-yellow-300 text-yellow-800 rounded-full px-4 py-2 shadow-lg backdrop-blur-md drop-shadow-lg">
                                    <strong className="font-semibold">Rating: </strong>{product.ratings.averageRating}
                                </div>
                                <p className="text-gray-300">
                                    <strong className="font-semibold">{product.ratings.numberOfRatings}</strong> reviews
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center transform hover:scale-110">
                                    <FaShoppingCart className="mr-2" /> Add to Cart
                                </button>
                                <button className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center transform hover:scale-110">
                                    <FaHeart className="mr-2" /> Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ProductDetails;
