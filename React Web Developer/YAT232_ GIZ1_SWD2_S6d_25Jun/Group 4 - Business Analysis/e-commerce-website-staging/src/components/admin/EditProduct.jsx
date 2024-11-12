import React, {useState} from 'react'
import { updateProduct } from '../../../redux/reducers/productsSlice';
import { useDispatch} from 'react-redux';
import { Input } from '@material-tailwind/react';
import { FaExternalLinkAlt } from "react-icons/fa";
const EditProduct = ({product}) => {
    const dispatch = useDispatch();
    const [newProduct, setNewProduct] = useState({
        ...product,
        rating: {
          ...product.rating
        }
    });

    const [added, setAdded] = useState({isAdded: false, message:""});
    
    const handleProduct = (e)=>{
        e.preventDefault();
        const {name, imgUrl} = newProduct;
        if(name == "")
        {            
            setAdded({isAdded: false, message: "Product name cannot be Empty"});
        }
        else if(!(imgUrl.startsWith("http")))
        {            
          console.log(imgUrl)
            setAdded({isAdded: false, message: "Image Url is invalid or invalid Formate"});

        }
        else
        {
            dispatch(updateProduct(newProduct))
            .then(()=>{
                setAdded({isAdded:true, message:"Product Updated Successfully! Refresh page!"}); console.log(newProduct);
            })
            
            
        }
        
    };
  return (
    <div>
      <form onSubmit={(e)=>{handleProduct(e)}} >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className='text-red-600'>{added.message}</div>
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
            min={0}
            type='number'
            onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Rate" 
            value={newProduct.rating.rate} 
            type='number'
            min={0}
            max={5}
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
          Save
        </button>
      </div>
    </form>

    </div>
  )
}

export default EditProduct
