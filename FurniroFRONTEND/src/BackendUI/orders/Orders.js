import React, { useEffect, useState } from 'react';
import Sidebar from '../sideBar';
import axios from 'axios';
import './orders.css'; // Import CSS file for styling if you have it

export default function Orders() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productMapping, setProductMapping] = useState({});

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        // Fetch order items
        const orderResponse = await axios.get('http://localhost:5000/api/orderpage/getorderitems');
        const orders = orderResponse.data;

        // Fetch product names
        const productResponse = await axios.get('http://localhost:5000/api/productpage/getproducts');
        const products = productResponse.data.data;

        // Create a mapping of product ID to product name
        const productMap = {};
        products.forEach(product => {
          productMap[product._id] = product.productName;
        });
        setProductMapping(productMap);

        // Set the fetched order items
        setOrderItems(orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <div className='grid-container'>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div>
          <div className="card-contain-top">
            {orderItems.map((item) => (
              <div key={item._id} className="card-second">
                <h2 className='pro-duct-name'>
                  {productMapping[item.productid] || 'Unknown Product'}
                </h2>
                <p className="card-title-one">Color: {item.color}</p>
                <p className="card-description-yo">Size: {item.size}</p>
                <p className="card-description-yo">Quantity: {item.quantity}</p>
                <p className="card-price-now">Price: ${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
