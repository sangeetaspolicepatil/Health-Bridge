import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentBed = () => {
  const { token, currencySymbol, backendUrl } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const booking = location.state || {};
  const { bedType, date, time, amount } = booking;

  useEffect(() => {
    if (!bedType || !date || !time || !token) {
      toast.error("Booking info missing");
      navigate("/book-bed");
    }
  }, [bedType, date, time, token, navigate]);

  const handlePayAndBook = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + `/api/bed/pay-and-book`,
        { bedType, date, time, amount },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Payment successful and bed booked!");
        navigate("/my-bed-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Payment failed. Check backend.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
      <p><strong>Bed Type:</strong> {bedType}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Amount:</strong> {currencySymbol}{amount}</p>

      <button
        onClick={handlePayAndBook}
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded mt-4 w-full disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay & Book"}
      </button>
    </div>
  );
};

export default PaymentBed;
