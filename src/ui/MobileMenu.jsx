import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ResOwnerMobMenu from "./ResOwnerMobMenu";
import { toggleMenu } from "../redux/slices/menuSlice";
import "animate.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
function MobileMenu({ goMenu, closeMenu }) {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);
  const mMenu = useSelector((state) => state.menu.menu);
  const [isResOwner, setIsUser] = useState(false);

  const toggleIsUser = () => {
    /*if (authState?.isRestOwner) {
      console.log(true);
      setIsUser(false);
    } else {
      console.log(false);*/
    setIsUser(!isResOwner);
    //}
    //authState?.isRestOwner ? setIsUser(false) : setIsUser(!isResOwner);
  };

  const goLogin = () => {
    if (authState) {
      closeMenu();
      navigate("/edit-user-profile");
    } else {
      closeMenu();
      navigate("/login");
    }
  };

  const toAbout = () => {
    closeMenu();
    navigate(`/${rest.url}/about`);
  };

  const goHome = () => {
    closeMenu();
    navigate(`/${rest.url}`);
  };

  const cancelBt = () => {
    if (!isResOwner && authState?.isRestOwner) {
      dispatch(toggleMenu());
    }
    if (isResOwner && authState?.isRestOwner) {
      dispatch(toggleMenu());
    }
    if (isResOwner && !authState?.isRestOwner) {
      setIsUser(false);
    }
    if (!isResOwner && !authState?.isRestOwner) {
      dispatch(toggleMenu());
    }
    //isResOwner ? setIsUser(false) : dispatch(toggleMenu());
  };

  const ifShowBottom = () => {
    if (!authState?.isRestOwner && isResOwner) {
      return false;
    }
    return true;
  };

  const ifShowOther = () => {
    if (isResOwner && authState?.isRestOwner) {
      return false;
    }
    if (isResOwner || authState?.isRestOwner) {
      return true;
    }
    return false;
  };

  const toEditRestProfile = () => {
    closeMenu();
    navigate("/edit-rest-profile");
  };

  return (
    <>
      <div
        className={`${
          mMenu
            ? "animate__animated animate__slideInRight"
            : "animate__animated animate__slideOutRight"
        } mobile-menu`}
      >
        <div className="pt-4 mt-4">
          <div className="col-10 offset-1 mt-4 text-end">
            {!isResOwner || authState?.isRestOwner ? (
              <>
                {" "}
                <span className="fs-18">{rest.name}</span>
                <hr />
              </>
            ) : null}

            <div
              className="text-start"
              style={{
                position: "absolute",
                top: "2%",
                width: "90%",
                left: "5%",
              }}
            >
              <>
                <span className="fw-bold fs-23 pe-2">
                  {isResOwner && !authState?.isRestOwner ? "qrb" : ""}
                </span>
                <span className="text-secondary fs-14">
                  {isResOwner && !authState?.isRestOwner ? "digital menu" : ""}
                </span>
              </>
              {authState?.isRestOwner && !isResOwner && (
                <span>
                  <svg
                    onClick={toEditRestProfile}
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "27px",
                      height: "25px",
                      position: "absolute",
                      right: "15%",
                      top: "25%",
                    }}
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
              <span onClick={cancelBt} className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "27px",
                    height: "25px",
                    position: "absolute",
                    right: "0%",
                    top: "25%",
                  }}
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
              </span>
            </div>

            {ifShowOther() ? (
              <ResOwnerMobMenu closeMenu={closeMenu} />
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="" onClick={goHome}>
                  <span
                    className={` ${
                      location.pathname === `/${rest.url}` &&
                      "text-decoration-underline"
                    } fs-14`}
                  >
                    home
                  </span>

                  <span className="btn pe-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                      style={{ width: "28px", verticalAlign: "sub" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </span>
                </li>

                <li className="py-3" onClick={toAbout}>
                  <span
                    className={` ${
                      location.pathname === `/${rest.url}/about` &&
                      "text-decoration-underline"
                    } fs-14`}
                  >
                    info
                  </span>
                  <span className="btn pe-0">
                    <svg
                      viewBox="0 0 20 21"
                      fill="currentColor"
                      className="svg-icon-menu"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 11.5C9 10.9477 9.44771 10.5 10 10.5C10.5523 10.5 11 10.9477 11 11.5V14.5C11 15.0523 10.5523 15.5 10 15.5C9.44771 15.5 9 15.0523 9 14.5V11.5ZM10 6C9.17157 6 8.5 6.67157 8.5 7.5C8.5 8.32843 9.17157 9 10 9C10.8284 9 11.5 8.32843 11.5 7.5C11.5 6.67157 10.8284 6 10 6ZM0 10.5C0 4.97715 4.47715 0.5 10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5ZM10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5Z"
                        fill="#252525"
                      />
                    </svg>
                  </span>
                </li>

                <li className="" onClick={goMenu}>
                  <span
                    className={` ${
                      location.pathname === `/${rest.url}/menu` &&
                      "text-decoration-underline"
                    } fs-14`}
                  >
                    menu
                  </span>
                  <span className="btn pe-0">
                    <svg
                      className="svg-icon-menu"
                      viewBox="0 0 14 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 0.5C13.2449 0.500032 13.4813 0.589956 13.6644 0.752715C13.8474 0.915475 13.9643 1.13975 13.993 1.383L14 1.5V17.5C13.9997 17.7549 13.9021 18 13.7272 18.1854C13.5522 18.3707 13.313 18.4822 13.0586 18.4972C12.8042 18.5121 12.5536 18.4293 12.3582 18.2657C12.1627 18.1021 12.0371 17.8701 12.007 17.617L12 17.5V12.5H11C10.7551 12.5 10.5187 12.41 10.3356 12.2473C10.1526 12.0845 10.0357 11.8603 10.007 11.617L10 11.5V5.5C10 3.29 11.5 0.5 13 0.5ZM7 0.5C7.24493 0.500032 7.48134 0.589956 7.66437 0.752715C7.84741 0.915475 7.96434 1.13975 7.993 1.383L8 1.5V6.5C7.99988 7.38687 7.70518 8.24858 7.16217 8.94978C6.61916 9.65098 5.85862 10.1519 5 10.374V17.5C4.99972 17.7549 4.90212 18 4.72715 18.1854C4.55218 18.3707 4.31305 18.4822 4.05861 18.4972C3.80416 18.5121 3.55362 18.4293 3.35817 18.2657C3.16271 18.1021 3.0371 17.8701 3.007 17.617L3 17.5V10.374C2.17545 10.1608 1.44041 9.69019 0.901764 9.03051C0.363121 8.37083 0.0489702 7.55652 0.00500011 6.706L0 6.5V1.5C0.000282707 1.24512 0.0978789 0.999968 0.272848 0.814632C0.447817 0.629296 0.686953 0.517765 0.941395 0.502828C1.19584 0.487891 1.44638 0.570675 1.64183 0.734265C1.83729 0.897855 1.9629 1.1299 1.993 1.383L2 1.5V6.5C2.00001 6.85106 2.09243 7.19594 2.26796 7.49997C2.4435 7.804 2.69597 8.05647 3 8.232V1.5C3.00028 1.24512 3.09788 0.999968 3.27285 0.814632C3.44782 0.629296 3.68695 0.517765 3.94139 0.502828C4.19584 0.487891 4.44638 0.570675 4.64183 0.734265C4.83729 0.897855 4.9629 1.1299 4.993 1.383L5 1.5L5.001 8.232C5.28006 8.07069 5.516 7.84433 5.68873 7.57218C5.86145 7.30004 5.96584 6.99018 5.993 6.669L6 6.5V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </li>
              </ul>
            )}

            {ifShowBottom() ? (
              <div className="mm-db">
                <ul
                  className="navbar-nav ml-auto"
                  style={{ position: "relative" }}
                >
                  <>
                    <li className="" onClick={goLogin}>
                      {authState ? (
                        <span
                          className={` ${
                            location.pathname === "/edit-user-profile" &&
                            "text-decoration-underline"
                          } fs-14`}
                        >
                          {authState.field}
                        </span>
                      ) : (
                        <span className="fs-14">login</span>
                      )}
                      <span className="btn pe-0">
                        <svg
                          className="svg-icon-lg"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.0711 3.42892C15.1823 1.54019 12.6711 0.5 10 0.5C7.32895 0.5 4.81766 1.54019 2.92892 3.42892C1.04019 5.31766 0 7.82895 0 10.5C0 13.1711 1.04019 15.6823 2.92892 17.5711C4.81766 19.4598 7.32895 20.5 10 20.5C12.6711 20.5 15.1823 19.4598 17.0711 17.5711C18.9598 15.6823 20 13.1711 20 10.5C20 7.82895 18.9598 5.31766 17.0711 3.42892ZM4.34006 17.2694C4.67026 14.4282 7.11304 12.2346 10 12.2346C11.5219 12.2346 12.953 12.8276 14.0295 13.9039C14.939 14.8135 15.5125 16.0011 15.6601 17.2693C14.1266 18.5536 12.1521 19.3281 10 19.3281C7.8479 19.3281 5.87357 18.5537 4.34006 17.2694ZM10 11.0276C8.32535 11.0276 6.96274 9.66504 6.96274 7.99039C6.96274 6.31558 8.32535 4.95312 10 4.95312C11.6747 4.95312 13.0373 6.31558 13.0373 7.99039C13.0373 9.66504 11.6747 11.0276 10 11.0276ZM16.6687 16.2787C16.3701 15.0747 15.7474 13.9647 14.8581 13.0754C14.1379 12.3552 13.2858 11.8148 12.3566 11.4763C13.4737 10.7187 14.2091 9.43875 14.2091 7.99039C14.2091 5.66953 12.3209 3.78125 10 3.78125C7.67914 3.78125 5.79086 5.66953 5.79086 7.99039C5.79086 9.43951 6.52695 10.7199 7.64496 11.4773C6.79001 11.7889 5.99884 12.2706 5.31815 12.9048C4.33243 13.8228 3.64792 14.9933 3.33054 16.2777C1.98639 14.7282 1.17188 12.7075 1.17188 10.5C1.17188 5.63214 5.13214 1.67188 10 1.67188C14.8679 1.67188 18.8281 5.63214 18.8281 10.5C18.8281 12.7079 18.0133 14.7291 16.6687 16.2787Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </li>

                    <hr />
                  </>

                  <li style={{ paddingTop: "5%", paddingBottom: "23%" }}>
                    <div
                      className="text-start"
                      style={{ position: "relative" }}
                    >
                      <div style={{ position: "absolute", left: "0%" }}>
                        <span className="fs-14">owner mode</span>
                      </div>
                      <div style={{ position: "absolute", left: "43%" }}>
                        <Form.Check
                          type="switch"
                          defaultChecked={authState?.isRestOwner}
                          onClick={toggleIsUser}
                          id="custom-switch"
                          style={{ transform: "scale(1.2)" }}
                        />
                      </div>
                    </div>
                  </li>

                  <li className="">
                    <span className="text-secondary px-2 fs-12 text-decoration-underline">
                      powered by{" "}
                    </span>
                    <span className="fw-bold"> qrb</span> <br />
                    {/*<span>
                      autState.isRest ={" "}
                      {authState?.isRestOwner ? "true" : "false"}
                    </span>{" "}
                    <br />
                    <span>normal.isre = {isResOwner ? "true" : "false"}</span>*/}
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
