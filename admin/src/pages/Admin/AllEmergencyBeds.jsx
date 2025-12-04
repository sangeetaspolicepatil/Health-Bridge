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

    const getStatusBadge = (item) => {
        if (item.cancelled) {
            return (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                    Cancelled
                </span>
            );
        } else if (item.completed) {
            return (
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                    Completed
                </span>
            );
        }
        return (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                Active
            </span>
        );
    };

    return (
        <div className="p-5">
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
                        {[...emergencyBeds].reverse().map((item) => (
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

                                <td className="py-2 px-4 border">
                                    {item.completed || item.cancelled ? (
                                        <span className="text-gray-400 text-sm">
                                            No Actions
                                        </span>
                                    ) : (
                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => handleComplete(item._id)}
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg shadow"
                                            >
                                                Mark Complete
                                            </button>

                                            <button
                                                onClick={() => handleCancel(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg shadow"
                                            >
                                                Cancel
                                            </button>

                                        </div>
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
