import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllEmergencyBeds = () => {
    const {
        emergencyBeds,
        getAllEmergencyBeds,
        completeEmergencyBed,
        cancelEmergencyBed,
    } = useContext(AdminContext);

    useEffect(() => {
        getAllEmergencyBeds();
    }, []);

    const handleComplete = async (id) => {
        await completeEmergencyBed(id);
    };

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel?")) {
            await cancelEmergencyBed(id);
        }
    };

    // Status badge UI
    const getStatusBadge = (b) => {
        if (b.status === "cancelled")
            return (
                <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs border border-red-200">
                    Cancelled
                </span>
            );

        if (b.status === "completed")
            return (
                <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs border border-green-200">
                    Completed
                </span>
            );

        return (
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs border border-blue-200">
                Booked
            </span>
        );
    };

    return (
        <div className="p-5 overflow-x-scroll bg-white border rounded text-sm max-h-[90vh] min-h-[70vh] overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-5">Emergency Bed Bookings</h2>

            {!Array.isArray(emergencyBeds) ? (
                <p>Loading...</p>
            ) : emergencyBeds.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Patient Name</th>
                            <th className="py-2 px-4 border">Bed Type</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Time</th>
                            <th className="py-2 px-4 border">Amount</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {emergencyBeds.map((item) => (
                            <tr key={item._id} className="text-center">
                                <td className="py-2 px-4 border">
                                    {item.userId?.name || "Unknown"}
                                </td>
                                <td className="py-2 px-4 border">{item.bedType}</td>
                                <td className="py-2 px-4 border">
                                    {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border">{item.time}</td>
                                <td className="py-2 px-4 border">₹{item.amount}</td>

                                <td className="py-2 px-4 border">
                                    {getStatusBadge(item)}
                                </td>

                                <td className="border px-4 py-3">
                                    {/* ACTION BUTTONS BASED ON STATUS */}
                                    {item.status === "booked" ? (
                                        <div className="flex flex-col gap-2 items-center">
                                            <button
                                                className="px-3 py-1.5 text-xs bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm"
                                                onClick={() => handleComplete(item._id)}
                                            >
                                                Mark Completed
                                            </button>

                                            <button
                                                className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                                                onClick={() => handleCancel(item._id)}
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs">
                                            No Actions
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllEmergencyBeds;
