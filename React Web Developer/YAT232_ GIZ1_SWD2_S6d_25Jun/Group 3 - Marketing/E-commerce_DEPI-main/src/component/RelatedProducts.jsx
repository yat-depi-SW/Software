import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
  const {products} = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  const getRelatedProducts = ()=>{
    let productCopy = products;
    productCopy = productCopy.filter((item)=> category === item.category);
    productCopy = productCopy.filter((item)=> subCategory === item.subCategory);
    setRelated(productCopy.slice(1,6));
  }

  useEffect(()=>{
    getRelatedProducts();
  },[products])

  return (
    <div>
        <div className='flex flex-row gap-3 mt-10 mb-10 '>
            {related.map((item, index)=>(
                <ProductItem key={index} id={item.id} image={item.image} name={item.title} price={item.price}/>
            ))}
        </div>
      
    </div>
  )
}

export default RelatedProducts
