import React from 'react';
import offerIcon from '../../assets/images/discount-icon.png';
import deliveryIcon from '../../assets/images/dilivery-icon.png';
import doctorIcon from '../../assets/images/doctor-icon.png';
import healthIcon from '../../assets/images/health-icon.png';
import rightIcon from '../../assets/images/right-arrow-icon.png';

const Offers = () => {
  return (
    <div className='w-[90%] mx-auto gap-4 flex flex-wrap justify-between items-center sm:w-[80%]'>
      <div className='flex justify-between items-center bg-offer p-4 rounded-lg w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]'>
        <div className='flex items-center gap-4'>
          <img src={offerIcon} alt="discount-icon" className='w-8 h-8 md:w-10 md:h-10' />
          <p className='text-sm md:text-lg font-bold'>Get 25% <br /> OFF</p>
        </div>
        <img src={rightIcon} alt="right-icon" className='w-4 h-4 md:w-6 md:h-6' />
      </div>
      <div className='flex justify-between items-center bg-delivery p-4 rounded-lg w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]'>
        <div className='flex items-center gap-4'>
          <img src={deliveryIcon} alt="discount-icon" className='w-8 h-8 md:w-10 md:h-10' />
          <p className='text-sm md:text-lg font-bold'>Free Home <br /> Delivery</p>
        </div>
        <img src={rightIcon} alt="right-icon" className='w-4 h-4 md:w-6 md:h-6' />
      </div>
      <div className='flex justify-between items-center bg-doctor p-4 rounded-lg w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]'>
        <div className='flex items-center gap-4'>
          <img src={doctorIcon} alt="discount-icon" className='w-8 h-8 md:w-10 md:h-10' />
          <p className='text-sm md:text-lg font-bold'>Doctor's <br/> Appointment</p>
        </div>
        <img src={rightIcon} alt="right-icon" className='w-4 h-4 md:w-6 md:h-6' />
      </div>
      <div className='flex justify-between items-center bg-health p-4 rounded-lg w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]'>
        <div className='flex items-center gap-4'>
          <img src={healthIcon} alt="discount-icon" className='w-8 h-8 md:w-10 md:h-10' />
          <p className='text-sm md:text-lg font-bold'>Health <br/> Advice </p>
        </div>
        <img src={rightIcon} alt="right-icon" className='w-4 h-4 md:w-6 md:h-6' />
      </div>
    </div>
  );
}

export default Offers;


