import React, {useState} from 'react'
import { Input } from '@material-tailwind/react';

import { useDispatch} from 'react-redux';
import { updateUser } from '../../../../redux/reducers/usersSlice';
const EditUser = ({user}) => {
  const dispatch = useDispatch();
    const [tempUser, setTempUser] = useState({
        ...user,
    });

    const [edited, setEdited] = useState({isEdited: false, message:""});
    
    const handleProduct = (e)=>{
        e.preventDefault();
        const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        const PWD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const {name, email, password} = tempUser;
        if(name == "")
        {
          setEdited({
            isEdited:false,
            message: "Name cannot be Empty"
          });
        }
        else if (!EMAIL_REGEX.test(email))
        {
          setEdited({
            isEdited:false,
            message: "Email is invalid"
          });
        }
        else if(!PWD_REGEX.test(password))
        {
          setEdited({
            isEdited:false,
            message: "Weak Password"
          });
        }
        else
        {
          dispatch(updateUser(tempUser))
          .then(()=>{
            setEdited({
              isEdited: true,
              message: "Edited Successfully"
            });
          })
          
        }
    };
  return (
    <div>
      <form  onSubmit={(e)=>{handleProduct(e)}} className='bg-white w-96 dark:bg-gray-700 dark:text-gray-200'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className='text-red-600'>{edited.message}</div>
        <div className='flex'>

        </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-1">
            <div className="sm:col-span-4">
            <Input 
            label="Username" 
            value={tempUser.name}
            onChange={(e)=>setTempUser({...tempUser, name:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="User Email" 
            value={tempUser.email} 
            min={0}
            onChange={(e)=>setTempUser({...tempUser, email:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Password" 
            value={tempUser.password} 
            onChange={(e)=>setTempUser({...newProduct, password:e.target.value})}
/>
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

export default EditUser
