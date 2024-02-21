import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";

// Component to render different menu items based on the user's authentication state

export default function RenderMenu() {
  const { state } = useContext(UserContext);

  if (state) {
    // If user is authenticated, render a welcome message and logout button
    return (
      <>
        <label>Welcome {sessionStorage.getItem("fname")}!</label>
        <Link to="/logout">
          <button> Logout</button>
        </Link>
      </>
    );
  } else {
    // If user is not authenticated, render register and sign-in buttons
    return (
      <>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>SignIn</button>
        </Link>
      </>
    );
  }
}
