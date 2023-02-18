import "./App.css";
import { Route, Routes } from "react-router-dom";
import InfoBoard from "./pages/InfoBoard/InfoBoard";
import HotelList from "./pages/hotel List/hotelList";
import RoomList from "./pages/room List/RoomList";
import Transaction from "./pages/transaction/Transaction";
import AddHotel from "./pages/addHotel/addhotel";
import AddRoom from "./pages/addRoom/addroom";
import Login from "./pages/login/login";
import EditHotel from "./pages/editHotel/edithotel";
import EditRoom from "./pages/editRoom/editRoom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<InfoBoard />}></Route>
      <Route path="/hotels" element={<HotelList />}></Route>
      <Route path="/rooms" element={<RoomList />}></Route>
      <Route path="/transactions" element={<Transaction />}></Route>
      <Route path="/add-hotel" element={<AddHotel />}></Route>
      <Route path="/add-room" element={<AddRoom />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/edit-hotel/:idhotel" element={<EditHotel />}></Route>
      <Route path="/edit-room/:idroom" element={<EditRoom />}></Route>
    </Routes>
  );
}

export default App;
