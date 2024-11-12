import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='w-full h-64 overflow-hidden'>
            <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out duration-300' src={image} alt={name}/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>${price}</p>
    </Link>
  )
}

export default ProductItem
