import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ResOwnerMobMenu({ closeMenu }) {
  const authState = useSelector((state) => state.auth.auth);
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
      className="svg-icon"
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
    console.log("is editing menu");
  };
  const goHome = () => {
    closeMenu();
    navigate("/");
  };
  return (
    <>
      {authState?.isRestOwner ? (
        <ul className="navbar-nav ml-auto">
          <li className="" onClick={goHome}>
            <span>home</span>

            <span className="btn pe-0">
              <svg
                className="svg-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z" />
              </svg>
            </span>
          </li>
          <li className="" onClick={editMyInfo}>
            <span>edit my info</span>

            <span className="btn pe-0">{editIcon}</span>
          </li>
          <li className="" onClick={editMyMenu}>
            <span>edit my menu</span>

            <span className="btn pe-0">{editIcon}</span>
          </li>
        </ul>
      ) : (
        <div>
          <span className="fw-bold">
            manage your resturant with qrb mobile menu
          </span>
          <div className="row mt-3">
            <div className="col-12 text-start">
              <span className="btn ps-0">
                {/*<svg
              className="svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z" />
            </svg>*/}
              </span>
              <span>
                we will help you set up your digital menu for your customers
              </span>
            </div>
            <div className="col-12 text-start my-3">
              <span className="btn ps-0">
                {/*<svg
              className="svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z" />
            </svg>*/}
              </span>
              <span>
                we will deliver high quality qr code signs for your menu
              </span>
            </div>
            <div className="col-12 text-start">
              <span className="btn ps-0">
                {/*<svg
              className="svg-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z" />
            </svg>*/}
              </span>
              <span>we will arrange photograph for all your menu items</span>
            </div>

            <div className="col-12 my-4">
              <button
                onClick={resOwnerGetStarted}
                className="btn py-2 w-100 bg-them text-white q-font-weight-bold"
              >
                get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
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
