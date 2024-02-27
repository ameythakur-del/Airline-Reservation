import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import "../styles/UserBookingStyles.css";
import UserSidebar from "../components/UserSidebar";
import logo from "../assets/logo.png";

function UserBooking() {
  const [passengers, setPassengers] = useState([]);

  const bookingId = sessionStorage.getItem("bid");

  // console.log(`bookingID =  ${bookingId}`);

  const navigate = useNavigate();


  // const selectedFlight = location.state.selectedFlight;
  const selectedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
  const booking = JSON.parse(sessionStorage.getItem("booking"));
  const name = sessionStorage.getItem("fname")+sessionStorage.getItem("lname");
  const email = sessionStorage.getItem("email");
  const mobile = sessionStorage.getItem("mobile_number");

  // const cls = location.state.cls;
  const cls = sessionStorage.getItem("class");

  const BASE_URL = "http://localhost:8080";

  const handlePassengerChange = (event, index) => {
    const { name, value } = event.target;
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [name]: value,
      seatNumber: parseInt(booking.totalSeats - booking.availableSeats + index + 1)
    };

    setPassengers(newPassengers);
  };

  const handleSubmit = async (event) => {
    //const token = sessionStorage.getItem("jwtToken");

    event.preventDefault();

    try {
      const response = await axios.post(
        BASE_URL + `/book`,
        {
          ...booking,
          userId: parseInt(sessionStorage.getItem("uid")),
          passengers: passengers.map(passenger => ({
            ...passenger,
            age: parseInt(passenger.age),
            gender: passenger.gender.toUpperCase()
          }))
        }
      ).then(response=> {
        var rzp1 = new window.Razorpay({
          "key": "rzp_test_bFFZd5YLnfhhmu",// Enter the Key ID generated from the Dashboard
          "timeout": "30",
          "amount": booking.fare*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Flywise Airways", //your business name
          "description": "Test Transaction",
          "image": logo,
          "order_id": response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "modal": {
            "ondismiss": function(){
                const response4 = axios.delete(BASE_URL + `/payment?id=${response.data.id}`);
            },
          },
          "handler": function (response2){
              try{
                const d = new Date();
              const response3 = axios.post(
                BASE_URL + `/payment?id=${response.data.id}`,
                {
                  "transactionNumber" : response2.razorpay_payment_id,
                  "date" : d,
                  "totalAmount" : booking.fare
                }
              ).then(() => {
                navigate("/userhistory");
              });
              }
              catch(error) {
                toast.error(`${error}`);
              }
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              "name": name, //your customer's name
              "email": email,
              "contact": mobile  //Provide the customer's phone number for better conversion rates
          },
          "notes": {
              "address": "Tinsel Town, Pune"
          },
          "theme": {
              "color": "#3399cc"
          }
      });

    rzp1.open();
      }
      );


  }
    catch (error) {
      toast.error(`${error}`);
    }

  };

  const renderPassengerForm = () => {
    const forms = [];

    for (let i = 0; i < booking.numberOfSeatsBooked; i++) {
      forms.push(
        <div className="mx-auto col-md-6" key={i}>
          <h1
            className='<div class="card text-start">
           <img class="card-img-top" src="holder.js/100px180/" alt="Title">
           <div class="card-body">
             <h4 class="card-title">Title</h4>
             <p class="card-text">Body</p>
           </div>
         </div>'
          ></h1>

          <table className="table table-bordered col-md-6">
            <thead>
              <tr>
                <th colSpan="2">Passenger {i + 1} Details</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Name :</td>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="name"
                    onChange={(event) => handlePassengerChange(event, i)}
                  />
                </td>
              </tr>
              <tr>
                <td>Gender :</td>
                <td>
                  <select
                    className="form-select"
                    required
                    name="gender"
                    onChange={(event) => handlePassengerChange(event, i)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Age :</td>
                <td>
                  <input
                    type="number"
                    required
                    className="form-control"
                    name="age"
                    onChange={(event) => handlePassengerChange(event, i)}
                  />
                </td>
              </tr>
              <tr>
                <td>Seat Number</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="seatNumber"
                    value={booking.totalSeats-booking.availableSeats+i+1}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </div>
      );
    }
    return forms;
  };

  return (
    <UserSidebar>
      <div className="middleContent">
        {/* <table className="mx-auto col-md-3">
            <thead>
              <tr>
                <th colSpan="2">Your Selected Flight</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td>Date :</td>
                <td>{selectedFlight?.travelDate}</td>
              </tr>
              <tr>
                <td>Departure :</td>
                <td>{selectedFlight?.departureTime}</td>
              </tr>
              <tr>
                <td>Arrival :</td>
                <td>{selectedFlight?.arrivalTime}</td>
              </tr>
              <tr>
                <td>Class :</td>
                <td>{cls}</td>
              </tr>
            </tbody>
          </table> */}
        <div className="d-flex align-items-start">

          <div className="mx-auto col-md-9">{renderPassengerForm()}</div>
        </div>

        <div className="text-center">
          <button id="rzp-button1" className="btn btn-primary mt-3" onClick={handleSubmit}>
            Make the Payment
          </button>
        </div>
      </div>
    </UserSidebar>
  );
}

export default UserBooking;
