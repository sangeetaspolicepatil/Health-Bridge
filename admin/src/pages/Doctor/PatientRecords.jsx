import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

const PatientRecords = () => {
    const { backendUrl, dToken } = useContext(DoctorContext);
    const [search, setSearch] = useState("");
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadRecords = async () => {
        if (!search) return; // don't search empty
        setLoading(true);
        try {
            const res = await axios.get(backendUrl + `/api/doctor/search?search=${search}`,
                { headers: { dtoken: dToken } }
            );
            if (res.data.success) {
                setRecords(res.data.records);
            } else {
                setRecords([]);
                console.log(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching records:", error);
            setRecords([]);
        }
        setLoading(false);
    };

    // Optional: search automatically when user stops typing
    useEffect(() => {
        const delay = setTimeout(() => {
            if (search) loadRecords();
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    return (
        <div className="p-5 overflow-x-scroll bg-white border rounded text-sm max-h-[90vh] min-h-[70vh] overflow-y-scroll">
            <h2 className="text-lg font-medium mb-3">Patient Records</h2>

            <div className="flex gap-2 mb-4">
                <input
                    placeholder="Search by patient name/email"
                    className="border p-2 rounded flex-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={loadRecords}
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading records...</p>}
            {!loading && records.length === 0 && <p>No records found.</p>}

            {!loading && records.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Patient Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Doctor Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Symptoms</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Diagnosis</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prescription</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Notes</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">PDF</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {records.map((r) => (
                                <tr key={r._id}>
                                    <td className="px-4 py-2">{r.patientName}</td>
                                    <td className="px-4 py-2">{r.doctorId?.name || "N/A"}</td>
                                    <td className="px-4 py-3">{new Date(r.createdAt).toLocaleString()}</td>
                                    <td className="px-4 py-2">{r.symptoms || "N/A"}</td>
                                    <td className="px-4 py-2">{r.diagnosis || "N/A"}</td>
                                    <td className="px-4 py-2">{r.prescription || "N/A"}</td>
                                    <td className="px-4 py-2">{r.notes || "N/A"}</td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={`${backendUrl}/${r.pdfUrl.replace("\\", "/")}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PatientRecords;
