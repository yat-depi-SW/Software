import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import CartTotal from '../component/CartTotal';

const Cart = () => {
  const { products, cartItems, updateQuantity, getCartAmount, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  console.log('Cart Items:', cartItems);

  useEffect(() => {
    const cartDataTemp = [];
    for (const itemId in cartItems) {
      for (const itemSize in cartItems[itemId]) {
        if (cartItems[itemId][itemSize] > 0) {
          cartDataTemp.push({
            id: itemId, 
            size: itemSize,
            quantity: cartItems[itemId][itemSize],
          });
        }
      }
    }
    setCartData(cartDataTemp);
  }, [cartItems]);

  return getCartAmount() !== 0 ? (
    <div className='border-t pt-14'>
      <h1 className='flex justify-start font-light text-2xl mb-3'>YOUR CART__</h1>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product.id === parseInt(item.id)); 

          if (!productData) {
            console.warn(`Product with id ${item.id} not found.`);
            return null; 
          }

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16' src={productData.image} alt={productData.name} />
                <div>
                  <p className='text-sm sm:text-lg font-medium'>{productData.title}</p> 
                  <div className='flex items-center gap-6'>
                    <p className='text-sm sm:text-lg '>${productData.price}</p>
                    <p className='px-2 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    updateQuantity(item.id, item.size, value); 
                  }
                }}
                className='border w-20 px-1 py-1'
                type='number'
                min={1}
                value={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item.id, item.size, 0)} 
                className='w-4 cursor-pointer'
                src={assets.bin_icon}
                alt='Delete'
              />
            </div>
          );
        })}
      </div>
      <div className='flex mt-20 mb-20 gap-28'>
        <CartTotal />
        <div>
          <button onClick={() => navigate('/placeOrder')} className='mt-16 mb-5 bg-black text-white px-8 py-3 hover:bg-gray-800 text-sm'>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center gap-9 border-t'>
      <h1 className='font-light text-2xl mt-20'>YOUR CART IS EMPTY</h1>
      <img className='w-80' src={assets.emptyCart} alt='Empty Cart' />
    </div>
  );
};

export default Cart;
