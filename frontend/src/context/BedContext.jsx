import React, { createContext, useState } from "react";

export const BedContext = createContext();

const BedContextProvider = ({ children }) => {
    const [bedBookings, setBedBookings] = useState([]);

    const addBedBooking = (booking) => {
        setBedBookings((prev) => [...prev, booking]);
    };

    const cancelBedBooking = (id) => {
        setBedBookings((prev) =>
            prev.map((b) =>
                b._id === id ? { ...b, cancelled: true } : b
            )
        );
    };

    return (
        <BedContext.Provider
            value={{ bedBookings, addBedBooking, cancelBedBooking }}
        >
            {children}
        </BedContext.Provider>
    );
};

export default BedContextProvider;
