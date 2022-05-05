import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import MobileMenu from "../ui/MobileMenu";
import Overlay from "../ui/Overlay";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRestHeader from "../ui/CreateRestHeader";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../redux/slices/menuSlice";

/* eslint-disable jsx-a11y/anchor-is-valid */
function Header() {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const mMenu = useSelector((state) => state.menu.menu);

  /*const [mMenu, setMmenu] = useState(false);*/
  const [schBar, setSchBar] = useState(false);

  const showMobileMenu = () => {
    //show mobile menu
    dispatch(toggleMenu());
  };

  const goHome = () => {
    navigate("/");
  };

  const goMenu = () => {
    //setMmenu(!mMenu);
    navigate("/menu");
  };

  const showSearch = () => {
    setSchBar(!schBar);
  };

  const goToAddMenu = () => {
    navigate("/add-item");
  };

  const addMenuItem = () => {
    console.log("Is adding menu item,");
  };

  const toEditRestProfile = () => {
    navigate("/edit-rest-profile");
  };

  const goDetails = () => {
    navigate("/edit-resturant-details");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const inRestCreation = () => {
    if (
      location.pathname === "/create-resturant/name" ||
      location.pathname === "/create-resturant/location" ||
      location.pathname === "/create-resturant/year" ||
      location.pathname === "/create-resturant/description" ||
      location.pathname === "/create-resturant/welcome"
    ) {
      return true;
    }
    return false;
  };

  return !inRestCreation() ? (
    <>
      <>
        <MobileMenu closeMenu={showMobileMenu} goMenu={goMenu} />{" "}
        <Overlay width={`25%`} closeOverlay={showMobileMenu} />
      </>

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
                  {location.pathname === "/add-item" ||
                  location.pathname === "/view-item" ? (
                    <svg
                      onClick={goMenu}
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "25px", verticalAlign: "text-bottom" }}
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
                  ) : location.pathname === "/login" ? (
                    <span onClick={goHome} className="ps-2 fw-bold">
                      qrb
                    </span>
                  ) : location.pathname === "/edit-rest-profile" ? (
                    <svg
                      onClick={goDetails}
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "25px", verticalAlign: "text-bottom" }}
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
                      onClick={goHome}
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "30px", verticalAlign: "text-bottom" }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {!mMenu &&
                    (location.pathname === "/add-item" ? (
                      <span
                        className="ms-3 q-font-weight-bold"
                        onClick={goMenu}
                      >
                        add item
                      </span>
                    ) : location.pathname === "/view-item" ? (
                      <span
                        className="ms-3 q-font-weight-bold"
                        onClick={goMenu}
                      >
                        kalua pig meat
                      </span>
                    ) : location.pathname === "/login" ? (
                      <span className="ms-3 h6">menu platform</span>
                    ) : location.pathname === "/edit-rest-profile" ? (
                      <span className="ms-3 q-font-weight-bold">
                        {"edit resturant"}
                      </span>
                    ) : (
                      <span
                        className="ms-3 q-font-weight-bold"
                        onClick={goMenu}
                      >
                        {rest?.name && rest.name}
                      </span>
                    ))}
                </span>
              )}
            </Navbar.Brand>
            <span className="" style={{ zIndex: "3" }}>
              {location.pathname === "/menu" && (
                <span onClick={goToAddMenu} className="">
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
              {location.pathname === "/edit-resturant-details" && (
                <span onClick={toEditRestProfile} className="px-4">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                      stroke="#252525"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                      stroke="#252525"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              {location.pathname === "/login" && (
                <span className="px-2">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.3211 13.9291C1.3211 13.9291 0.346322 12.5083 1.76802 11.5344C3.18799 10.5604 4.16191 11.9804 4.16191 11.9804L8.6836 18.5748C8.83946 18.3147 9.00996 18.0581 9.20027 17.805L2.92449 8.65394C2.92449 8.65394 1.95057 7.23397 3.37141 6.26005C4.79138 5.28613 5.76529 6.70611 5.76529 6.70611L11.6682 15.3146C11.8878 15.1355 12.1125 14.9556 12.3442 14.779L5.50093 4.79788C5.50093 4.79788 4.52702 3.37791 5.94785 2.40399C7.36782 1.43008 8.34174 2.85005 8.34174 2.85005L15.185 12.8295C15.4364 12.6753 15.6853 12.5419 15.935 12.4006L9.53868 3.07308C9.53868 3.07308 8.56477 1.65311 9.98474 0.679189C11.4047 -0.294728 12.3786 1.12524 12.3786 1.12524L19.1418 10.9884L20.17 12.4885C15.9092 15.4111 15.5036 20.9093 17.938 24.4596C18.4245 25.1701 19.1349 24.6835 19.1349 24.6835C16.2132 20.4219 17.1053 15.6332 21.3669 12.7115L20.1105 6.42366C20.1105 6.42366 19.6412 4.76688 21.2972 4.29672C22.9539 3.82741 23.4241 5.48419 23.4241 5.48419L24.8751 9.79319C25.4503 11.5016 26.0625 13.2041 26.8728 14.8143C29.1608 19.361 27.7942 25.0116 23.4801 27.9712C18.7741 31.1978 12.3407 29.9983 9.11329 25.2932L1.3211 13.9291Z"
                      fill="#C9C9C9"
                    />
                  </svg>
                </span>
              )}
              {location.pathname === "/add-item" ||
              location.pathname === "/view-item" ? (
                <svg
                  onClick={addMenuItem}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : location.pathname === "/edit-rest-profile" ? (
                <svg
                  onClick={goToAbout}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : mMenu ? (
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
              ) : !mMenu && location.pathname !== "/login" ? (
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
              ) : null}
            </span>
          </Container>
        )}
      </Navbar>
    </>
  ) : inRestCreation() ? (
    <CreateRestHeader />
  ) : null;
}

export default Header;
