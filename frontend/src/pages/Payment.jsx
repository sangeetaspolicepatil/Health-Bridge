import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Payment = () => {
    const { backendUrl, token, currencySymbol } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Get appointment info from state
    const { appointmentId, docInfo, slotDate, slotTime, amount } = location.state || {};

    // Redirect if no appointment info
    useEffect(() => {
        if (!appointmentId) {
            toast.error('No appointment found');
            navigate('/');
        }
    }, [appointmentId, navigate]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(backendUrl + `/api/user/dummy-pay`,
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success('Payment Successful!');
                navigate('/my-appointments');
            } else {
                toast.error(data.message || 'Payment failed');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Payment error');
        }
        setLoading(false);
    };

    if (!appointmentId) return null; // Prevent rendering without appointment

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Payment</h2>

            <div className="mb-4">
                <p><strong>Doctor:</strong> {docInfo.name}</p>
                <p><strong>Speciality:</strong> {docInfo.speciality}</p>
                <p><strong>Date:</strong> {slotDate.replace(/_/g, '/')}</p>
                <p><strong>Time:</strong> {slotTime}</p>
                <p><strong>Amount:</strong> {currencySymbol}{amount}</p>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-lg w-full"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default Payment;
