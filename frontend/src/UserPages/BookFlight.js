import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { publicRequest } from "../Constants";
import "../styles/SearchBox.css";
import { toast } from "react-toastify";
import UserSidebar from "../components/UserSidebar";
// import axios from "axios";

function BookFlight() {
  const [src, setsrc] = useState("");
  const [dest, setdest] = useState("");
  const [dt, setdt] = useState(new Date().toISOString().split('T')[0]);
  const [numPass, setNumPass] = useState(0);
  const [seatClass, setSeatClass] = useState("");
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await publicRequest.get(`/cities`);

        setCities(response.data);
      } catch (error) {
        toast.error(`${error.response.data}`);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    function padNumber(num) {
      return num < 10 ? '0' + num : num;
    }
    let date = new Date(dt);
    // Format date components with leading zeros
    const formattedDay = padNumber(date.getDate());
    const formattedMonth = padNumber(date.getMonth() + 1); // Adding 1 because months are zero-based
    const formattedYear = date.getFullYear();

    // Construct formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
    try {
      const response = await publicRequest.get(
        `/flights?from=${src}&to=${dest}&date=${formattedDate}&num_pass=${numPass}&type=${seatClass}`
      );
      setFlights(response.data);
    } catch (error) {
      toast.error(`${error.response.data}`);
    }
  };

  // sessionStorage.setItem('flight', flights)

  const handleBook = async (flightId) => {
    sessionStorage.setItem("fid", flightId);

    console.log(sessionStorage.getItem("fid"));

    const selectedFlight = flights.find(
      (flight) => flight.flightId === flightId
    );

    sessionStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
    console.log(selectedFlight);

    if (
      sessionStorage.getItem("role") === "ROLE_USER" &&
      sessionStorage.getItem("jwtToken")
    ) {
      // const selectedFlight = flights.find((flight) => flight.flightId === flightId);
      //  navigate('/selectseat', { state: { selectedFlight } });
      navigate("/selectseat");
    } else {
      // const selectedFlight = flights.find((flight) => flight.flightId === flightId);
      //  navigate('/login', { state: { selectedFlight } });
      navigate("/login");
    }
  };

  function fetchsrc(value) {
    setsrc(value);
  }

  function fetchdest(value) {
    setdest(value);
  }

  return (
    <>
      <UserSidebar>
        <div className="middleContent">
          <div className="searchBar">
            <div className="searchBox">
              <div className="searchList">
                <form onSubmit={handleSearch}>
                  <label>
                    Source:
                    <select
                      name="from"
                      value={src}
                      onChange={(event) => fetchsrc(event.target.value)}
                    >
                      <option value="">--Select--</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Destination:
                    <select
                      name="to"
                      value={dest}
                      onChange={(event) => fetchdest(event.target.value)}
                    >
                      <option value="">--Select--</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Date:
                    <input
                      name="date"
                      type="date"

                      value={dt}
                      onChange={(event) => setdt(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Number of Passengers:
                    <input
                    name="num_pass"
                      type="number"
                      onChange={(event) => setNumPass(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Seat Class:
                    <select
                      name="type"
                      onChange={(event) => setSeatClass(event.target.value)}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="BUSINESS_CLASS">Business Class</option>
                      <option value="ECONOMY_CLASS">Economy Class</option>
                      <option value="FIRST_CLASS">First Class</option>
                    </select>
                  </label>
                  <button type="submit">Search Flights</button>
                </form>
              </div>
            </div>
          </div>

          <br />

          <div className="container">
            <h4 className="text-center">Available Flights</h4>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Fare</th>
                  <th>Available Seats</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (

                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.stops[0].stopName}</td>
                    <td>{flight.stops[flight.stops.length-1].stopName}</td>
                    <td>{flight.stops[0].departureDateTime.split("T")[0] + " " +
                    flight.stops[0].departureDateTime.split("T")[1]}</td>
                    <td>{flight.stops[0].arrivalDateTime.split("T")[0] + " " +
                    flight.stops[0].arrivalDateTime.split("T")[1]}</td>
                    <td>{flight.fare}</td>
                    <td>{flight.availableSeats}</td>
                    <td>
                      <button onClick={() => handleBook(flight.flightId)}>
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </UserSidebar>
    </>
  );
}

export default BookFlight;
