import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../../../admin/src/assets/assets";

const MyRecordsTable = () => {
    const { myRecords, getMyRecords,backendUrl } = useContext(AppContext);

    useEffect(() => {
        getMyRecords();
    }, []);

    return (
        <div className="m-5 p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-2 border-b pb-3 mb-4">
                <img className="w-7 h-7" src={assets.record_icon} alt="" />
                <p className="text-xl font-semibold text-zinc-700">My Medical Records</p>
            </div>

            {myRecords.length === 0 ? (
                <p className="text-zinc-500 mt-3">No records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-zinc-700 text-sm">
                                <th className="border border-gray-200 px-4 py-3 text-left">Doctor Name     </th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Symptoms</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Diagnosis</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Prescription</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">Date</th>
                                <th className="border border-gray-200 px-4 py-3 text-left">PDF</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-zinc-700">
                            {myRecords.map((record) => (
                                <tr
                                    key={record._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.doctorId?.name || "Unknown"}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.symptoms || "N/A"}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.diagnosis || "N/A"}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.prescription || "N/A"}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.notes || "N/A"}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {new Date(record.createdAt).toLocaleString()}
                                    </td>

                                    <td className="border border-gray-200 px-4 py-3">
                                        {record.pdfUrl ? (
                                            <a
                                                href={backendUrl + `/${record.pdfUrl}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                View PDF
                                            </a>
                                        ) : (
                                            <span className="text-zinc-400">No PDF</span>
                                        )}
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

export default MyRecordsTable;
