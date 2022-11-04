import { useNavigate /*, useLocation*/ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LongTextSvg from "./LongTextSvg";
import { setEditnMenu } from "../redux/slices/menuSlice";

function ResOwnerMobMenu({ closeMenu }) {
  //const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);
  let navigate = useNavigate();
  const resOwnerGetStarted = () => {
    closeMenu();
    if (!authState) {
      navigate("/login");
    } else {
      navigate("/create-resturant/name");
    }
  };

  const editMyInfo = () => {
    closeMenu();
    navigate("/edit-rest-profile");
  };

  const editMyMenu = () => {
    //console.log("is editing menu");
    closeMenu();
    dispatch(setEditnMenu(true));
    navigate(`/${rest.url}/menu`);
  };
  const goHome = () => {
    closeMenu();
    navigate(`/${rest.url}`);
  };
  /*const properUrl = (url) => {
    return url.replace("%20", " ");
  };*/
  return (
    <>
      {authState?._id === rest.user ? (
        <ul className="navbar-nav ml-auto">
          <li className="" onClick={goHome}>
            <span className={`text-decoration-underline fs-14`}>gallery</span>

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
          <li className="py-3" onClick={editMyInfo}>
            <span className={` text-decoration-underline  fs-14`}>wiki</span>

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
          <li className="" onClick={editMyMenu}>
            <span className={`text-decoration-underline  fs-14`}>menu</span>

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
      ) : (
        <div>
          <div style={{ position: "absolute", top: "10%" }}>
            <img src="/icons/peoplesitin.png" className="img-fluid" alt="" />
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              top: "45%",
              width: "90%",
              left: "5%",
            }}
          >
            <LongTextSvg />
          </div>

          <div
            className=""
            style={{
              position: "absolute",
              bottom: "17%",
              width: "90%",
              left: "5%",
            }}
          >
            <button
              onClick={resOwnerGetStarted}
              className="btn py-2 w-100 bg-them text-white  fw-bold"
            >
              start now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon-lg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ResOwnerMobMenu;
