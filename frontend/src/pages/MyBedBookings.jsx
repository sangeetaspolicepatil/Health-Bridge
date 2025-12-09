import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyBedBookings = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const res = await axios.get(backendUrl + `/api/bed/my-bookings`, { headers: { token } });
            if (res.data.success) setBookings(res.data.bookings);
        } catch {
            toast.error("Failed to fetch bookings");
        }
    };

    useEffect(() => {
        if (token) fetchBookings();
    }, [token]);

    const cancelBooking = async (id) => {
        try {
            const res = await axios.post(backendUrl + `/api/bed/cancel`, { bookingId: id }, { headers: { token } });
            if (res.data.success) {
                toast.success("Booking Cancelled");
                fetchBookings();
            }
        } catch {
            toast.error("Cancel failed");
        }
    };


    const getStatusBadge = (b) => {
        if (b.status === "cancelled")
            return <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs border border-red-200">Cancelled</span>;

        if (b.status === "completed")
            return <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs border border-green-200">Completed</span>;

        return <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full text-xs border border-yellow-200">Booked</span>;
    };


    return (
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-zinc-700 border-b pb-2">My Bed Bookings</h2>
            {bookings.length === 0 ? <p className="text-zinc-500 mt-4">No bed bookings yet</p> :
                <div className="overflow-x-auto mt-3">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-zinc-700 text-sm">
                                <th className="border border-gray-200 px-4 py-3 text-left">Bed Type</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Date</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Time</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Amount</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Status</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-zinc-700">
                            {bookings.map((b) => (
                                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-200 px-4 py-3">{b.bedType}</td>
                                    <td className="border border-gray-200 px-4 py-3">{new Date(b.date).toLocaleDateString()}</td>
                                    <td className="border border-gray-200 px-4 py-3">{b.time}</td>
                                    <td className="border border-gray-200 px-4 py-3">₹{b.amount}</td>
                                    <td className="border border-gray-200 px-4 py-3">{getStatusBadge(b)}</td>
                                    <td className="border border-gray-200 px-4 py-3">
                                        {b.status === "cancelled" || b.status === "completed" ? (
                                            <span className="text-gray-400 text-xs">No Actions</span>
                                        ) : (
                                            <button
                                                className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg transition shadow-sm"
                                                onClick={() => cancelBooking(b._id)}
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default MyBedBookings;
