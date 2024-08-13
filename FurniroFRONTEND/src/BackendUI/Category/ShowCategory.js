import React, { useEffect, useState } from "react";
import "./Showcategory.css";
import axios from "axios";
export default function ShowCategory() {
  const [showCate, setShowCate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categorypage/getcategory")
      .then((response) => {
        setShowCate(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: "70%", marginTop: "25px" }}>CATEGORIES</h1>
        <div className="show-cat-card">
          {showCate.map((item,index) => (
            <div className="pre-show-cat"   >
              <h2>{item.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


