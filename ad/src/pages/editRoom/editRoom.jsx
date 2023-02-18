import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./addroom.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditRoom = () => {
  const params = useParams();
  const [description, setDescription] = useState("");
  const [maxpeople, setmaxpeople] = useState(0);
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState([]);
  const username = useSelector((state) => state.username);

  const [hotelList, setHotelList] = useState([]);
  console.log(params.idroom);

  useEffect(() => {
    fetch("http://localhost:5000/hotel-list")
      .then((res) => res.json())
      .then((data) => setHotelList(data));
    fetch(`http://localhost:5000/room/${params.idroom}`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.desc);
        setmaxpeople(data.maxPeople);
        setTitle(data.title);
        setPrice(data.price);
        setRooms(data.roomNumbers);
      });
  }, []);
  const handleSend = () => {
    const check = checkvalue();
    if (check) {
      alert("Edit Room thành công");
      fetch("http://localhost:5000/edit-room", {
        method: "POST",
        body: JSON.stringify({
          id: params.idroom,
          description: description,
          title: Title,
          price: Price,
          rooms: rooms,
          maxpeople: maxpeople,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      alert("Tạo Room thất bại");
    }
  };
  const handleRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setRooms(checked ? [...rooms, value] : rooms.filter((i) => i != value));
  };
  //   console.log(rooms);
  const checkvalue = () => {
    if (
      description == "" ||
      Title == "" ||
      Price == "" ||
      maxpeople == 0 ||
      rooms == "" ||
      username == ""
    ) {
      return false;
    } else return true;
  };
  console.log(checkvalue());
  return (
    <Dashboard>
      <div className="container-form">
        <div className="container-title">Add New Room</div>
        <div>
          <form className="form">
            <div className="form-inner">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => setTitle(e.target.value)}
                  value={Title}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter City"
                  onChange={(e) => setPrice(e.target.value)}
                  value={Price}
                />
              </div>
              <div className="form-group">
                <label>Room:</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Room"
                  onChange={(e) => setRooms(e.target.value)}
                  value={rooms}
                />
              </div>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label for="email">Description:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Type"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="form-group">
                <label>Max People:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Address"
                  onChange={(e) => setmaxpeople(e.target.value)}
                  value={maxpeople}
                />
              </div>
              {/* <div className="form-group slect-featured">
                <label for="email">Choose a hotel:</label>
                <select
                  className="form-select form-select-sm select-option"
                  aria-label=".form-select-sm example"
                  onChange={(e) => setHotel(e.target.value)}
                  value={hotel}
                >
                  <option selected value="">
                    No
                  </option>
                  {hotelList.map((i) => {
                    return <option value={i._id}>{i.title}</option>;
                  })}
                </select>
              </div> */}
            </div>
            {/* <div className="roomList">
              <label>Choose a Hotel:</label>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {roomsList.map((room, i) => (
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{room.title}</td>
                      <td>
                        <input
                          type="checkbox"
                          name="room"
                          value={room._id}
                          onChange={(e) => handleRoom(e)}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div> */}
          </form>
          <button
            className="btn-send"
            type="button"
            onClick={() => handleSend()}
          >
            Send
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditRoom;
