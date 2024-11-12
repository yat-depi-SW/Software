import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import RelatedProducts from '../component/RelatedProducts';

const Product = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState();
  const [size, setSize] = useState();

  const getProductData = () => {
    const myProduct = products.find((item) => item.id === parseInt(productId));
    setProductData(myProduct);
    setImage(myProduct.image);
  };

  useEffect(() => {
    getProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500'>
      <div className='flex flex-col gap-12 sm:flex-row w-11/12'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col justify-between overflow-x-scroll sm:overflow-y-scroll sm:justify-normal sm-w[18%] w-[20%]'>
            <img onClick={() => setImage(productData.image)} className='w-full cursor-pointer flex' src={productData.image} alt={productData.title} />
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='h-auto w-full' src={image} alt={productData.title} />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl'>{productData.title}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {Array.from({ length: Math.floor(productData.rating.rate) }).map((_, index) => (
              <img key={index} className='w-4' src={assets.star_icon} alt='' />
            ))}
            {Array.from({ length: 5 - Math.floor(productData.rating.rate) }).map((_, starIndex) => (
              <img key={starIndex} className='w-4' src={assets.star_dull_icon} alt='empty star' />
            ))}
            <h1 className='pl-4'>({productData.rating.count})</h1>
          </div>
          <p className='font-bold text-3xl mt-5'>${productData.price}</p>
          <p className='text-2xl mt-5 text-gray-700'>{productData.description}</p>
          {productData.sizes.length > 0 && ( // Check if sizes array is not empty
            <div className='flex flex-col gap-4 mt-5'>
              <p className='font-bold text-xl'>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 ${size === item ? 'bg-gray-300' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => addToCart(productData.id, size)} className='mt-5 bg-black text-white px-8 py-3 hover:bg-gray-800 text-sm'>ADD TO CART</button>
          <hr className='mt-4 mb-4' />
          <div className='text-sm text-gray-600'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <h1 className='mt-16 flex justify-center font-light text-3xl'>RELATED PRODUCTS</h1>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
