import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";

const AddPatientRecord = () => {
    const { backendUrl, dToken } = useContext(DoctorContext);
    const { userId } = useParams();

    const [user, setUser] = useState({});
    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { data } = await axios.get(backendUrl+`/api/doctor/user/${userId}`, { headers: { dToken } });
                if (data.success) setUser(data.user);
            } catch (error) {
                toast.error("Failed to load user");
            }
        };
        loadUser();
    }, [userId]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl+`/api/doctor/add-record`, {
                userId, symptoms, diagnosis, prescription, notes,
                patientName: user.name,
                patientEmail: user.email
            }, { headers: { dToken } });

            if (data.success) {
                toast.success("Record Created & PDF Generated");
                window.location.href = "/doctor-appointments";
            }
        } catch (error) {
            toast.error("Error creating record");
        }
    };

    return (
        <div className="m-5 p-5 bg-white border rounded max-w-3xl">
            <h2 className="text-lg font-semibold mb-5">Add Patient Medical Record</h2>

            <p><strong>Patient Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <form className="mt-5 flex flex-col gap-4" onSubmit={submitForm}>
                <textarea placeholder="Symptoms" rows="3" className="border p-3 rounded" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required></textarea>
                <textarea placeholder="Diagnosis" rows="3" className="border p-3 rounded" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required></textarea>
                <textarea placeholder="Prescription" rows="3" className="border p-3 rounded" value={prescription} onChange={(e) => setPrescription(e.target.value)} required></textarea>
                <textarea placeholder="Additional Notes" rows="3" className="border p-3 rounded" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>

                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-full">Save Record & Generate PDF</button>
            </form>
        </div>
    );
};

export default AddPatientRecord;
