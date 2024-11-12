import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button, Typography } from "@material-tailwind/react";
import { Mail, Lock, User } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!username.trim()) newErrors.username = "Username is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (Object.keys(newErrors).length === 0) {
      try {
    
        const response = await axios.post('https://blush-warp-bathroom.glitch.me/mazenz', {
          name: username,
          email,
          password,
          role: 'user'
        });

     
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: 'Welcome to our platform!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate('/login');
          });
        }
      } catch (error) {
        // Handle specific error cases
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'Email already exists. Please use a different email.';
          } else if (error.response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        }
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorMessage,
        });
      }
    } else {
      setErrors(newErrors);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please correct the errors in the form.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center"
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Typography variant="h4" color="blue" className="text-center mb-6">
          Sign Up
        </Typography>
        <form onSubmit={handleSignup} className="space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail />}
              error={errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Input
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<User />}
              error={errors.username}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock />}
              error={errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" fullWidth className="mt-4">
              Sign Up
            </Button>
          </motion.div>
        </form>
        <Typography variant="small" className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-500 hover:underline">
            Sign in
          </Link>
        </Typography>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
