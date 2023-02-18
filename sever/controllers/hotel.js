const { Promise } = require("mongoose");
const Mongoose = require("mongoose");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const compareDate = (dateA, dateB) => {
  if (dateA.getUTCFullYear() > dateB.getUTCFullYear()) {
    return "later";
  } else if (dateA.getUTCFullYear() < dateB.getUTCFullYear()) {
    return "earlier";
  } else {
    if (dateA.getUTCMonth() > dateB.getUTCMonth()) {
      return "later";
    } else if (dateA.getUTCMonth() < dateB.getUTCMonth()) {
      return "earlier";
    } else {
      if (dateA.getUTCDate() > dateB.getUTCDate()) {
        return "later";
      } else if (dateA.getUTCDate() < dateB.getUTCDate()) {
        return "earlier";
      } else {
        return "same";
      }
    }
  }
};

const updateTransactionStatus = () => {
  // console.log("TRANSACTION UPDATED");
  const toDay = new Date();
  // console.log(toDay);
  Transaction.find()
    .then((trans) => {
      trans.forEach((tran) => {
        const compateDateStart = compareDate(toDay, tran.dateStart);
        const compateDateEnd = compareDate(toDay, tran.dateEnd);

        if (compateDateStart === "earlier" && compateDateEnd === "earlier") {
          Transaction.findByIdAndUpdate(tran._id, { status: "Booked" })
            .then((result) => {
              // console.log("Booked:", result);
            })
            .catch((err) => console.log("::ERROR:", err));
        }
        if (compateDateStart === "later" && compateDateEnd === "later") {
          Transaction.findByIdAndUpdate(tran._id, { status: "Checkout" })
            .then((result) => {
              // console.log("Checkout:", result);
            })
            .catch((err) => console.log("::ERROR:", err));
        }
        if (
          (compateDateStart === "same" && compateDateEnd === "earlier") ||
          (compateDateStart === "later" && compateDateEnd === "earlier")
        ) {
          Transaction.findByIdAndUpdate(tran._id, { status: "Checkin" })
            .then((result) => {
              // console.log("Checkin:", result);
            })
            .catch((err) => console.log("::ERROR:", err));
        }
      });
    })
    .catch((err) => console.log("::ERROR:", err));
};

exports.getdataHotel = (req, res, next) => {
  Hotel.find()
    .then((hotel) => {
      res.json(hotel);
    })
    .catch((err) => console.log(err));
};

exports.getdetailHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Hotel.findById(hotelId).then((data) => {
    res.json(data);
  });
};
exports.getAllroomID = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  // console.log("req.params:", req.params);
  const hotel = await Hotel.findById(hotelId);
  const rooms = await Promise.all(
    hotel.rooms.map((room) => {
      const roomDetail = Room.findById(room);
      return roomDetail;
    })
  );
  res.json(rooms);
};

exports.getnameHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  console.log(hotelId);
  Hotel.findById(hotelId)
    .select("title")
    .then((data) => res.json(data));
};

exports.search = async (req, res, next) => {
  const { destination, date, options } = req.body;
  const Hotel_destination = await Hotel.find({ city: destination });
  const rooms = await Room.find();
  let out_of_room = [];
  updateTransactionStatus(); // chỗ này làm cái gì em? mình 1 là await nó để nó đợi chạy chứ nó chạy sẽ ảnh hưởng data
  if (Hotel_destination.length > 0) {
    // đã await ròi thì .then làm gì nữa em, em khái báo biến rồi for trong đó cũng đc mà
    await Transaction.find({ status: "Booked" }).then((data) => {
      data.forEach((i) => {
        const dateInput_EndVSdate_Start = compareDate(
          new Date(date[0].endDate),
          i.dateStart
        );
        const dateInput_StartVSdate_End = compareDate(
          new Date(date[0].startDate),
          i.dateEnd
        );

        if (
          dateInput_EndVSdate_Start == "earlier" ||
          dateInput_StartVSdate_End == "later"
        ) {
          // console.log("phòng trống");
        } else {
          // console.log("phòng đã đặt");
          out_of_room.push({
            hotelId: i.hotel,
            rooms: i.room,
          });
        }
      });
    });

    await Transaction.find({ status: "Checkin" }).then((data) => {
      data.forEach((i) => {
        // const dateInput_EndVSdate_Start = compareDate(
        //   new Date(date[0].endDate),
        //   i.dateStart
        // );
        const dateInput_StartVSdate_End = compareDate(
          new Date(date[0].startDate),
          i.dateEnd
        );
        if (dateInput_StartVSdate_End == "earlier") {
          // console.log("phòng đã đặt");
          out_of_room.push({
            hotelId: i.hotel,
            rooms: i.room,
          });
        } else {
          // console.log("phòng trống");
        }
      });
    });
    const hotel = Hotel_destination.filter((hotel) => {
      let out_of_room_hotel = out_of_room.filter(
        (item) => hotel._id.toString() == item.hotelId.toString()
      );
      // console.log(out_of_room_hotel);
      // đếm số phòng đã đặt
      let count_out_of_room = 0;
      out_of_room_hotel.forEach((i) => {
        count_out_of_room += i.rooms.length;
      });
      // console.log(count_out_of_room);
      //đếm tất cả phòng có trong khách sạn
      let count_all_hotel = 0;
      // console.log("1");

      hotel.rooms.map((idroom) => {
        const room = rooms.find((e) => (e.id = idroom));
        // console.log("2");
        //  Room.findById(idroom).then((room) => {
        //   // console.log("171", room.roomNumbers.length);
        //   // console.log("123");
        count_all_hotel += Number(room.roomNumbers.length);
        // count_all_hotel = 2;
        // });
      });

      // console.log(hotel.name);
      // console.log("count 166", count_all_hotel);
      if (options.room + count_out_of_room <= count_all_hotel) {
        console.log("còn phòng");
        return true;
      } else {
        console.log("187:het roi ");
        return false;
      }
    });
    console.log(options.room);
    console.log("193", hotel);
    res.json(hotel);
  }
};
exports.getAllhotel = (req, res, next) => {
  Hotel.find().then((data) => res.json(data));
};
exports.getAllroom = (req, res, next) => {
  Room.find().then((data) => res.json(data));
};
exports.getRoombyId = (req, res, next) => {
  const id = req.params.idroom;
  Room.findById(id).then((data) => res.json(data));
};
exports.postAddhotel = (req, res, next) => {
  const nameInput = req.body.name;
  const cityInput = req.body.city;
  const distanceInput = req.body.distance;
  const descriptionInput = req.body.description;
  const imagesInput = req.body.images;
  const typeInput = req.body.type;
  const addressInput = req.body.address;
  const titleInput = req.body.title;
  const priceInput = req.body.price;
  let featuredInput;
  const roomsInput = req.body.rooms;
  if (req.body.featured == "true") {
    featuredInput = true;
  } else {
    featuredInput = false;
  }

  const hotel = new Hotel({
    address: addressInput,
    cheapestPrice: priceInput,
    city: cityInput,
    desc: descriptionInput,
    distance: distanceInput,
    featured: featuredInput,
    name: nameInput,
    photos: imagesInput,
    rooms: roomsInput,
    title: titleInput,
    type: typeInput,
  });
  console.log(titleInput);
  hotel.save();
};
// exports.postDeleteHotel = (req, res, next) => {
//   const id = req.body.id;
//   console.log(id);
//   Hotel.findByIdAndDelete(id);
// };
exports.postDeleteHotel = async (req, res) => {
  const hotelId = req.body.id;
  // console.log("hotelId:", hotelId);
  const foundTran = await Transaction.find({ hotel: hotelId }).select("status");
  if (foundTran.length === 0) {
    await Hotel.findByIdAndDelete(hotelId);
    res.end();
  } else {
    res.status(200).send("The hotel is booked by guests, can't delete");
  }
};
exports.postAddRoom = async (req, res, next) => {
  const { description, title, price, rooms, hotel, maxpeople } = req.body;
  console.log(description);
  let id = new Mongoose.Types.ObjectId();
  id = id.toString();
  const room = new Room({
    _id: id,
    desc: description,
    maxPeople: maxpeople,
    price: price,
    roomNumbers: rooms,
    title: title,
  });
  room.save();
  await Hotel.findByIdAndUpdate(hotel, {
    $push: { rooms: id },
  });
};
exports.postDeleteRoom = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  const tranList = await Transaction.find().select("idroom");
  // console.log(tranList);
  let roomIdList = [];
  tranList.forEach((tran) => {
    tran.idroom.forEach((item) => {
      roomIdList.push({ roomId: item });
    });
  });
  // console.log(roomIdList);
  const foundRoomId = roomIdList.find((item) => {
    return item.roomId.toString() == id.toString();
  });
  console.log(foundRoomId);
  if (foundRoomId) {
    res.status(200).send("This room is booked by guests, can't delete");
  } else {
    await Room.findByIdAndDelete(id);
    // console.log(hotelList);
    res.end();
  }
};
exports.getCount = async (req, res, next) => {
  let countUser = 0;
  let countOrder = 0;
  await User.find().then((data) => (countUser = data.length));
  await Transaction.find().then((data) => (countOrder = data.length));
  console.log("count", countUser);
  console.log("count1", countOrder);
  res.json({
    countOrder: countOrder,
    countUser: countUser,
  });
};
exports.postEditHotel = (req, res, next) => {
  const id = req.body.id;
  const nameInput = req.body.name;
  const cityInput = req.body.city;
  const distanceInput = req.body.distance;
  const descriptionInput = req.body.description;
  const imagesInput = req.body.images;
  const typeInput = req.body.type;
  const addressInput = req.body.address;
  const titleInput = req.body.title;
  const priceInput = req.body.price;
  let featuredInput;
  const roomsInput = req.body.rooms;
  if (req.body.featured == "true") {
    featuredInput = true;
  } else {
    featuredInput = false;
  }
  Hotel.findById(id).then((hotel) => {
    hotel.address = addressInput;
    hotel.cheapestPrice = priceInput;
    hotel.city = cityInput;
    hotel.desc = descriptionInput;
    hotel.distance = distanceInput;
    hotel.featured = featuredInput;
    hotel.name = nameInput;
    hotel.photos = imagesInput;
    hotel.rooms = roomsInput;
    hotel.title = titleInput;
    hotel.type = typeInput;
    return hotel.save();
  });
};

exports.postEditRoom = async (req, res, next) => {
  const { id, description, title, price, rooms, maxpeople } = req.body;
  Room.findById(id).then((room) => {
    room.desc = description;
    room.maxPeople = maxpeople;
    room.price = price;
    room.roomNumbers = rooms;
    room.title = title;
    return room.save();
  });
};
