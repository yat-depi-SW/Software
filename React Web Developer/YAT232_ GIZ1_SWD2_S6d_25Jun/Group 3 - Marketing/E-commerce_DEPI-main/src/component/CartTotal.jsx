import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-1/2'>
        <h1 className='flex justify-start font-light text-2xl mb-3'>TOTAL AMOUNT</h1>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>$ {getCartAmount().toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>$ 10.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>$ {getCartAmount() === 0 ? '0.00': (getCartAmount() + 10).toFixed(2)}</b>
            </div>
        </div>

    </div>
  )
}

export default CartTotal
