import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = "https://health-bridge-bkd.onrender.com";

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    // New states for patient records
    const [myPatientsRecords, setMyPatientsRecords] = useState([])
    const [allPatientsRecords, setAllPatientsRecords] = useState([])

    const getAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    const completeAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const loadMyPatientsRecords = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/doctor/doctor-patients-records`, { headers: { dToken } })
            if (data.success) setMyPatientsRecords(data.records)
        } catch (error) { console.log(error) }
    }

    const loadAllPatientsRecords = async (search = "") => {
        try {
            const url = search
                ? backendUrl + `/api/doctor/search?search=${search}`
                : backendUrl + `/api/doctor/search?search=all`
            const { data } = await axios.get(url, { headers: { dtoken: dToken } })
            if (data.success) setAllPatientsRecords(data.records)
            else setAllPatientsRecords([])
        } catch (error) { console.log(error); setAllPatientsRecords([]) }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments,
        getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData,
        myPatientsRecords, loadMyPatientsRecords,
        allPatientsRecords, loadAllPatientsRecords
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
