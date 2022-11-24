import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import MobileMenu from "../ui/MobileMenu";
import Overlay from "../ui/Overlay";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRestHeader from "../ui/CreateRestHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  toggleView,
  initMenuSlide,
  toggleSearchBar,
  toggleUploading,
  toggleEditing,
  toggleMenuFade,
  setEditnMenu,
} from "../redux/slices/menuSlice";
import { searchDiscarded, searchRestMenu } from "../redux/slices/restSlice";
import { useState } from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */
function Header() {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const mMenu = useSelector((state) => state.menu.menu);
  const menuFade = useSelector((state) => state.menu.menuFade);
  const menuSlideInited = useSelector((state) => state.menu.menuSlideInited);
  const pad = useSelector((state) => state.menu.pb);
  const viewMode = useSelector((state) => state.menu.view);
  //const authState = useSelector((state) => state.auth.auth);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const [searchTerm, setSearchTerm] = useState("");

  const showMobileMenu = () => {
    //show mobile menu
    if (menuFade) {
      setTimeout(() => {
        dispatch(toggleMenuFade());
      }, 500);
    } else {
      dispatch(toggleMenuFade());
    }
    dispatch(toggleMenu());
    !menuSlideInited && dispatch(initMenuSlide(true));
  };

  const searching = (e) => {
    setSearchTerm(e);
    dispatch(searchRestMenu(e));
  };

  const goHome = () => {
    navigate(`/${rest.url}`);
  };

  const goMenu = () => {
    //setMmenu(!mMenu);
    showMobileMenu();
    dispatch(setEditnMenu(false));
    navigate(`${rest.url}/menu`);
  };

  const showSearch = () => {
    dispatch(toggleSearchBar());
    if (searchBar) {
      setSearchTerm("");
      dispatch(searchDiscarded());
    }
  };

  const cancelAllAddAndEdit = () => {
    navigate(`${rest.url}/menu`);
    dispatch(toggleUploading(false));
    dispatch(toggleEditing(false));
  };
  const goDetails = () => {
    goHome();
  };

  const goToAbout = () => {
    navigate(`/${rest.url}/about`);
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

  const changeView = () => {
    //setVie(!vie);
    dispatch(toggleView());
  };

  const properUrl = (url) => {
    return url.replace("%20", " ");
  };

  const shldHdrBg = () => {
    if (
      properUrl(location.pathname) === `/${rest.url}/menu` ||
      properUrl(location.pathname) === `/${rest.url}/about` ||
      location.pathname === "/login" ||
      location.pathname === "/edit-resturant-details" ||
      location.pathname === "/edit-rest-profile" ||
      location.pathname === "/add-item" ||
      location.pathname === "/edit-item"
    ) {
      return true;
    }
    return false;
  };
  const ultiRedu = () => {
    let sum = rest?.categories?.reduce(
      (prev, curr) => prev + curr.menu.length,
      0
    );
    if (sum > 0) {
      return true;
    }
    return false;
  };
  return !inRestCreation() ? (
    <>
      <>
        {menuSlideInited && (
          <MobileMenu closeMenu={showMobileMenu} goMenu={goMenu} />
        )}{" "}
        {menuSlideInited && (
          <Overlay width={`100%`} closeOverlay={showMobileMenu} />
        )}
      </>

      <Navbar
        collapseOnSelect
        expand="lg"
        id="myHeader"
        className={`${shldHdrBg() && "big-bg-theme"} ${
          pad && !searchBar && "pb-5"
        } `}
      >
        <Container fluid className="mx-md-5 pt-3">
          <Navbar.Brand className="cur-pointer py-0">
            <div className={`search-box ${searchBar && "active-search"} `}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => searching(e.target.value)}
                name="search"
                id="searchId"
                className="fs-14"
              />
              <button className="btn-clear">
                <svg
                  onClick={showSearch}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "25px" }}
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
              </button>
            </div>
            {properUrl(location.pathname) === `/${rest.url}/menu` && (
              <span>
                <span
                  className="ms-1 fw-500"
                  style={{ fontSize: "22px" }}
                  onClick={goHome}
                >
                  {rest?.name && rest.name}
                </span>
              </span>
            )}
            {properUrl(location.pathname) !== `/${rest.url}` && (
              <span style={{ position: "relative" }}>
                {location.pathname === "/add-item" ||
                location.pathname === "/edit-item" ||
                location.pathname === "/add-category" ? (
                  <svg
                    onClick={cancelAllAddAndEdit}
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
                  <span onClick={goHome} className="ps-2 fs-23 fw-bold">
                    venu
                  </span>
                ) : location.pathname === "/edit-rest-profile" ? (
                  <svg
                    onClick={goDetails}
                    className="text-secondary"
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
                ) : location.pathname === "/edit-user-profile" ? null /*<svg
                    onClick={cancelUserEdition}
                    className="text-secondary"
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
                  </svg>*/ : null}
                {!mMenu &&
                  (location.pathname === "/add-item" ? (
                    <span className="ms-3 fs-18">add item</span>
                  ) : location.pathname === "/edit-item" ? (
                    <span className="ms-3 fs-18">edit item</span>
                  ) : location.pathname === "/add-category" ? (
                    <span className="ms-3 fs-18">add category</span>
                  ) : location.pathname === "/login" ? (
                    <span className="ms-2 text-secondary fs-14">
                      resturant remote
                    </span>
                  ) : location.pathname === "/edit-rest-profile" ? (
                    <span className="ms-3 fs-18">{"business profile"}</span>
                  ) : location.pathname === "/edit-user-profile" ? (
                    <span className="ms-1 fs-18">{"user profile"}</span>
                  ) : (
                    <span className="ms-3 fw-bold"></span>
                  ))}
              </span>
            )}
          </Navbar.Brand>
          <span className="" style={{ zIndex: "3" }}>
            {properUrl(location.pathname) === `/${rest.url}/menu` && (
              <>
                {/** the below is supposed to show when the total menu items are greater than 1 */}
                {ultiRedu() && (
                  <span onClick={changeView} className="">
                    {viewMode ? (
                      <img
                        src="/icons/bigbiew.png"
                        className="img-fluid"
                        style={{ width: "18px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        src="/icons/smallview.png"
                        className="img-fluid"
                        style={{ width: "18px" }}
                        alt=""
                      />
                    )}
                  </span>
                )}
              </>
            )}
            {properUrl(location.pathname) === `/${rest.url}/menu` &&
              ultiRedu() && (
                <span
                  onClick={showSearch}
                  style={{
                    paddingRight: "1.5rem",
                    paddingLeft: "1.8rem",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
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
            {location.pathname === "/edit-rest-profile" ? (
              <svg
                onClick={goToAbout}
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "30px" }}
                className="text-secondary"
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
            ) : location.pathname === "/edit-user-profile" ? null /*<svg
                onClick={approveUserEdition}
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "30px" }}
                className="text-secondary"
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
              </svg>*/ : mMenu ? (
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
                style={{ width: "27px", height: "25px" }}
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
      </Navbar>
    </>
  ) : inRestCreation() ? (
    <CreateRestHeader />
  ) : null;
}

export default Header;
