import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Alert,
} from "@material-tailwind/react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  const [error, setError] = useState(null); 
  const [validationErrors, setValidationErrors] = useState({}); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.title) {
      newErrors.title = "Title is required";
    } else if (!product.price || product.price <= 0) {
      newErrors.price = "Price must be a positive number";
    } else if (!product.description) {
      newErrors.description = "Description is required";
    } else if (!product.category) {
      newErrors.category = "Category is required";
    } else if (!product.rating.rate || product.rating.rate <= 0) {
      newErrors.ratingRate = "Rating rate must be a positive number";
    } else if (!product.rating.count || product.rating.count <= 0) {
      newErrors.ratingCount = "Rating count must be a positive number";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/products`, product);
      const productId = response.data.id; 
      navigate("/admin/Productsinfo"); 
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please check your input and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0F172A]">
      <Card className="w-96 shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-center">
            Add New Product
          </Typography>
          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                label="Title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
              {validationErrors.title && (
                <Typography color="red">{validationErrors.title}</Typography>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="number"
                label="Price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
              {validationErrors.price && (
                <Typography color="red">{validationErrors.price}</Typography>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
              {validationErrors.description && (
                <Typography color="red">{validationErrors.description}</Typography>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
              {validationErrors.category && (
                <Typography color="red">{validationErrors.category}</Typography>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Image URL"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                label="Rating Rate"
                name="ratingRate"
                value={product.rating.rate}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, rate: Number(e.target.value) },
                  }))
                }
                required
              />
              {validationErrors.ratingRate && (
                <Typography color="red">{validationErrors.ratingRate}</Typography>
              )}
            </div>
            <div className="mb-4">
              <Input
                label="Rating Count"
                type="number"
                name="rating.count"
                value={product.rating.count}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, count: Number(e.target.value) },
                  }))
                }
                required
              />
              {validationErrors.ratingCount && (
                <Typography color="red">{validationErrors.ratingCount}</Typography>
              )}
            </div>
            <CardFooter className="flex justify-center">
              <Button type="submit" color="blue">
                Add Product
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProduct;
