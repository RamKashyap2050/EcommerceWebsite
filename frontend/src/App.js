import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginadmin" element={<LoginAdmin />}/>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
