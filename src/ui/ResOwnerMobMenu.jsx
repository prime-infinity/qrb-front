import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ResOwnerMobMenu({ closeMenu }) {
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);
  const location = useLocation();
  let navigate = useNavigate();
  const resOwnerGetStarted = () => {
    closeMenu();
    if (!authState) {
      navigate("/login");
    } else {
      navigate("/create-resturant/name");
    }
  };

  const editIcon = (
    <svg
      className="svg-icon-lg"
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
  );

  const editMyInfo = () => {
    closeMenu();
    navigate("/edit-resturant-details");
  };

  const editMyMenu = () => {
    closeMenu();
    navigate(`/${rest.name}/menu`);
    console.log("is editing menu");
  };
  const goHome = () => {
    closeMenu();
    navigate(`/${rest.name}`);
  };
  return (
    <>
      {authState?.isRestOwner ? (
        <ul className="navbar-nav ml-auto">
          <li className="" onClick={goHome}>
            <span
              className={` ${location.pathname === "/" &&
                "text-decoration-underline"} fs-14`}
            >
              home
            </span>

            <span className="btn pe-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=""
                style={{ width: "25px", verticalAlign: "sub" }}
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
          <li className="" onClick={editMyInfo}>
            <span
              className={` ${location.pathname === "/edit-resturant-details" &&
                "text-decoration-underline"} fs-14`}
            >
              edit my info
            </span>

            <span className="btn pe-0">{editIcon}</span>
          </li>
          <li className="" onClick={editMyMenu}>
            <span
              className={` ${location.pathname === "/menu" &&
                "text-decoration-underline"} fs-14`}
            >
              edit my menu
            </span>

            <span className="btn pe-0">{editIcon}</span>
          </li>
        </ul>
      ) : (
        <div>
          <span className="">
            manage your resturant with{" "}
            <span className="text-decoration-underline">qrb mobile menu</span>{" "}
          </span>

          <div className="row mt-3">
            <div className="col-12 px-0">
              <img src="/icons/gettins.png" alt="" />
            </div>
            <div className="col-12 px-0 my-4">
              <button
                onClick={resOwnerGetStarted}
                className="btn py-2 w-100 bg-them text-white q-font-weight-bold"
              >
                get started
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
        </div>
      )}
    </>
  );
}

export default ResOwnerMobMenu;
