import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productVarientShow.css';
import { MdDelete } from 'react-icons/md';

export default function ProductVarientShow() {
  const [productVarieties, setProductVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productNamesMap, setProductNamesMap] = useState({});

  useEffect(() => {
    // Fetch product varieties
    axios.get('http://localhost:5000/api/productpage/getproductvariety')
      .then(response => {
        setProductVarieties(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch product names
    axios.get('http://localhost:5000/api/productpage/getproducts')
      .then(response => {
        const productData = response.data.data;
        // Create a map of product IDs to names
        const namesMap = {};
        productData.forEach(product => {
          namesMap[product._id] = product.productName; // Assuming product object has `_id` and `name`
        });
        setProductNamesMap(namesMap);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Function to handle deletion of product variety
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/productpage/productvarietydelete/${id}`);
      if (response.data.success) {
        // Remove the deleted item from the state
        setProductVarieties(productVarieties.filter(variety => variety._id !== id));
        alert('Product variety deleted successfully');
      } else {
        alert('Failed to delete product variety');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the product variety');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productVarieties.length) {
    return <div>No product varieties found</div>;
  }

  return (
    <div>
      <div className="pre-card-show">
        {productVarieties.map((productVariety) => (
          <div key={productVariety._id} className="pre-card-content">
            <img src={productVariety.image[0]} alt={productVariety.color} />
            <h1>{productNamesMap[productVariety.productid] || 'Product Name Not Found'}</h1>
            <h2>Color: {productVariety.color}</h2>
            <p>Price: {productVariety.price}</p>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
              <span
                className="delete-icon"
                style={{ maxWidth: "5rem", cursor: "pointer" }}
                onClick={() => handleDelete(productVariety._id)}
              >
                <MdDelete style={{ color: "red", height: "25px", width: "25px" }} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
