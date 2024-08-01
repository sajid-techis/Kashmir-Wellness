import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import Header from "../components/common/Header";
import CarouselComponent from "../components/common/Carousel";
import Offers from "../components/common/Offers";
import Categories from "../components/products/Categories";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../features/categories/categorySlice";
import SpecialtiesList from "../components/doctors/SpecialtiesList";
import Labs from "../components/labs/Labs";
import Products from "../components/products/Products";
import FeaturedDoctors from "../components/doctors/FeaturedDoctors";
import FeaturedLabs from "../components/labs/FeaturedLabs";

const LandingPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [ selectedCategory, dispatch]);

 

  return (
    <>
      <Header />
      <div className="mt-20 sm:mt-10">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="lg:py-24">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Your <span className="text-primary">Prescription</span> for
                  Affordable Health{" "}
                  <span className="text-primary">Solutions!</span>
                </h2>
                <p className="mt-4 text-gray-600 text-lg">
                  Elevate your health journey with exclusive discounts and
                  unparalleled convenience. Your path to well-being starts here,
                  where every purchase is a prescription for savings.
                </p>
                <Button gradientMonochrome="success" className="mt-10">Explore Now</Button>
              </div>
              <div>
                <CarouselComponent />
              </div>
            </div>
          </div>
        </section>
        <Offers />
        <Products/>
        <FeaturedDoctors/>
        <FeaturedLabs/>
      </div>
    </>
  );
};

export default LandingPage;
