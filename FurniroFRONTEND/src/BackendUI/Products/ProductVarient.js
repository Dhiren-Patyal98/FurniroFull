import React, { useEffect, useState } from "react";
import "./ProductVarient.css";
import axios from "axios";

const ProductVarient = () => {
  const [prods, setProds] = useState([]);
  const [formData, setFormData] = useState({
    productid: "",
    color: "",
    image: [], // Updated state to store image URLs
    price: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageInputValue, setImageInputValue] = useState(""); // New state to store the raw input value

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImageInputValue(value); // Update the raw input value state
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageBlur = () => {
    const urls = imageInputValue.split(",").map((url) => url.trim()).filter((url) => url);
    
    if (urls.length > 4) {
      setError("You can only add up to 4 image URLs.");
      return;
    } else {
      setError("");
    }

    setFormData({
      ...formData,
      image: urls,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image.length === 0) {
      setError("Please add at least one image URL.");
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post(
        "http://localhost:5000/api/productpage/productvariety",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      
      console.log("Response:", response);

      if (response.status === 200) {
        setSuccessMessage("Product added successfully!");
        setFormData({
          productid: "",
          color: "",
          image: [],
          price: "",
        });
        setError("");
        setImageInputValue(""); // Reset the raw input value state
        fetchProducts(); 
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        setError(err.response.data.msg || "Failed to submit the form");
      } else if (err.request) {
        setError("No response received from server");
      } else {
        setError("Error setting up request: " + err.message);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productpage/getproducts");
      setProds(response.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <form className="product-varient-form" onSubmit={handleSubmit}>
      <h2>Add Product Variant</h2>

      <label htmlFor="color">Color:</label>
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Enter color"
        required
      />

      <label htmlFor="image">Image URLs (comma-separated, max 4):</label>
      <input
        type="text"
        name="image"
        value={imageInputValue}
        onChange={handleChange}
        onBlur={handleImageBlur} // New event handler for blur event
        placeholder="Enter image URLs, separated by commas"
        required
      />
      {error && <p className="error-message">{error}</p>}
      <div className="image-previews">
        {formData.image.map((url, index) => (
          <img
          key={index}
          src={url}
          alt={`Preview ${index}`}
          className="image-preview"
        />
      ))}
    </div>

    <label htmlFor="productid">Product:</label>
    <select
      className="form-select"
      name="productid"
      value={formData.productid}
      onChange={handleChange}
      required
    >
      <option value="">Select The Product Name</option>
      {prods.map((item) => (
        <option key={item._id} value={item._id}>
          {item.productName}
        </option>
      ))}
    </select>

    <label htmlFor="price">Price:</label>
    <input
      type="text"
      id="price"
      name="price"
      value={formData.price}
      onChange={handleChange}
      placeholder="Enter price"
      required
    />

    <button type="submit" className="submit-button">
      Add Product
    </button>
    {successMessage && <p className="success-message">{successMessage}</p>}
  </form>
);
};

export default ProductVarient;