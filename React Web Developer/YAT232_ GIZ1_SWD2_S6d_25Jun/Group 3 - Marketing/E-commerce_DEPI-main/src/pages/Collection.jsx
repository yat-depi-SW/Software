import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import ProductItem from '../component/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [typeProducts, setTypeProducts] = useState([]);
  const [sortType, setSortType] = useState();

  const categoriesSelected = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  const typeSelected = (e) => {
    if (typeProducts.includes(e.target.value)) {
      setTypeProducts(typeProducts.filter((item) => item !== e.target.value));
    } else {
      setTypeProducts([...typeProducts, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = [...products];

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) => {
        return item.title.toUpperCase().includes(search.toUpperCase());
      });
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (typeProducts.length > 0) {
      productsCopy = productsCopy.filter((item) => typeProducts.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let filteredProductsCopy = [...filterProducts];

    if (sortType === 'low-high') {
      setFilterProducts(filteredProductsCopy.sort((a, b) => a.price - b.price));
    } else if (sortType === 'high-low') {
      setFilterProducts(filteredProductsCopy.sort((a, b) => b.price - a.price));
    } else {
      applyFilters();
    }
  };

  useEffect(() => {
    applyFilters();
    setSortType('relevant');
  }, [category, typeProducts, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 font-bold text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value={"Clothing"} onChange={categoriesSelected} /> Clothing
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={"Jewelery"} onChange={categoriesSelected} /> Jewelery
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={"Electronics"} onChange={categoriesSelected} /> Electronics
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <p className='font-bold'>ALL COLLECTIONS</p>

          {/* SORTING */}
          <select value={sortType} onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 rounded-lg'>
            <option value='relevant'>Sort: relevant</option>
            <option value='low-high'>Sort: low-high</option>
            <option value='high-low'>Sort: high-low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item.id} image={item.image} name={item.title} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection;
