const Transaction = require("../models/Transaction");
const Mongoose = require("mongoose");

const checkCheckinOrBooked = (startDate) => {
  const today = new Date();
  const date = new Date(startDate);

  if (date.getUTCFullYear() > today.getUTCFullYear()) {
    return "Booked";
  } else {
    if (date.getUTCMonth() > today.getUTCMonth()) {
      return "Booked";
    } else {
      if (date.getUTCDate() + 1 > today.getUTCDate()) {
        return "Booked";
      } else if (date.getUTCDate() + 1 === today.getUTCDate()) {
        return "Checkin";
      }
    }
  }
};

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

exports.postAddTransaction = (req, res, next) => {
  const {
    user,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    namehotel,
    idrooms,
  } = req.body;
  const newTran = new Transaction({
    user: user.username,
    hotel: hotel,
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: checkCheckinOrBooked(dateStart),
    namehotel: namehotel,
    idroom: idrooms,
  });
  newTran.save();
};
exports.getHotelinTrans = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Transaction.find({ hotel: new Mongoose.Types.ObjectId(hotelId) }).then(
    (data) => {
      res.json(data);
    }
  );
};
exports.getTrans = (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  updateTransactionStatus();
  Transaction.find({ user: username }).then((data) => res.json(data));
};

exports.getLastestTransaction = async (req, res) => {
  try {
    const lastestList = await Transaction.find()
      .sort({ $natural: -1 })
      .limit(8);
    if (lastestList.length > 0) {
      // console.log("lastestList:", lastestList);
      res.send(lastestList);
    } else {
      res.statusMessage = "No Transaction Found";
      res.status(404).end();
    }
  } catch (err) {
    console.log("err:", err);
  }
};

exports.getTransactiom = (req, res, next) => {
  Transaction.find().then((data) => res.json(data));
};
