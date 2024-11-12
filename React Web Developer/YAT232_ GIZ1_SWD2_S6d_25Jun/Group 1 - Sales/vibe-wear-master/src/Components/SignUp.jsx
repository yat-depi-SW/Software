import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const validationError = validateForm(formData);
    setErrors(validationError);
    
    if (Object.keys(validationError).length === 0) {
      
      console.log("Form data is valid:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(data.phone)) {
      errors.phone = "Phone number must be 11 digits";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  return (
    <div className="items-center justify-center rounded-3xl border-2 border-gray-200 bg-white px-10 py-20">
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-semibold">Create Account</h1>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Please enter your details to sign up
        </p>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your username"
              onChange={handleChange}
              value={formData.username}
            />
            {errors.username && <span className="text-red-500">{errors.username}</span>}
          </div>

          <div>
            <label className="text-lg font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your phone"
              onChange={handleChange}
              value={formData.phone}
            />
            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
          </div>

          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              type="text"
              name="email"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>

          <div className="mt-4">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button className="rounded-xl bg-blue-800 py-3 text-lg font-bold text-white transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75">
              Sign Up
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <p className="text-base font-medium">Already have an account?</p>
            <Link
              to="/login"
              className="ml-2 text-base font-medium text-blue-800"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
