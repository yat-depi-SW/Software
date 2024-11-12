import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(process.env.VITE_PRODUCTS_API + `/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        setProduct(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="pl-52">
    <div className="mt-32 border bg-gray-300 container mx-auto p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '22%', height: '280px' }}
        className="rounded-lg shadow-lg mb-4 md:mb-0"
      />


      <div className="flex-1 pl-11 w-9 pt-16 space-y-4">
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-500 mb-4">{product.description}</p>

        <Link to="/admin/admin-product" className="mt-4 block">
          <button className="bg-black text-white py-2 px-8 rounded-lg hover:bg-gray-800 transition duration-200">
            Back to Products
          </button>
        </Link>

      </div>

      <div className="mb-4 space-y-2 pt-16 pl-14">
        <p className="text-lg font-semibold text-gray-800">${product.price}</p>
        <p className="text-gray-600">{product.category}</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">{product.rating.rate}</p>
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "#FFD43B" }}
            className="text-yellow-500"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewProduct;
