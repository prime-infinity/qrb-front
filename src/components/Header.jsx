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

  const showMobileMenu = () => {
    //show mobile menu
    mMenu ? setMmenu(false) : setMmenu(true);
  };

  const goHome = () => {
    navigate("/");
  };

  const goMenu = () => {
    navigate("/menu");
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
          <span className="" style={{ zIndex: "3" }} onClick={showMobileMenu}>
            {location.pathname === "/menu" && (
              <span className="">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 8.5C15.0523 8.5 15.5 8.05229 15.5 7.5C15.5 6.94771 15.0523 6.5 14.5 6.5C13.9477 6.5 13.5 6.94771 13.5 7.5C13.5 8.05229 13.9477 8.5 14.5 8.5ZM0 3.75C0 1.67893 1.67893 0 3.75 0H16.25C18.3211 0 20 1.67893 20 3.75V12.25C20 14.3211 18.3211 16 16.25 16H3.75C1.67893 16 0 14.3211 0 12.25V3.75ZM7.5 5C6.67157 5 6 5.67157 6 6.5V11.5C6 11.7665 6.06949 12.0167 6.19134 12.2336L9.59145 8.62096C10.0834 8.09824 10.9136 8.0963 11.408 8.61673L15.5705 12.9984C16.3662 12.9616 17 12.3048 17 11.5V6.5C17 5.67157 16.3284 5 15.5 5H7.5ZM13.5031 13L10.5026 9.84153L7.52991 13H13.5031Z"
                    fill="#212121"
                  />
                </svg>
              </span>
            )}
            {location.pathname === "/menu" && (
              <span className="px-4">
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
      </Navbar>
    </>
  );
}

export default Header;
