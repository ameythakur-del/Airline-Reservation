import React, { useState, useContext } from "react";
import "../styles/AddFlightStyles.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //  const location = useLocation();
  const BASE_URL = "http://ec2-52-66-238-185.ap-south-1.compute.amazonaws.com:8080/users";
  //   console.log(sessionmStorage.getItem("fid"));

  const handleSignup = () => {
    navigate("/register");
  };

  if (sessionStorage.getItem("jwtToken") && sessionStorage.getItem("fid")) {
    sessionStorage.clear();
  }

  //   let selectedFlight;
  //   if(sessionStorage.getItem("fid")){

  //  //selectedFlight=location.state.selectedFlight;

  //   }

  const handleSubmit = async (event) => {
    const cred = {
      email: email,
      password: password,
    };

    // To prevents the default form submission behavior (page reload after submit)
    event.preventDefault();

    try {
      const response = await axios.post(BASE_URL + `/signin`, cred);
      console.log(response.data);
      const token = response.data.token;
      const userId = response.data.userId;
      const role = response.data.role;
      const firstName = response.data.firstName;
      const lastName = response.data.lastName;
      const email = response.data.email;
      const mobile = response.data.phoneNumber;

      const setAuthToken = (token) => {
        if (token) {
          sessionStorage.setItem("jwtToken", token);
          sessionStorage.setItem("uid", userId);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("fname", firstName);
          sessionStorage.setItem("lname", lastName);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("mobile_number", mobile);
        }
      };

      setAuthToken(token);

      // setting a default authorization header for Axios requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("jwtToken")}`;

      //Bookflight
      if (sessionStorage.getItem("jwtToken") && sessionStorage.getItem("fid")) {
        toast.success("Login Successful.");
        dispatch({ type: "USER", payload: true }); // payload -- authenticated = true
        navigate("/addPassengers");
      }

      //Home page
      else if (sessionStorage.getItem("role") === "ROLE_USER") {
        toast.success("Login Successful.");
        dispatch({ type: "USER", payload: true }); // payload -- authenticated = true
        navigate("/");
      }

      //Admin page
      else if (
        sessionStorage.getItem("jwtToken") &&
        sessionStorage.getItem("role") === "ROLE_ADMIN"
      ) {
        toast.success("Login Successful.");
        dispatch({ type: "ADMIN", payload: true }); // payload -- authenticated = true
        navigate(`/admin`);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Invalid Credentials.");
      }
    }
  };

  return (
    <div className="middleContent">
      <br />
      <br />
      <div className="container">
        <div className="container-fluid bg-light py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-lg-4 bg-white rounded shadow p-4">
              <div style={{ justifyContent: "center" }}>
                <h2 className="text-center">Login here</h2>
                <br />
                <form onSubmit={handleSubmit} className="add-flight-form">
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Password : </label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Enter password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>

                  <button
                    onClick={handleSignup}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default SignIn;
