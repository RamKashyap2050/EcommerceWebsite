import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import ManageInventory from "./pages/ManageInventory";
import SignupPage from "./pages/UserSignup";
import LoginUser from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/adminaddcategory" element={<AddCategory />} />
        <Route path="/adminaddproduct" element={<AddProduct />} />
        <Route path="/adminmanageinventory" element={<ManageInventory />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
