import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="">
            LOGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/">
                  Home
                </NavLink>
              </li>

              {auth?.user ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* {JSON.stringify(auth?.user?.email,null,4)} */}
                      {auth?.user?.name}
                      {JSON.stringify(auth?.user?.role, null, 4)}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          // to='/dashboard'
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashbosrd
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <NavLink className="nav-link" onClick={handleLogout}>
                            LogOut
                          </NavLink>
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* <li className="nav-item">
                    <NavLink className="nav-link" onClick={handleLogout}>
                      LogOut
                    </NavLink>
                  </li> */}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
