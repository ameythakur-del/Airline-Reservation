import React from "react";
import { useNavigate } from "react-router-dom";

export const PastBookingsData = ({ bookings }) => {
  const navigate = useNavigate();
  return (
    <>
      {bookings.map((currentBooking) => {
        const {
          id,
          type,
          dateTime,
          flightId,
          source,
          destination,
          numberOfSeatsBooked,
          paymentId,
          passengers
        } = currentBooking;

        // const source = currentBooking.flight.source;
        // const destination = currentBooking.flight.destination;
        // // const paymentStatus = currentBooking.payment.totalPayment;
        // const className = currentBooking.classes.classDescription;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{source.stopName}</td>
            <td>{destination.stopName}</td>
            <td>{dateTime.split("T")[0] + " " + dateTime.split("T")[1]}</td>
            <td>{numberOfSeatsBooked}</td>
            <td>{flightId}</td>
            <td>{type}</td>
            <td>{paymentId}</td>
            <td>{JSON.stringify(passengers)}</td>
          </tr>
        );
      })}
    </>
  );
};
