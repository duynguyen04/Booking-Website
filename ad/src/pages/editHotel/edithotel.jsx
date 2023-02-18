import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./addhotel.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditHotel = () => {
  const [name, setname] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [Images, setImages] = useState("");
  const [Type, setType] = useState("");
  const [Address, setAddress] = useState("");
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [Featured, setFeatured] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomsList, setRoomList] = useState([]);
  const username = useSelector((state) => state.username);
  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/room-list")
      .then((res) => res.json())
      .then((data) => setRoomList(data));
    fetch(`http://localhost:5000/hotel/${params.idhotel}`)
      .then((res) => res.json())
      .then((data) => {
        setname(data.name);
        setCity(data.city);
        setDistance(data.distance);
        setDescription(data.desc);
        setImages(data.photos);
        setType(data.type);
        setAddress(data.address);
        setTitle(data.title);
        setPrice(data.cheapestPrice);
        setFeatured(data.featured);
        setRooms(data.rooms);
      });
  }, []);
  console.log(params.idhotel);
  const handleSend = () => {
    const check = checkvalue();
    if (check) {
      alert("Chỉnh sửa Hotel thành công");
      fetch("http://localhost:5000/edit-hotel", {
        method: "POST",
        body: JSON.stringify({
          id: params.idhotel,
          name: name,
          city: city,
          distance: distance,
          description: description,
          images: Images,
          type: Type,
          address: Address,
          title: Title,
          price: Price,
          featured: Featured,
          rooms: rooms,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      alert("Chỉnh sửa Hotel thất bại");
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
      name == "" ||
      city == "" ||
      distance == "" ||
      description == "" ||
      Images == "" ||
      Type == "" ||
      Address == "" ||
      Title == "" ||
      Price == "" ||
      rooms.length <= 0 ||
      username == ""
    ) {
      return false;
    } else return true;
  };
  console.log(rooms);
  console.log(rooms.includes("6310dd998cfecfd90b30ca28"));
  return (
    <Dashboard>
      <div className="container-form">
        <div className="container-title">Edit Hotel</div>
        <div>
          <form className="form">
            <div className="form-inner">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="form-group">
                <label>Distance from City Center:</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Distance from City Center"
                  onChange={(e) => setDistance(e.target.value)}
                  value={distance}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="form-group">
                <label for="text">Images:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Images"
                  onChange={(e) => setImages(e.target.value)}
                  value={Images}
                />
              </div>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label for="email">Type:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Type"
                  onChange={(e) => setType(e.target.value)}
                  value={Type}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={Address}
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={Title}
                />
              </div>
              <div className="form-group">
                <label for="number">Price:</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={Price}
                />
              </div>
              <div className="form-group slect-featured">
                <label for="email">Featured:</label>
                <select
                  className="form-select form-select-sm select-option"
                  aria-label=".form-select-sm example"
                  onChange={(e) => setFeatured(e.target.value)}
                  value={Featured}
                >
                  <option selected value="false">
                    No
                  </option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="roomList">
              <label>Rooms:</label>
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
                          checked={rooms.includes(room._id)}
                          onChange={(e) => handleRoom(e)}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
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

export default EditHotel;
