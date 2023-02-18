import "./featured.css";
import React, { useState, useEffect } from "react";

const Featured = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/hotel")
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);
  // console.log(data);
  function countHotel(a) {
    let hotel = data.filter((i) => {
      return i.city == a;
      // console.log(i.city);
    });
    let count = hotel.length;
    console.log(count);
    return count;
  }
  // console.log(countHotel("Ha Noi"));
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{countHotel("Ha Noi")} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{countHotel("Ho Chi Minh")} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{countHotel("Da Nang")} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
