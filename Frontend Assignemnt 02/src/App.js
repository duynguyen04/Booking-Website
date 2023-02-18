import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Transaction from "./components/transaction/transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:hotelId" element={<Hotel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trans/:username" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
