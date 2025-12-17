import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { use } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = "https://health-bridge-bkd.onrender.com";

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)
    const [myRecords, setMyRecords] = useState([]);


    const getDoctorsData = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getMyRecords = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/my-records', {
                headers: { token }
            });

            if (data.success) {
                setMyRecords(data.records);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        myRecords, getMyRecords
    }


    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {

        if (token) {
            loadUserProfileData()
            getMyRecords();
        }
        else {
            setUserData(false)
            setMyRecords([]);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
