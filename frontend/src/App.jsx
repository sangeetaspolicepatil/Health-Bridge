import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MyBedBookings from "./pages/MyBedBookings";
import MyRecords from "./pages/MyRecords"; // <-- Import the new page
import Payment from './pages/Payment';
import BookBed from "./pages/BookBed";
import PaymentBed from "./pages/PaymentBed";


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%] pt-24'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/book-bed" element={<BookBed />} />
        <Route path="/book-and-pay" element={<PaymentBed />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path="/my-bed-bookings" element={<MyBedBookings />} />
        <Route path="/my-records" element={<MyRecords />} /> {/* <-- NEW ROUTE */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App