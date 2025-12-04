import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/*-----Left Section-----*/}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Our aim is to connect you with reliable healthcare professionals. From choosing the right doctor to booking an appointment, we’re here to make your health journey smoother.</p>
                </div>
                {/*-----Middle Section-----*/}
                <div>
                    <p className='text-xl font-medium md-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Private Policy</li>
                    </ul>
                </div>
                {/*-----Right Section-----*/}
                <div>
                    <p className='text-xl font-medium md-5'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-212-456-7890</li>
                        <li>healthbridge@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* ---------Copy Right Text-------*/}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ Health-Brigde - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer