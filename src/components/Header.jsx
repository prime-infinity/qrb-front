import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import MobileMenu from "../ui/MobileMenu";
import Overlay from "../ui/Overlay";
import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
function Header() {
  const location = useLocation();
  let navigate = useNavigate();
  const [mMenu, setMmenu] = useState(false);
  const [schBar, setSchBar] = useState(false);

  const showMobileMenu = () => {
    //show mobile menu
    setMmenu(!mMenu);
  };

  const goHome = () => {
    navigate("/");
  };

  const goMenu = () => {
    navigate("/menu");
  };

  const showSearch = () => {
    setSchBar(!schBar);
  };

  return (
    <>
      {mMenu && (
        <>
          <MobileMenu goMenu={goMenu} /> <Overlay />
        </>
      )}
      <Navbar
        collapseOnSelect
        expand="lg"
        id="myHeader"
        className={`${location.pathname !== "/" ? "bg-white" : ""}`}
      >
        {schBar && (
          <Container fluid>
            <div className="row">
              <div className="col-12">
                <div className="input-group border border-dark rounded">
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername2"
                    placeholder="search yogurstory's menu"
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-white">
                      <svg
                        onClick={showSearch}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "30px" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        )}
        {!schBar && (
          <Container fluid className="mx-md-5">
            <Navbar.Brand className="cur-pointer">
              {location.pathname !== "/" && (
                <span>
                  <svg
                    onClick={goHome}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "30px" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {!mMenu && (
                    <span className="ms-3 q-font-weight-bold" onClick={goMenu}>
                      yogurstory
                    </span>
                  )}
                </span>
              )}
            </Navbar.Brand>
            <span className="" style={{ zIndex: "3" }}>
              {location.pathname === "/menu" && (
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "30px" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              {location.pathname === "/menu" && (
                <span onClick={showSearch} className="px-4">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.20113 0C3.22459 0 0.000976562 3.22362 0.000976562 7.20015C0.000976562 11.1767 3.22459 14.4003 7.20113 14.4003C8.86466 14.4003 10.3964 13.8361 11.6156 12.8887L16.4632 17.7364C16.8147 18.0879 17.3846 18.0879 17.736 17.7364C18.0875 17.3849 18.0875 16.8151 17.736 16.4636L12.8885 11.6161C13.8367 10.3967 14.4013 8.86436 14.4013 7.20015C14.4013 3.22362 11.1777 0 7.20113 0ZM1.80101 7.20015C1.80101 4.21775 4.21873 1.80004 7.20113 1.80004C10.1835 1.80004 12.6012 4.21775 12.6012 7.20015C12.6012 10.1825 10.1835 12.6003 7.20113 12.6003C4.21873 12.6003 1.80101 10.1825 1.80101 7.20015Z"
                      fill="#252525"
                    />
                  </svg>
                </span>
              )}
              {mMenu ? (
                <svg
                  onClick={showMobileMenu}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "30px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  onClick={showMobileMenu}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "30px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </span>
          </Container>
        )}
      </Navbar>
    </>
  );
}

export default Header;
