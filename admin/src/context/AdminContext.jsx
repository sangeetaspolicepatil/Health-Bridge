import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [emergencyBeds, setEmergencyBeds] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [patientRecords, setPatientRecords] = useState([]);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // ------------------ DOCTORS ------------------
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                { headers: { aToken } }
            );
            if (data.success) setDoctors(data.doctors);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { docId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ------------------ APPOINTMENTS ------------------
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                headers: { aToken },
            });
            if (data.success) setAppointments(data.appointments);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/cancel-appointment`,
                { appointmentId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ------------------ EMERGENCY BEDS (FIXED) ------------------
    const getAllEmergencyBeds = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/emergency-beds`, {
                headers: { aToken },
            });

            console.log("Backend emergency beds response:", data);

            // FIXED HERE: API returns "beds", not "bookings"
            if (data.success) setEmergencyBeds(data.beds);
            else toast.error(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const completeEmergencyBed = async (bookingId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/emergency-bed-complete`,
                { bookingId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllEmergencyBeds();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelEmergencyBed = async (bookingId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/emergency-bed-cancel`,
                { bookingId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllEmergencyBeds();
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ------------------ DASHBOARD ------------------
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
                headers: { aToken },
            });
            if (data.success) setDashData(data.dashData);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllPatientRecords = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/admin-patient-records`, {
                headers: { aToken },
            });
            if (data.success) setPatientRecords(data.records);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };




    // ------------------ CONTEXT VALUES ------------------
    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        emergencyBeds,
        getAllEmergencyBeds,
        completeEmergencyBed,
        cancelEmergencyBed,
        dashData,
        getDashData,
        patientRecords,
        getAllPatientRecords,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
