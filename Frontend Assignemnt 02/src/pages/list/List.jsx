import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [resHotels, setResHotels] = useState([]);

  useEffect(() => {
    // async function fetchSearchHotel() {
    //   await axios
    //     .post("/search", {
    //       destination: destination,
    //       date: date,
    //       options: options,
    //     })
    //     .then((res) => setResHotels(res.data));
    // }
    // fetchSearchHotel();

    fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify({
        destination: destination,
        date: date,
        options: options,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setResHotels(data));
  }, []);
  const Searchhanle = () => {
    console.log(destination, date, options);
    fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify({
        destination: destination,
        date: date,
        options: options,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setResHotels(data));
  };

  console.log(resHotels);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) => {
                      setOptions({ ...options, adult: Number(e.target.value) });
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) => {
                      setOptions({ ...options, room: Number(e.target.value) });
                    }}
                  />
                </div>
              </div>
            </div>
            <button onClick={Searchhanle}>Search</button>
          </div>
          <div className="listResult">
            {resHotels.map((data) => {
              return <SearchItem data={data} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
