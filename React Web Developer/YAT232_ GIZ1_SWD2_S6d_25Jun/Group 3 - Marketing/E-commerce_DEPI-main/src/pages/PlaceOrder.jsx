import React, { useContext, useState } from 'react';
import CartTotal from '../component/CartTotal';
import { ShopContext } from '../context/ShopContext';
import Swal from 'sweetalert2'

const PlaceOrder = () => {
  const { navigate, setCartItems, setCountCart } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipcode: '',
    country: '',
    city: '',
    state: '',
    street: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9+\-\s()]{7,15}$/;
    return regex.test(phone);
  };

  const handleSubmit = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delivery in 2 days.",
        showConfirmButton: false,
        timer: 1500
      });
      setCartItems([]);
      setCountCart(0);
      navigate('/');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:pt-10 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-5 w-full sm:w-2/5'>
        <h1 className='font-light text-2xl mb-3'>DELIVERY INFORMATION</h1>
        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              type='text'
              placeholder='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
          </div>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              type='text'
              placeholder='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
          </div>
        </div>

        <input
          className={`border rounded py-3 px-3 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          type='email'
          placeholder='Email Address'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.zipcode ? 'border-red-500' : 'border-gray-300'}`}
              type='number'
              placeholder='Zipcode'
              name='zipcode'
              value={formData.zipcode}
              onChange={handleChange}
            />
            {errors.zipcode && <p className='text-red-500 text-sm'>{errors.zipcode}</p>}
          </div>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              type='text'
              placeholder='Country'
              name='country'
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <p className='text-red-500 text-sm'>{errors.country}</p>}
          </div>
        </div>

        <div className='flex gap-3'>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              type='text'
              placeholder='City'
              name='city'
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className='text-red-500 text-sm'>{errors.city}</p>}
          </div>
          <div className='w-full'>
            <input
              className={`border rounded py-3 px-3 w-full ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              type='text'
              placeholder='State'
              name='state'
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className='text-red-500 text-sm'>{errors.state}</p>}
          </div>
        </div>

        <input
          className={`border rounded py-3 px-3 w-full ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
          type='text'
          placeholder='Street'
          name='street'
          value={formData.street}
          onChange={handleChange}
        />
        {errors.street && <p className='text-red-500 text-sm'>{errors.street}</p>}

        <input
          className={`border rounded py-3 px-3 w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          type='text'
          placeholder='Phone Number'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
      </div>

      <div className='flex flex-col flex-1 gap-6 items-center mt-10'>
        <CartTotal />
        <div className='mt-10'>
          <p className={`border p-3 px-3 cursor-pointer font-semibold bg-gray-300 border-black`}>CASH ON DELIVERY</p>
        </div>
        <button
          onClick={handleSubmit}
          className='bg-black text-white px-8 py-3 hover:bg-gray-800 text-sm'
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
