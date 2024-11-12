import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { assets } from "../../frontend_assets/assets";

const Home = ({ logged }) => {
  const products = [
    { id: 1, name: "Product 1", image: assets.Product3 },
    { id: 2, name: "Product 2", image: assets.Product2 },
    { id: 3, name: "Product 3", image: assets.Product1 },
  ];

  const features = [
    {
      icon: StarIcon,
      title: "Quality Products",
      description: "We offer only the best quality products.",
    },
    {
      icon: TruckIcon,
      title: "Fast Shipping",
      description: "Get your orders delivered quickly.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Shopping",
      description: "Shop with confidence on our secure platform.",
    },
  ];

  const testimonials = [
    { name: "3esam1", comment: "Great products and excellent service!" },
    {
      name: "3esam2",
      comment: "I love shopping here. Always find what I need.",
    },
    {
      name: "3esam3",
      comment: "Fast shipping and top-notch customer support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-screen"
      >
        <img
          src={assets.hero}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {!logged && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <Typography
                variant="h1"
                className="mb-4 text-4xl md:text-6xl font-bold"
              >
                Welcome to Shopify Squad!
              </Typography>
              <Typography variant="lead" className="mb-8 text-xl md:text-2xl">
                Discover amazing products and start shopping today.
              </Typography>
              <div className="flex justify-center gap-4">
                <Button size="lg" color="white" className="text-blue-500">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="lg" color="blue" className="bg-blue-500">
                  <Link to="/signup" className="text-white">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            color="blue-gray"
            className="text-center mb-12"
          >
            Why Choose Us
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="mt-6 text-center">
                <CardBody>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-gray-100"
      >
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            color="blue-gray"
            className="text-center mb-12"
          >
            Featured Products
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {product.name}
                  </Typography>
                  <Button color="blue" ripple="light" fullWidth>
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-blue-50"
      >
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            color="blue-gray"
            className="text-center mb-12"
          >
            What Our Customers Say
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="mt-6">
                <CardBody>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    {testimonial.name}
                  </Typography>
                  <Typography>"{testimonial.comment}"</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-blue-500 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <Typography variant="h3" className="mb-4">
            Ready to Start Shopping?
          </Typography>
          <Typography variant="lead" className="mb-8">
            Join our community and discover amazing products today!
          </Typography>
          <Button size="lg" color="white" className="text-blue-500">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
