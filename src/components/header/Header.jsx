import React from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/UserSlice.js";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `https://demo-api.ideabridge.lt/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + currentUser.data.access_token,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="">
            <Link to="/" className="navbar-brand" href="#">
              Produktų duomenų bazė
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Pradinis
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Produkto paieška
                </a>
              </li>
              {/* ------------------------------------------------- */}
              {currentUser ? (
                <li className="nav-item">
                  <Link
                    to="/ourProductList"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Produkto administravimas
                  </Link>
                </li>
              ) : (
                <></>
              )}

              {/* ---------------------------------------------- */}
              {currentUser ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Navigacija
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <p className="dropdown-item">
                          {currentUser.data.user.name}
                        </p>
                      </li>
                      <li>
                        <p className="dropdown-item">
                          {currentUser.data.user.email}
                        </p>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="dropdown-item"
                          onClick={handleSignout}
                        >
                          Atsijungti
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <Link
                  to="/sign-in"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Prisijungti
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
