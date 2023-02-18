import "./featuredProperties.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/hotel")
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);
  // console.log(data);
  let datasort = data.sort((a, b) => b.rating - a.rating);
  // let datasort3 = [datasort[0], datasort[1], datasort[2]];

  return (
    <div className="fp">
      {datasort.map((item) => {
        return (
          <div className="fpItem">
            <img src={item.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <Link to={`/hotels/${item._id}`}>{item.name}</Link>
            </span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProperties;
