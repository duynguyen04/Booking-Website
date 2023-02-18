import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./hotelList.css";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotelList, setHotelList] = useState([]);
  const username = useSelector((state) => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetch("http://localhost:5000/hotel-list")
        .then((res) => res.json())
        .then((data) => {
          setHotelList(data);
        });
    }
  });
  const renderHotel = (item, index) => {
    return (
      <tr key={index}>
        <td>{++index}</td>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.title}</td>
        <td>{item.city}</td>
        <td>
          <button
            onClick={() => {
              deleteHanle(item._id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              navigate(`/edit-hotel/${item._id}`);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };
  const deleteHanle = (id) => {
    fetch("http://localhost:5000/delete-hotel", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <Dashboard>
      <div>
        <div>
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <div className="title-1">
              <h3>Lastest Transactions</h3>
              <Link to="/add-hotel" className="btn-all">
                Add New
              </Link>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelList.length > 0 ? (
                  hotelList.map((item, i) => renderHotel(item, i))
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

export default HotelList;
