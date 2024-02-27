import React, { useState, useEffect } from "react";
import UserSidebar from "../components/UserSidebar";
import UserService from "../services/UserService";
import { toast } from "react-toastify";
import { PastBookingsData } from "./PastBookingsData";

export const PastBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getAllBookings = async () => {
      const uid = parseInt(sessionStorage.getItem("uid"));
      try {
        const response = await UserService.getUserBookings(uid);
        setBookings(response.data);
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 400) {
          toast.error(`${error.response.data}`);
        } else if (error.response.status === 500) {
          toast.error(`No successful booking yet.`);
        }
      }
    };

    getAllBookings();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <UserSidebar>
      <div className="middleContent">
        <h1 style={{ textAlign: "center" }}>
          Past Bookings By {sessionStorage.getItem("fname")}
        </h1>
        <br />

        <div />
        <br />
        <table>
          <thead>
            <tr>
              <th>bookingId</th>
              <th>From</th>
              <th>To</th>
              <th>Date Time</th>
              <th>Number of Seats</th>
              <th>Flight Id</th>
              <th>Seat Class</th>
              <th>Payment Id</th>
              <th>Passengers</th>
            </tr>
          </thead>
          <tbody>
            <PastBookingsData bookings={bookings} />
          </tbody>
        </table>
      </div>
    </UserSidebar>
  );
};
