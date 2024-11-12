import React, { useState } from 'react'
import { Input, Radio } from '@material-tailwind/react';
import { addUser } from '../../../../redux/reducers/usersSlice';
import { useDispatch} from 'react-redux';

const AddUser = () => {
    const [newUser, setNewUser] = useState(
        {name:"",
             email:"",
             gender: "male",
             role: "user",
             password: ""}
    )
    
    const dispatch = useDispatch();

    const [added, setAdded] = useState({isAdded: false, message:""});
    
    const handleProduct = (e)=>{
      const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        const PWD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        e.preventDefault();
        if(newUser.name == "")
        {
          setAdded({isAdded:false, message:"Username Cannot be Empty"})
        }
        else if(!EMAIL_REGEX.test(newUser.email))
        {
          setAdded({isAdded:false, message:"Invalid Email"})

        }
        else if(!PWD_REGEX.test(newUser.password))
        {
          setAdded({isAdded:false, message:"weak Password"})

        }
        else
        {
          dispatch(addUser(newUser));
        }
        
    };
  return (
    <div >
      <form onSubmit={(e)=>{handleProduct(e)}} className='bg-white w-96 dark:bg-gray-700 dark:text-gray-200'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className='text-red-600'>{added.message}</div>
        <div className='flex'>

        </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-1">
            <div className="sm:col-span-4">
            <Input 
            label="Username" 
            value={newUser.name}
            onChange={(e)=>setNewUser({...newUser, name:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="User Email" 
            value={newUser.email} 
            min={0}
            onChange={(e)=>setNewUser({...newUser, email:e.target.value})}
/>
            </div>
            <div className="sm:col-span-4">
            <Input 
            label="Password" 
            value={newUser.password} 
            onChange={(e)=>setNewUser({...newUser, password:e.target.value})}
/>
            </div>
            <div className=' dark:bg-white dark:text-black rounded-xl p-2'>
            <div className=" sm:col-span-4">
              <h1>Gender</h1>
            <Radio name="gender" label="male" defaultChecked onClick={()=>{setNewUser({...newUser, gender:"male"})}}/>
            <Radio name="gender" label="female" onClick={()=>{setNewUser({...newUser, gender:"female"})}}/>
            </div>
            <div className="sm:col-span-4">
              <h1>Role</h1>
            <Radio name="role" label="admin" onClick={()=>{setNewUser({...newUser, role:"admin"})}}/>
            <Radio name="role" label="user" defaultChecked onClick={()=>{setNewUser({...newUser, gender:"user"})}}/>
            </div>
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

export default AddUser
