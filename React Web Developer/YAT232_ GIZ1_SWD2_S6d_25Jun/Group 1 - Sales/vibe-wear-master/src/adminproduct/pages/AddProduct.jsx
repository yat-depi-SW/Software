import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [rate, setRate] = useState('');
    const [ratingCount, setRatingCount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !description || !category || !image || !rate || !ratingCount) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all the fields!",
            });
            return;
        }

        // Creating the new product object
        const newProduct = {
            id: Date.now().toString(),
            title,
            price: parseFloat(price),
            description,
            category,
            image,
            rating: {
                rate: parseFloat(rate),
                count: parseInt(ratingCount, 10),
            },
        };

        try {
            const response = await axios.post(process.env.VITE_PRODUCTS_API, newProduct);
            console.log('Product added:', response.data);

            Swal.fire({
                title: "Product Added",
                text: "Your product has been successfully added!",
                icon: "success",
            });

            setTitle('');
            setPrice('');
            setDescription('');
            setCategory('');
            setImage('');
            setRate('');
            setRatingCount('');
        } catch (err) {
            console.error('Error adding product:', err);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to add product. Please try again.",
            });

            setError('Failed to add product');
        }
    };

    return (
        <div className="pl-52">
            <div className="container mx-auto mt-8 border bg-gray-200 border-gray-400 p-4">
                <div className="flex items-center mb-6">
                    <Link to="/admin/admin-product" className="flex items-center text-blue-600 hover:underline mr-4">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-black text-2xl" />
                    </Link>
                    <h2 className="text-3xl font-bold">Add New Product</h2>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <TextField
                            id="product-name"
                            label="Product Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="product-price"
                            label="Product Price"
                            variant="outlined"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="product-category"
                            label="Product Category"
                            variant="outlined"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            id="product-description"
                            label="Product Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            id="product-image-url"
                            label="Product Image URL"
                            variant="outlined"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            fullWidth
                            helperText="Must start with Https://url"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <TextField
                            id="product-rate"
                            label="Product Rate"
                            variant="outlined"
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="rating-count"
                            label="Rating Count"
                            variant="outlined"
                            type="number"
                            value={ratingCount}
                            onChange={(e) => setRatingCount(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="flex justify-center items-center mt-8 mb-10">
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-lg transition duration-200 hover:bg-gray-800"
                        >
                            ADD NEW PRODUCT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
