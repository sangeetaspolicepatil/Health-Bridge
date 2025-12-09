import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

const MyPatientsRecords = () => {
    const { backendUrl, dToken } = useContext(DoctorContext);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMyPatientsRecords = async () => {
        setLoading(true);
        try {
            const res = await axios.get(backendUrl + `/api/doctor/my-patients-records`, {
                headers: { dtoken: dToken }
            });
            if (res.data.success) {
                setRecords(res.data.records);
            } else {
                setRecords([]);
            }
        } catch (error) {
            console.error("Error fetching records:", error);
            setRecords([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadMyPatientsRecords();
    }, []);

    return (
        <div className="p-5 overflow-x-scroll bg-white border rounded text-sm max-h-[90vh] min-h-[70vh] overflow-y-scroll">
            <h2 className="text-lg font-semibold mb-5">My Patients Records</h2>

            {loading && <p>Loading...</p>}

            {!loading && records.length === 0 && <p>No records found.</p>}

            {!loading && records.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Patient Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
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
                                    <td className="px-4 py-2">{r.patientEmail}</td>
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

export default MyPatientsRecords;
