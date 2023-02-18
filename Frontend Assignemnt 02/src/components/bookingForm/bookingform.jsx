import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./bookingForm.css";

const BookingForm = (props) => {
  const navigate = useNavigate();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const CardNumberRef = useRef();
  const paymentmethodRef = useRef();

  const params = useParams();
  const user = useSelector((state) => state);
  const [rooms, setRooms] = useState([]);
  const [bookedRoom, setbookedRoom] = useState([]);
  const [idroom, setidroom] = useState([]);
  const [datesInRange, setDatesInRange] = useState([]);
  const [hotelinTrans, setHotelinTrans] = useState([]);

  let [totalPrice, setTotalPrice] = useState(0);
  // console.log(user);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const getRoomHotel = () => {
      fetch(`http://localhost:5000/hotel-room/${params.hotelId}`)
        .then((res) => res.json())
        .then((data) => setRooms(data));
    };

    const getDatesInRange = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());
      const dates = [];
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }

      setDatesInRange(dates);
    };
    const getHotelinTrans = () => {
      fetch(`http://localhost:5000/hotel-trans/${params.hotelId}`)
        .then((res) => res.json())
        .then((data) => setHotelinTrans(data));
    };
    if (endDate.getTime() != startDate.getTime()) {
      getRoomHotel();
      getDatesInRange();
      getHotelinTrans();
      // console.log(roomsOfHotel);
    }
  }, [date]);

  const isAvailable = (NumberRoom) => {
    let hotelRoom = hotelinTrans.filter((i) => i.room.includes(NumberRoom));
    // console.log(hotelRoom);
    let isFound = false;
    hotelRoom.map((i) => {
      const start = new Date(i.dateStart);
      const end = new Date(i.dateEnd);
      const date = new Date(start.getTime());
      const dates = [];
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
      // console.log(dates);
      isFound = dates.some((date) =>
        datesInRange.includes(new Date(date).getTime())
      );
      if (isFound) {
        // console.log("dung");
        return;
      }
    });
    return isFound;
  };
  // console.log(isAvailable(202));
  // console.log(new Date(date[0].endDate).getTime());
  const renderRoom = () => {
    return (
      <div className="container2">
        {rooms.map((room) => {
          return (
            <div className="container2-2">
              <div>
                <h4>{room.title}</h4>
                <p>{room.desc}</p>
                <p>Max people: {room.maxPeople}</p>
                <p>${room.price}</p>
              </div>
              <section className="container2-3">
                {room.roomNumbers.map((r, index) => {
                  return (
                    <form key={index} className="container2-3_1">
                      <label htmlFor="">{r}</label>
                      <div>
                        <input
                          name={r}
                          type="checkbox"
                          // value={item._id}
                          onChange={(event) =>
                            handleRoomPicking(event, room.price, r, room._id)
                          }
                          disabled={isAvailable(r)}
                        />
                      </div>
                    </form>
                  );
                })}
              </section>
            </div>
          );
        })}
      </div>
    );
  };
  const handleRoomPicking = (event, price, room, idr) => {
    console.log(idr);
    if (event.target.checked == true) {
      setTotalPrice((totalPrice += price * datesInRange.length));
      setbookedRoom([...bookedRoom, room]);
      setidroom([...idroom, idr]);
    } else {
      console.log("false");
      setbookedRoom(bookedRoom.filter((item) => item !== room));
      setTotalPrice(
        (totalPrice -=
          price * (date[0].endDate.getDate() - date[0].startDate.getDate() + 1))
      );
      setidroom(idroom.filter((id) => id !== idr));
    }
  };
  console.log("id", idroom);
  // console.log(date[0].endDate.getDate() - date[0].startDate.getDate() + 1);
  const checkInput = () => {
    if (
      fullnameRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      phoneRef.current.value !== "" &&
      CardNumberRef.current.value !== "" &&
      paymentmethodRef.current.value !== "" &&
      totalPrice != 0
    ) {
      return true;
    } else return false;
  };
  const handleReserve = () => {
    console.log(paymentmethodRef.current.value);
    if (checkInput()) {
      alert("Đặt phòng thành công");
      if (datesInRange.length == 0) {
        setTotalPrice(0);
      }
      console.log(true);
      fetch("http://localhost:5000/reserve", {
        method: "POST",
        body: JSON.stringify({
          user: user,
          hotel: params.hotelId,
          room: bookedRoom,
          dateStart: date[0].startDate,
          dateEnd: date[0].endDate,
          price: totalPrice,
          payment: paymentmethodRef.current.value,
          namehotel: props.namehotel,
          idrooms: idroom,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(`/trans/${user.username}`);
    } else console.log(false);
  };
  // console.log(props.namehotel);
  return (
    <div className="container">
      <div className="container1">
        <div>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <form>
          <h3>Reserve Info</h3>
          <label>Your Full Name</label>
          <div>
            <input
              className="inputForm"
              placeholder="Full name"
              defaultValue={user.fullName}
              ref={fullnameRef}
            ></input>
          </div>
          <label>Your Email</label>
          <div>
            <input
              className="inputForm"
              placeholder="Email"
              defaultValue={user.email}
              ref={emailRef}
            ></input>
          </div>
          <label>Your Phone Number</label>
          <div>
            <input
              className="inputForm"
              placeholder="Phone Number"
              defaultValue={user.phoneNumber}
              ref={phoneRef}
            ></input>
          </div>
          <label>Your Identity Card Number</label>
          <div>
            <input
              className="inputForm"
              placeholder="Card Number"
              ref={CardNumberRef}
            ></input>
          </div>
        </form>
      </div>
      <div>
        <h3>Select Rooms</h3>
        {rooms.length > 0 && renderRoom()}
      </div>
      <div>
        <h3>Total Bill: ${totalPrice}</h3>
        <div className="finalCheck__wrapper">
          <select className="finalCheck__options" ref={paymentmethodRef}>
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <div className="finalCheck__button">
            <button onClick={handleReserve}>Reserve Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
