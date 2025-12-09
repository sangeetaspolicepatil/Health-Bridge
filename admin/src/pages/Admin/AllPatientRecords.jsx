import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";

const AllPatientRecords = () => {
    const { aToken, backendUrl } = useContext(AdminContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllRecords = async () => {
            try {
                const { data } = await axios.get(backendUrl + `/api/admin/admin-patient-records`,
                    { headers: { aToken } }
                );
                if (data.success) setRecords(data.records);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchAllRecords();
    }, [aToken, backendUrl]);

    const downloadPDF = async (id) => {
        try {
            const response = await axios.get(backendUrl + `/api/admin/admin-patient-records/download/${id}`,
                { headers: { aToken }, responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `record_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log("Download error:", error);
        }
    };

    const viewPDF = (url) => {
        // Open the PDF in a new tab
        window.open(`${backendUrl}/${url}`, "_blank");
    };

    return (
        <div className="p-5 overflow-x-scroll bg-white border rounded text-sm max-h-[90vh] min-h-[70vh] overflow-y-scroll">
            <h2 className="text-2xl font-semibold mb-4">Patient Records</h2>

            {loading ? (
                <p>Loading...</p>
            ) : records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">Patient Name</th>
                            <th className="p-3 border">Patient Email</th>
                            <th className="p-3 border">Doctor Name</th>
                            <th className="p-3 border">Created At</th>
                            <th className="p-3 border">View</th>
                            <th className="p-3 border">Download</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...records].reverse().map((rec) => (
                            <tr key={rec._id}>
                                <td className="p-3 border">{rec.patientName}</td>
                                <td className="p-3 border">{rec.patientEmail}</td>
                                <td className="p-3 border">
                                    {rec.doctorId ? rec.doctorId.name : "Unknown"}
                                </td>
                                <td className="p-3 border">
                                    {new Date(rec.createdAt).toLocaleString()}
                                </td>
                                <td className="p-3 border">
                                    <button
                                        onClick={() => viewPDF(rec.pdfUrl)}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="p-3 border">
                                    <button
                                        onClick={() => downloadPDF(rec._id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div >
    );
};

export default AllPatientRecords;
