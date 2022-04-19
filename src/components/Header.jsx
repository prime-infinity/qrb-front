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

  return (
    <>
      {mMenu && (
        <>
          <MobileMenu /> <Overlay />
        </>
      )}
      <Navbar collapseOnSelect expand="lg" id="myHeader" className="">
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
                <span className="ms-3">Yogurstory</span>
              </span>
            )}
          </Navbar.Brand>
          <span className="" style={{ zIndex: "3" }} onClick={showMobileMenu}>
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
