import React from "react";
import { Button } from "flowbite-react";
import CarouselComponent from "../components/common/Carousel";
import Offers from "../components/common/Offers";
import FeaturedDoctors from "../components/doctors/FeaturedDoctors";
import FeaturedLabs from "../components/labs/FeaturedLabs";
import FeaturedProducts from "../components/products/FeaturedProducts";
import UniversalSearch from "../components/common/UniversalSearch";

const LandingPage = () => {
  return (
    <>
    <div className="w-full lg:max-w-xl mx-auto sticky top-0 z-30" >
    <UniversalSearch/>
    </div>
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
        <FeaturedProducts />
        <FeaturedDoctors />
        <FeaturedLabs />
    </>
  );
};

export default LandingPage;
