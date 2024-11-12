import React, {useState} from 'react'
import { addProduct } from '../../../redux/reducers/productsSlice';
import { useDispatch} from 'react-redux';
import { Input } from '@material-tailwind/react';
import { FaExternalLinkAlt } from "react-icons/fa";


const AddProduct = () => {
    const dispatch = useDispatch();
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: 0,
        imgUrl: "",
        rating: {
          rate: 0,
          count: 0
        }
    });

    const [added, setAdded] = useState({isAdded: false, message:""});
    
    const handleProduct = (e)=>{
        e.preventDefault();
        const {name, price, imgUrl, rating:{rate}} = newProduct;
        if(name == "")
        {            
            setAdded({isAdded: false, message: "Product name cannot be Empty"});
        }
        else if(isNaN(price) || price < 0)
        {            
            setAdded({isAdded: false, message: "Price should be a positive number"});

        }
        else if(isNaN(rate) || rate < 0 || rate > 5)
        {            
            setAdded({isAdded: false, message: "Rate should be a positive number between 0, 5"});

        }
        else if(!(imgUrl.startsWith("http")))
        {            
            setAdded({isAdded: false, message: "Image Url is invalid or invalid Formate"});

        }
        else
        {
            dispatch(addProduct(newProduct))
            .then(()=>{
                setAdded({isAdded:true, message:"Product Added Successfully!"}); console.log("Added");
            })
            
            
        }
        
    };
  return (
    <form onSubmit={(e)=>{handleProduct(e)}} className='bg-white w-96 dark:bg-gray-700 dark:text-gray-200'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className={added.isAdded? "text-amber-800": "text-red-600"}>{added.message}</div>
        <div className='flex'>

        </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-1">
            <div className="sm:col-span-4">
            <Input 
            label="Product Name" 
            value={newProduct.name}
            onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Price" 
            value={newProduct.price} 
            
            onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Rate" 
            value={newProduct.rating.rate} 
            onChange={(e)=>setNewProduct({...newProduct, rating:{...newProduct.rating, rate:e.target.value}})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Count" 
            value={newProduct.rating.count} 
            type='number'
            min={0}
            onChange={(e)=>setNewProduct({...newProduct, rating:{...newProduct.rating, count:e.target.value}})}
/>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={newProduct.description}
                  onChange={(e)=>setNewProduct({...newProduct, description:e.target.value})}
                  id="description"
                  name="description"
                  rows={3}
                  className="dark:bg-gray-700 dark:text-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
            <Input value={newProduct.imgUrl} onChange={(e)=>setNewProduct({...newProduct, imgUrl:e.target.value})} label="Product Image URL" icon={<FaExternalLinkAlt />} />
            </div>
          </div>
        </div> 
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default AddProduct
