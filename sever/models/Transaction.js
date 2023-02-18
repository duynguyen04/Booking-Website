const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  hotel: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
  room: { type: Array, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
  namehotel: { type: String, required: true },
  idroom: { type: Array, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
