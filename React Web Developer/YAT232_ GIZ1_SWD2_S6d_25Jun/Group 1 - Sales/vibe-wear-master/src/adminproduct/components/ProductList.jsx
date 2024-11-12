import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(process.env.VITE_PRODUCTS_API); 
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/admin-product/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(process.env.VITE_PRODUCTS_API + `/${id}`); 

            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            console.log(`Product with id ${id} deleted`);
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Error deleting product: ' + error.message);
        }
    };

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
    if (products.length === 0) return (
        <div className="text-center mt-4">
            <h2 className="text-2xl font-bold mb-4">No products available.</h2>
            <Link
                to="/admin/admin-product/add-product"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
                Add A New Product
            </Link>
        </div>
    );

    return (
        <div className="pl-52">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
          <div className="text-center mb-4">
            <Link
              to="/admin/admin-product/add-product"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add A New Product
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-10 py-4 text-left text-gray-600 font-bold w-1/3">Product</th>
                  <th className="px-10 py-4 text-right text-gray-600 font-bold w-1/3">Price</th>
                  <th className="px-10 py-4 text-center text-gray-600 font-bold w-1/3">Operators</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-200">
                    <td className="px-10 py-4">{product.title}</td>
                    <td className="px-10 py-4 text-right">${product.price}</td>
                    <td className="px-10 py-4 text-center space-x-2">
                      <Link to={`/admin/admin-product/view-product/${product.id}`}>
                        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
                          View
                        </button>
                      </Link>
                      <Link to={`/admin/admin-product/edit-product/${product.id}`}>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      );
};

export default ProductList;
