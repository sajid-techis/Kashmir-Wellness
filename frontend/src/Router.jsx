import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/products/ProductDetails";
import DoctorList from "./components/doctors/DoctorList";
import Layout from "./layout/Layout";
import LabDetails from "./components/labs/LabDetails";
import ProductsList from "./components/products/ProductsList";
import Categories from "./components/products/Categories";
import SpecialtiesList from "./components/doctors/SpecialtiesList";
import Labs from "./components/labs/Labs";
import TestSearchPage from "./containers/TestSearchPage";
import Cart from "./components/carts/Cart";
import BookAppointment from "./components/appointments/BookAppointment";
import DoctorAppointments from "./components/doctors/AppointmentDetails";
import UserAppointments from "./components/appointments/UserAppointments";
import AppointmentDetails from "./components/appointments/AppointmentDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<TestSearchPage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/specialty" element={<SpecialtiesList />} />
          <Route path="/specialty/:specialtyId" element={<DoctorList />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/labs/:id" element={<LabDetails />} />
          <Route path="/appointment-details/:appointmentId" element={<DoctorAppointments />} />
          <Route path="/user/:patientId/appointments" element={<UserAppointments />} />
          <Route path="/appointment/:appointmentId" element={<AppointmentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
