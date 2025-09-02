import React from 'react';
import {assets} from "../../assets/assets.js";

const Hero = ({heroImg, page}) => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                {page === 'Home' && (
                    <div>
                        <div className='flex items-center justify-center py-10 sm:py-0'>
                            <div className='text-[#414141]'>
                                <div className='flex items-center gap-2'>
                                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                                    <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
                                </div>
                                <h1 className='prata-regular text=3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest
                                    Arrivals</h1>
                                <div className='flex items-center gap-2'>
                                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {page === 'About' && (
                    <div>
                        <div className='text-[#414141]'>
                            <div className='flex items-center gap-2'>
                                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                                <p className='font-medium text-sm md:text-base'>YOUR SHOP</p>
                            </div>
                            <h1 className='prata-regular text=3xl sm:py-3 lg:text-5xl leading-relaxed'>The Story</h1>
                            <div className='flex items-center gap-2'>
                                <p className='font-semibold text-sm md:text-base'>YOUR ADVENTURE</p>
                                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <img src={heroImg} className='w-full sm:w-1/2'/>
        </div>
    )
}
export default Hero;
