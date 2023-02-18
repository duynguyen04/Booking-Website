const express = require("express");
const route = express.Router();
const hotelControler = require("../controllers/hotel");

route.get("/hotel", hotelControler.getdataHotel);
route.get("/hotel/:hotelId", hotelControler.getdetailHotel);
route.get("/hotel-room/:hotelId", hotelControler.getAllroomID);
route.get("/get-name-hotel/:hotelId", hotelControler.getnameHotel);
route.get("/hotel-list", hotelControler.getAllhotel);
route.get("/room-list", hotelControler.getAllroom);
route.get("/count", hotelControler.getCount);
route.get("/room/:idroom", hotelControler.getRoombyId);

route.post("/search", hotelControler.search);
route.post("/add-hotel", hotelControler.postAddhotel);
route.post("/delete-hotel", hotelControler.postDeleteHotel);
route.post("/add-room", hotelControler.postAddRoom);
route.post("/delete-room", hotelControler.postDeleteRoom);
route.post("/edit-hotel", hotelControler.postEditHotel);
route.post("/edit-room", hotelControler.postEditRoom);

module.exports = route;
