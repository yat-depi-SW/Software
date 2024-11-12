import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../frontend_assets/assets';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  return showSearch ? (
    <div className='border-t border-b bg-gray-100 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-2/4'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='w-full rounded-full bg-gray-100 outline-none pl-2' type='text' placeholder='Search products...' />
        <img className='w-5 cursor-pointer' src={assets.search_icon} alt=''/>
      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-4 cursor-pointer' src={assets.cross_icon} />
    </div>
  ): null
}

export default SearchBar
