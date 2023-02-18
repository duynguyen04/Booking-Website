import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MailList from "../mailList/MailList";
import Navbar from "../navbar/Navbar";
import "./transaction.css";

const Transaction = () => {
  const params = useParams();
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/trans/${params.username}`)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);
  //   const getnameHOtel = async (idhotel) => {
  //     console.log(idhotel);
  //     let nameHotel = "";
  //     await fetch(`http://localhost:5000/get-name-hotel/${idhotel}`)
  //       .then((res) => res.json())
  //       .then((data) => (nameHotel = data.title));
  //     console.log(nameHotel);
  //     return nameHotel;
  //   };
  const renderTrans = (item, i) => {
    const dateEnd = new Date(item.dateEnd);
    const dateStart = new Date(item.dateStart);
    return (
      <tr className="info">
        <td>{item.price}</td>
        <td>{item.namehotel}</td>
        {/* {item.room.map((i) => (
          <td></td>
        ))} */}
        <td>
          {item.room.map((room, i) => {
            if (i > 0) {
              return "," + room;
            } else {
              return room;
            }
          })}
        </td>
        <td>
          {dateStart.getDate() +
            "/" +
            // dateStart.getMonth() +
            parseInt(dateStart.getMonth() + 1) +
            "/" +
            dateStart.getFullYear() +
            " - " +
            dateEnd.getDate() +
            "/" +
            parseInt(dateEnd.getMonth() + 1) +
            "/" +
            dateEnd.getFullYear()}
        </td>
        <td>${item.price}</td>
        <td>{item.payment}</td>
        <td>{item.status}</td>
      </tr>
    );
  };
  console.log(data);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="table1">
        <h3>Your Transactions</h3>
        <div>
          <table class="table">
            <caption>List of users</caption>
            <thead className="cot">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hotel</th>
                <th scope="col">Room</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {data.length > 0 && (
              <tbody>{data.map((item, i) => renderTrans(item, i))}</tbody>
            )}
          </table>
        </div>
      </div>
      <MailList />
    </div>
  );
};
export default Transaction;
