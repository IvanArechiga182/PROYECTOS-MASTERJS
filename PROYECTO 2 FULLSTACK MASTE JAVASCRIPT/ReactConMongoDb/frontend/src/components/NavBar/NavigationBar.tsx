import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const location = useLocation();
  return (
    <div className="header-container">
      <div className="left-side"></div>
      <header>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : " "
                }`}
              >
                Sobre mi
              </Link>
            </li>
            <li>
              <Link
                to="/viewProjects"
                className={`nav-link ${
                  location.pathname === "/viewProjects" ? "active" : " "
                }`}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link to="/" id="logo" className="nav-link">
                IA
              </Link>
            </li>
            <li>
              <Link
                to="/createProject"
                className={`nav-link ${
                  location.pathname === "/createProject" ? "active" : " "
                }`}
              >
                Crear proyecto
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : " "
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="right-side"></div>
    </div>
  );
}

export default NavigationBar;
