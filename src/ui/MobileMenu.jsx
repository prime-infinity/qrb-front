import Form from "react-bootstrap/Form";
import { useState } from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */
function MobileMenu() {
  const [isUser, setIsUser] = useState(false);

  const toggleIsUser = () => {
    setIsUser(!isUser);
  };

  return (
    <>
      <div className="mobile-menu">
        <div className="pt-5 mt-5">
          <div className="col-10 offset-1 text-end">
            <div className="row mx-auto">
              <div className="col-4">customer</div>
              <div className="col-3 text-center">
                <Form.Check
                  type="switch"
                  defaultChecked={isUser}
                  onClick={toggleIsUser}
                  id="custom-switch"
                />
              </div>
              <div className="col-4">resturant</div>
            </div>

            <hr />

            <ul className="navbar-nav ml-auto">
              <li className="">
                <span>home</span>
                <span className="btn pe-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>{" "}
                </span>
              </li>
              <li className="">
                <span>info</span>
                <span className="btn pe-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>{" "}
                </span>
              </li>
              <li className="">
                <span>Covid pass</span>
                <span className="btn pe-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>{" "}
                </span>
              </li>
              <li className="">
                <span>Menu</span>
                <span className="btn pe-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
