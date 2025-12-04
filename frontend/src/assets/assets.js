import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import record_icon from './record_icon.svg'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    record_icon
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Sharma',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Dr. Rajesh Sharma is a dedicated General Physician with 10 years of experience providing compassionate and comprehensive healthcare. He specializes in preventive care and ensures personalized treatment for each patient. Known for his professionalism and patient-centric approach, he strives to promote overall well-being.',
        fees: 300,
        address: {
            line1: '17th Cross, Davalagiri',
            line2: 'Toll Naka, Dharwad'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Kavya Shetty',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Kavya Shetty is a skilled Gynecologist with 5 years of experience in women’s health. She specializes in prenatal care, reproductive health, and preventive medicine. Known for her compassionate approach, she provides personalized care to every patient.',
        fees: 500,
        address: {
            line1: '27th Cross, Chruch',
            line2: 'Ring Road, Dharwad'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Suresh Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Suresh Patel is a skilled Dermatologist with 3 years of experience in treating skin, hair, and nail conditions. He focuses on preventive care and patient education. Known for his friendly and approachable manner, he provides personalized treatment to every patient.',
        fees: 400,
        address: {
            line1: "37th Cross, Navanagar",
            line2: "Dharwad, Karnataka 580001"
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Anil Verma',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Anil Verma is a dedicated Pediatrician with 2 years of experience caring for infants and children. He focuses on preventive health and immunizations. Known for his gentle approach, he ensures a comfortable experience for young patients and their families.',
        fees: 500,
        address: {
            line1: "47th Cross, Vidyanagar",
            line2: "Dharwad, Karnataka 580001"
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Aishwarya Uday',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Aishwarya Uday is a skilled Neurologist with 5 years of experience in diagnosing and treating neurological disorders. She specializes in patient-focused care and advanced treatment methods. Known for her empathetic approach, she ensures personalized attention for every patient.',
        fees: 1000,
        address: {
            line1: "14th Main, KCD Layout",
            line2: "Dharwad, Karnataka 580007"
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Vikram Shetty',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Vikram Shetty is a dedicated Neurologist with 2 years of experience in diagnosing and treating neurological disorders. He focuses on patient-centered care and preventive neurology. Known for his approachable and empathetic manner, he ensures personalized attention for every patient.',
        fees: 400,
        address: {
            line1: "47th Cross, Jubilee Circle",
            line2: "Dharwad, Karnataka 580001"
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Sanjay Kumar',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Sanjay Kumar is a dedicated General Physician with 3 years of experience providing comprehensive healthcare. He focuses on preventive medicine and patient-centered care. Known for his professional and compassionate approach, he ensures personalized treatment for every patient.',
        fees: 300,
        address: {
            line1: "5th Main, KCD Layout",
            line2: "Dharwad, Karnataka 580007"
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Akshay Patil',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Akshay Patil is a skilled Gynecologist with 3 years of experience in women’s health. He specializes in prenatal care, reproductive health, and preventive medicine. Known for his compassionate approach, he provides personalized care to every patient.',
        fees: 500,
        address: {
            line1: "9th Cross, Hosur Layout",
            line2: "Dharwad, Karnataka 580003"
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Risha Patil',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Risha Patil is a dedicated Dermatologist with 2 years of experience in treating skin, hair, and nail conditions. She focuses on preventive care and patient education. Known for her professional and approachable manner, she provides personalized treatment to every patient.',
        fees: 500,
        address: {
            line1: "5th Main, Bhavanishankar Layout",
            line2: "Dharwad, Karnataka 580008"
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Arnav Kulkarni',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Arnav Kulkarni is an experienced Pediatrician with 7 years of expertise in child healthcare. He focuses on preventive care, immunizations, and personalized treatment plans. Known for his gentle and caring approach, he ensures a comfortable experience for young patients and their families.',
        fees: 400,
        address: {
            line1: "18th Cross, Maratha Colony",
            line2: "Dharwad, Karnataka 580002"
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Ananya Sharma',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Anaya Sharma is a dedicated Neurologist with 1 year of experience in diagnosing and treating neurological conditions. She focuses on patient-centered care and preventive neurology. Known for her empathetic and approachable manner, she ensures personalized attention for every patient.',
        fees: 400,
        address: {
            line1: "5th Cross, Gokul Road",
            line2: "Hubli, Karnataka 580030"
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Pratik Jadhav',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Pratik Jadhav has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.Known for his compassionate and approachable manner, he provides personalized care to every patient.',
        fees: 500,
        address: {
            line1: "10th Main, Gandhi Nagar",
            line2: "Hubli, Karnataka 580039"
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Meera Joshi',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. Meera Joshi is a dedicated General Physician with 8 years of experience providing comprehensive healthcare. She focuses on preventive medicine and patient-centered care. Known for her professional and compassionate approach, she ensures personalized treatment for every patient.',
        fees: 800,
        address: {
            line1: "3rd Cross, Anand Nagar",
            line2: "Hubli, Karnataka 580032"
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Siddharth Rao',
        image: doc14,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Siddharth Rao is a skilled Gynecologist with 3 years of experience in women’s health. He specializes in prenatal care, reproductive health, and preventive medicine. Known for his compassionate and approachable manner, he provides personalized care to every patient.',
        fees: 600,
        address: {
            line1: "8th Cross, Shantinagar",
            line2: "Hubli, Karnataka 580037"
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Priya H',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Priya H is an experienced Dermatologist with 9 years of expertise in treating skin, hair, and nail conditions. She emphasizes preventive care and patient education. Known for her professional and approachable manner, she provides personalized treatment to every patient.',
        fees: 800,
        address: {
            line1: "6th Cross, Siddharth Colony",
            line2: "Hubli, Karnataka 580038"
        }
    },
]