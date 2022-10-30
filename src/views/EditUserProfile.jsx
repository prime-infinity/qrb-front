import { removeFromLocal } from "../helpers/storage";
import {
  saveAuthToLocal,
  setAuth,
  setAuthDetails,
} from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUserProfile } from "../helpers/web";

function EditUserProfile() {
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const [isUpdated, setIsUpdated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setAuth(null));
    removeFromLocal();
    navigate(`/${rest.name}`);
  };

  const errorDiv = <small className="text-danger">{error}</small>;

  const [formData, setFrom] = useState({
    fullname: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (authState !== null) {
      setFrom({
        fullname: authState.fullname || "",
        phone: authState.phone || "",
        email: authState.email || "",
      });
    }
  }, [authState]);

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    //console.log(e);
    setIsUpdated(true);
    setPending(false);
    dispatch(setAuthDetails(e));
    dispatch(saveAuthToLocal());
  };

  const update = () => {
    setPending(true);
    setErrors(null);

    editUserProfile(formData, authState.token)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  return (
    <div
      className="container-fluid pt-5 big-bg-theme"
      style={{ minHeight: "100vh" }}
    >
      <div className="row pt-5">
        <div className="col-12">
          <div className="row mx-1">
            <div className="col-12">
              <input
                value={formData.fullname}
                onChange={(e) =>
                  setFrom({ ...formData, fullname: e.target.value })
                }
                type="text"
                placeholder={"full name*"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <input
                value={formData.phone}
                onChange={(e) =>
                  setFrom({ ...formData, phone: e.target.value })
                }
                type="text"
                placeholder={"phone*"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <input
                value={formData.email}
                onChange={(e) =>
                  setFrom({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder={"email*"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
            </div>

            <div className="col-12">
              <div className="row text-center">
                <div className="col-12">{error ? errorDiv : null}</div>
              </div>
              {isUpdated ? (
                <button
                  className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
                  type="button"
                >
                  {" "}
                  Updated
                </button>
              ) : (
                <button
                  onClick={update}
                  disabled={pending}
                  className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
                >
                  {pending && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {!pending && <span>update</span>}
                </button>
              )}
            </div>

            {/*<div className="col-12">
              <ul className="navbar-nav">
                <li className="pb-3">
                  <span>
                    <svg
                      className="svg-icon me-2"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33333 9.66732C2.96514 9.66732 2.66667 9.9658 2.66667 10.334C2.66667 10.7022 2.96514 11.0007 3.33333 11.0007H4.66667C5.03486 11.0007 5.33333 10.7022 5.33333 10.334C5.33333 9.9658 5.03486 9.66732 4.66667 9.66732H3.33333ZM2 0.333984C0.895431 0.333984 0 1.22941 0 2.33398V11.6673C0 12.7719 0.89543 13.6673 2 13.6673H6C7.10457 13.6673 8 12.7719 8 11.6673V2.33398C8 1.22942 7.10457 0.333984 6 0.333984H2ZM1.33333 2.33398C1.33333 1.96579 1.63181 1.66732 2 1.66732H6C6.36819 1.66732 6.66667 1.96579 6.66667 2.33398V11.6673C6.66667 12.0355 6.36819 12.334 6 12.334H2C1.63181 12.334 1.33333 12.0355 1.33333 11.6673V2.33398Z"
                        fill="#212121"
                      />
                    </svg>

                    <span className="fs-14">{"change pin"}</span>
                  </span>
                </li>
                <li className="pb-3">
                  <span>
                    <svg
                      className="svg-icon me-2"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33333 9.66732C2.96514 9.66732 2.66667 9.9658 2.66667 10.334C2.66667 10.7022 2.96514 11.0007 3.33333 11.0007H4.66667C5.03486 11.0007 5.33333 10.7022 5.33333 10.334C5.33333 9.9658 5.03486 9.66732 4.66667 9.66732H3.33333ZM2 0.333984C0.895431 0.333984 0 1.22941 0 2.33398V11.6673C0 12.7719 0.89543 13.6673 2 13.6673H6C7.10457 13.6673 8 12.7719 8 11.6673V2.33398C8 1.22942 7.10457 0.333984 6 0.333984H2ZM1.33333 2.33398C1.33333 1.96579 1.63181 1.66732 2 1.66732H6C6.36819 1.66732 6.66667 1.96579 6.66667 2.33398V11.6673C6.66667 12.0355 6.36819 12.334 6 12.334H2C1.63181 12.334 1.33333 12.0355 1.33333 11.6673V2.33398Z"
                        fill="#212121"
                      />
                    </svg>

                    <span className="fs-14">{"saved payment methods"}</span>
                  </span>
                </li>
              </ul>
            </div>*/}

            <div className="col-12 mm-db" style={{ bottom: "8%" }}>
              <ul className="navbar-nav">
                <li className="">
                  <span className="btn ps-0">
                    <svg
                      className="svg-icon-lg"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0.5C15.5228 0.5 20 4.97715 20 10.5V17.5C20 19.1569 18.6569 20.5 17 20.5H14C13.4477 20.5 13 20.0523 13 19.5V13.5C13 12.9477 13.4477 12.5 14 12.5H18.5V10.5C18.5 5.80558 14.6944 2 10 2C5.30558 2 1.5 5.80558 1.5 10.5V12.5H6C6.55228 12.5 7 12.9477 7 13.5V19.5C7 20.0523 6.55228 20.5 6 20.5H3C1.34315 20.5 0 19.1569 0 17.5V10.5C0 4.97715 4.47715 0.5 10 0.5Z"
                        fill="#212121"
                      ></path>
                    </svg>
                  </span>
                  <span className={`fs-14`}>tech support</span>
                </li>
                <li className="mt-4" onClick={logout}>
                  <span className="btn ps-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon-lg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className={`fs-14`}>log out</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
