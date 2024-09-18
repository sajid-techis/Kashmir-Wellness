import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../features/users/userSlice";


const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const response = await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
      } else {
        console.error("Failed to get image URL from response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        name,
        email,
        password,
        phoneNumber,
        image: imageUrl,
        address,
        city,
        state,
      })
    );
    if (registerUserThunk.fulfilled) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-gradient p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full space-y-6 "
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create an Account
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="phone"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg">
                <Spinner size="lg" />
              </div>
            )}
          </div>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="max-w-full mt-4 rounded-lg"
          />
        )}
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {status === "loading" ? <HashLoader size="sm" /> : "Register"}
        </Button>
        <div className='flex items-center justify-center gap-2 my-4'>
        <p>Don't have An Account</p>
        <Link to='/login' className='text-blue-500'>Login Here</Link>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Register;
