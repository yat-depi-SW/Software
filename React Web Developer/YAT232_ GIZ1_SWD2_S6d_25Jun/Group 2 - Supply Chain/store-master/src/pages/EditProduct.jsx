import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Textarea, Button } from "@material-tailwind/react";

const EditProduct = () => {
  const { productID } = useParams();  
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        console.log("Fetched product:", res.data); 
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        alert("Failed to load product data.");
      });
  }, [productID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .put(`${import.meta.env.VITE_API}/products/${productID}`, product)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/admin/Productsinfo"); 
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold mb-5">Edit Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <Input
          label="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          error={errors.title}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <Input
          label="Price"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          error={errors.price}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <Textarea
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          error={errors.description}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <Input
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          error={errors.category}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <Input
          label="Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <Input
          label="Rating Rate"
          type="number"
          name="rating.rate"
          value={product.rating.rate}
          onChange={handleChange}
          error={errors.ratingRate}
        />
        {errors.ratingRate && <p className="text-red-500 text-sm">{errors.ratingRate}</p>}

        <Input
          label="Rating Count"
          type="number"
          name="rating.count"
          value={product.rating.count}
          onChange={handleChange}
          error={errors.ratingCount}
        />
        {errors.ratingCount && <p className="text-red-500 text-sm">{errors.ratingCount}</p>}

        <Button type="submit" color="blue" fullWidth>
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
