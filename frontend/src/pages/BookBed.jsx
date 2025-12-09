import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookBed = () => {
    const { token } = useContext(AppContext);
    const navigate = useNavigate();

    const [bedType, setBedType] = useState("General");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const bedAmounts = { General: 500, ICU: 2000, VIP: 5000 };

    const handleBook = (e) => {
        e.preventDefault();
        if (!date || !time) return toast.error("Select date and time");

        navigate("/book-and-pay", {
            state: { bedType, date, time, amount: bedAmounts[bedType] },
        });
    };

    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);
    const maxDateStr = maxDate.toISOString().split("T")[0];

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Book Emergency Bed</h2>

            <form onSubmit={handleBook} className="flex flex-col gap-4">
                <select
                    value={bedType}
                    onChange={(e) => setBedType(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    {Object.keys(bedAmounts).map((type) => (
                        <option key={type} value={type}>
                            {type} (₹{bedAmounts[type]})
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    min={today}
                    max={maxDateStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                <button type="submit" className="bg-primary text-white py-2 rounded">
                    Book
                </button>
            </form>
        </div>
    );
};

export default BookBed;
