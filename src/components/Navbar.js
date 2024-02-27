import { Link } from "react-router-dom";
import "../styles/NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { useState } from "react";
import RenderMenu from "./NavMenu";

function Navbar() {
  // State to manage the click event for the mobile menu
  const [clicked, setClicked] = useState(false);

  // Function to handle the click event for the mobile menu
  function handleClick() {
    setClicked(!clicked);
  }

  // Main render function for the Navbar component
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">FlyWise Airways</h1>

      {/* Mobile menu icons with click event handling */}
      <div className="menu-icons" onClick={handleClick}>
        {/* <i> -- icon */}
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Navigation menu with dynamic class based on mobile menu click */}
      <ul className={clicked ? "navbar-menu active" : "navbar-menu"}>
        {/* Mapping through MenuItems array and rendering each menu item */}
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {/* Link to each menu item with dynamic class and content */}
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}

        {/* Rendering the dynamic menu based on user authentication state */}
        <RenderMenu />
      </ul>
    </nav>
  );
}

export default Navbar;
