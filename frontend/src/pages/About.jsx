import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>

            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
                    <p>
                        Health Bridge is a smart healthcare platform built to simplify the way patients connect with hospitals and doctors. We provide easy online appointment booking, digital health records, real-time bed availability, and secure online payments—all in one place. Our goal is to make healthcare faster, more convenient, and accessible for everyone.
                    </p>
                    <p>
                        For hospitals and medical professionals, we offer a powerful centralized dashboard that streamlines daily operations, improves coordination, and enhances patient care. With a strong focus on security, accuracy, and efficiency, Health Bridge is committed to transforming healthcare through innovative, reliable, and user-friendly technology.
                    </p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>
                        Our vision is to create a smart, connected healthcare ecosystem where technology makes medical services simple, accessible, and efficient for everyone. We aim to empower hospitals and doctors with powerful digital tools, ensure secure and transparent patient care, and provide a seamless experience that bridges every gap in the healthcare journey.
                    </p>
                </div>
            </div>
            <div className='text-xl my-4'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>
            <div className='flex flex-col md:flex-row md-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Efficiency:</b>
                    <p>
                        We streamline healthcare processes with fast, automated workflows that save time and improve accuracy.
                    </p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Convenience:</b>
                    <p>
                        We make healthcare easily accessible by allowing patients and providers to manage everything online, anytime and from anywhere.
                    </p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Personalization:</b>
                    <p>
                        We tailor the healthcare experience to each patient’s needs, offering customized services, reminders, and recommendations.
                    </p>
                </div>
            </div>
        </div >
    )
}

export default About