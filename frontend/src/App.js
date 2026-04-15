import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./Pages/All";
import AllCategory from "./Pages/AllCategory";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import React from "react";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<All />} />
          <Route
            path="/buildings"
            element={<AllCategory banner={men_banner} category="buildings" />}
          />
          <Route
            path="/ships"
            element={<AllCategory banner={women_banner} category="ships" />}
          />
          <Route
            path="/others"
            element={<AllCategory banner={kid_banner} category="others" />}
          />
          <Route path="/product/:slugOrId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
