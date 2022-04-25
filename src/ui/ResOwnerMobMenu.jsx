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
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  return (
    <>
      {authState.isRestOwner ? (
        <ul className="navbar-nav ml-auto">
          <li className="">
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
          <li className="">
            <span>edit my info</span>

            <span className="btn pe-0">{editIcon}</span>
          </li>
          <li className="">
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
