import React, { useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from "../../assets/images/Logo4.jpeg";
import LogoutButton from "../users/LogoutButton";
import { getCartItemsThunk } from '../../features/carts/cartSlice';

const Header = () => {
  const { userInfo, token } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items || []);
  const isAuthenticated = !!token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCartItemsThunk());
    }
  }, [dispatch, token]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-white shadow-lg"
    >
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9 rounded-full" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl sm:text-lg md:text-xl font-semibold text-primary">
          Kashmir Wellness
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center space-x-4">
        {isAuthenticated && userInfo ? (
          <Dropdown className="z-50" arrowIcon={false} inline label={
            <Avatar
              alt="User settings"
              img={
                userInfo.image ||
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }>
            <Dropdown.Header>
              <span className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{userInfo.name}</p>
              </span>
            </Dropdown.Header>
            <Dropdown.Item>{userInfo.email}</Dropdown.Item>
            <Dropdown.Item>{userInfo.phoneNumber}</Dropdown.Item>
            <Dropdown.Item onClick={handleProfile}>Full Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <LogoutButton /> 
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Button gradientMonochrome="success" className="bg-primary text-xs md:text-sm lg:text-base">
              <Link to="/login">Login</Link>
            </Button>
            <Button gradientMonochrome="success" className="bg-primary text-xs md:text-sm lg:text-base">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
        <div className="relative  items-center hidden lg:flex">
          <Button
            gradientMonochrome="success"
            className="bg-primary text-xs md:text-sm lg:text-base"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="text-lg md:text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-primary hover:underline  ${isActive ? "text-secondary" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-primary hover:underline ${isActive ? "text-secondary" : ""}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `text-primary hover:underline ${isActive ? "text-secondary" : ""}`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-primary hover:underline  ${isActive ? "text-secondary" : ""}`
          }
        >
          Contact
        </NavLink>
        {!isAuthenticated && (
          <div className="flex flex-col space-y-4 md:hidden">
            <Button className="bg-primary text-xs md:text-sm lg:text-base">
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-primary text-xs md:text-sm lg:text-base">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
