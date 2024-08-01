// components/ProductDetails.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetailsThunk } from '../../features/products/productSlice';

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
        return <p>Loading...</p>;
    }

    if (status === 'Failed') {
        return <p>Error: {error}</p>;
    }

    if (status === 'Success' && product) {
        return (
            <div className="w-full max-w-7xl mx-auto my-16 px-4">
                <div className="flex flex-col md:flex-row">
                    <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/3 rounded-lg" />
                    <div className="md:ml-8">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-lg mt-2">{product.description}</p>
                        <p className="text-lg mt-2"><strong>Brand:</strong> {product.brand}</p>
                        <p className="text-lg mt-2"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-lg mt-2"><strong>Stock:</strong> {product.stock}</p>
                        <p className="text-lg mt-2"><strong>Expiration Date:</strong> {new Date(product.expirationDate).toLocaleDateString()}</p>
                        <p className="text-lg mt-2"><strong>Prescription Required:</strong> {product.prescriptionRequired ? 'Yes' : 'No'}</p>
                        <p className="text-lg mt-2"><strong>Average Rating:</strong> {product.ratings.averageRating}</p>
                        <p className="text-lg mt-2"><strong>Number of Ratings:</strong> {product.ratings.numberOfRatings}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ProductDetails;
