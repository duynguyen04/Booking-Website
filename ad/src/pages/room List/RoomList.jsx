import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
// import "./InfoBoard.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const username = useSelector((state) => state.username);

  useEffect(() => {
    if (username) {
      fetch("http://localhost:5000/room-list")
        .then((res) => res.json())
        .then((data) => {
          setRoomList(data);
        });
    }
  });
  const deleteHanle = (id) => {
    fetch("http://localhost:5000/delete-room", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const renderHotel = (item, index) => {
    return (
      <tr key={index}>
        <td>{++index}</td>
        <td>{item._id}</td>
        <td>{item.title}</td>
        <td>{item.desc}</td>
        <td>{item.price}</td>
        <td>{item.maxPeople}</td>
        <td>
          <button onClick={() => deleteHanle(item._id)}>Delete</button>
          <button
            onClick={() => {
              navigate(`/edit-room/${item._id}`);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };
  return (
    <Dashboard>
      <div>
        <div>
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <div className="title-1">
              <h3>Lastest Transactions</h3>
              <Link to="/add-room" className="btn-all">
                Add New
              </Link>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roomList.length > 0 ? (
                  roomList.map((item, i) => renderHotel(item, i))
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

export default RoomList;
