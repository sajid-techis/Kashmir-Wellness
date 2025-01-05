import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetailsThunk } from '../../features/products/productSlice';
import { addItemToCartThunk, getCartItemsThunk, updateCartItemThunk, removeItemFromCartThunk } from '../../features/carts/cartSlice';
import { FaShoppingCart, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector((state) => state.product.product);
    const status = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);
    const { token } = useSelector((state) => state.user);
    const items = useSelector((state) => state.cart.items);

    const [quantity, setQuantity] = useState(0);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        dispatch(getProductDetailsThunk(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (items && product) {
            const cartItem = items.find((item) => item.productId._id === product._id);
            if (cartItem) {
                setInCart(true);
                setQuantity(cartItem.quantity);
            } else {
                setInCart(false);
                setQuantity(0);
            }
        }
    }, [items, product]);

    const handleAddToCart = async () => {
        if (!token) {
            navigate('/login');
        } else {
            await dispatch(addItemToCartThunk({ productId: product._id, quantity: 1 })).unwrap();
            dispatch(getCartItemsThunk());
            setQuantity(1);
            setInCart(true);
        }
    };

    const handleIncreaseCart = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await dispatch(updateCartItemThunk({ productId: product._id, quantity: newQuantity })).unwrap();
    };

    const handleDecreaseQuantity = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            await dispatch(updateCartItemThunk({ productId: product._id, quantity: newQuantity })).unwrap();
        } else {
            await dispatch(removeItemFromCartThunk({ productId: product._id })).unwrap();
            setQuantity(0);
            setInCart(false);
        }
    };

    if (status === 'Loading') {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (status === 'Failed') {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (status === 'Success' && product) {
        // Slider settings
        const settings = {
            dots: true,
            arrows: false,
            infinite: product.imageUrl.length > 1,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };

        // Extracting price, stock, and expiration date from the first batch
        const price = product.batches[0]?.price || 0;
        const stock = product.batches[0]?.stock || 0;
        const expirationDate = new Date(product.batches[0]?.expirationDate).toLocaleDateString();

        return (
            <div className="bg-gradient-to-b from-green-800 to-blue-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-5xl mx-auto mt-8 mb-20 px-4 sm:px-4 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-6 bg-gradient-to-r from-green-900 to-blue-800 rounded-3xl shadow-2xl p-6 md:p-8 pb-12 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                        {/* Product Image Slider */}
                        <div className="w-full sm:w-1/2 relative">
                            <Slider {...settings}>
                                {product.imageUrl.length > 0 ? (
                                    product.imageUrl.map((image, index) => (
                                        <div key={index}>
                                            <img 
                                                src={image} 
                                                alt={product.name} 
                                                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <img
                                        src="/path/to/placeholder-image.jpg"
                                        alt="No image available"
                                        className="w-full h-auto object-cover rounded-xl shadow-lg"
                                    />
                                )}
                            </Slider>
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
                                    <span className="text-yellow-400 text-2xl">₹{price.toFixed(2)}</span>
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Brand: </strong>
                                    {product.brand}
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Stock: </strong>
                                    {stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>
                                <p>
                                    <strong className="block font-semibold text-gray-200">Expiration: </strong>
                                    {expirationDate}
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
                                {inCart ? (
                                    <div className="flex items-center">
                                        <button 
                                            onClick={handleDecreaseQuantity} 
                                            className="bg-red-500 text-white px-3 py-2 rounded-full mr-2"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="text-lg text-gray-100">{quantity}</span>
                                        <button 
                                            onClick={handleIncreaseCart} 
                                            className="bg-green-600 text-white px-3 py-2 rounded-full ml-2"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleAddToCart} 
                                        className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
                                    >
                                        <FaShoppingCart className="mr-2" /> Add to Cart
                                    </button>
                                )}
                                <button className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
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
