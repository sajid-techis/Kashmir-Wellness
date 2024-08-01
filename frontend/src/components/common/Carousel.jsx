import React from 'react'
import {Carousel} from 'flowbite-react'


const CarouselComponent = () => {
  return (
    <div className=" h-56 grid-cols-2 gap-4 sm:h-64 xl:h-96 2xl:h-96">
      <Carousel slide={true} leftControl rightControl>
        <img src='https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382368/Category-Images/carousel-img-1_micvzq.jpg' alt="..." />
        <img src='https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/carousel-img-2_emdbhf.jpg' alt="..." />
        <img src='https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/carousel-img-3_uxpefb.jpg' alt="..." />
        <img src='https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/carousel-img-4_ynodeu.jpg' alt="..." />
        <img src='https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/carousel-img-5_dnny9y.jpg' alt="..." />
      </Carousel>

    </div>
  )
}

export default CarouselComponent;
