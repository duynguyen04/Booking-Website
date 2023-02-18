import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
// import "./InfoBoard.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Transaction = () => {
  const [transaction, settransaction] = useState([]);
  const username = useSelector((state) => state.username);

  useEffect(() => {
    if (username) {
      fetch("http://localhost:5000/transactions")
        .then((res) => res.json())
        .then((data) => {
          settransaction(data);
        });
    }
  }, []);
  const renderTran = (item, index) => {
    console.log(item);
    const dateEnd = new Date(item.dateEnd);
    const dateStart = new Date(item.dateStart);
    const statusClass =
      item.status === "Booked"
        ? "booked__status"
        : item.status === "Checkin"
        ? "checkin__status"
        : "checkout__status";
    return (
      <tr key={index}>
        <td>{++index}</td>
        <td>{item._id}</td>
        <td>{item.user}</td>
        <td>{item.namehotel}</td>
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
            (dateStart.getMonth() + 1) +
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
        <td>
          <div className={statusClass}>
            <span>{item.status}</span>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Dashboard>
      <div>
        <div>
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <div>
              <h3>Lastest Transactions</h3>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>User</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Payment method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transaction.length > 0 ? (
                  transaction.map((item, i) => renderTran(item, i))
                ) : (
                  <tr>
                    <td colSpan={9}>No Hotel</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Transaction;
