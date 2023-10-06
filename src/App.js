import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateRouter/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Addproduct from "./components/product/Addproduct";
import NotFound from "./components/notFound/NotFound";
import Viewproduct from "./components/product/Viewproduct";
import Updateproduct from "./components/product/Updateproduct";
function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/add" element={<PrivateRoute />}>
          <Route index element={<Addproduct />} />
        </Route>
        <Route path="/view" element={<PrivateRoute />}>
          <Route index element={<Viewproduct />} />
          <Route path="update/:id" element={<Updateproduct />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
