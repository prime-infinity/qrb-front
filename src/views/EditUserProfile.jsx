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
import OTPInput from "otp-input-react";

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
    pin: "",
  });

  const setOT = (e) => {
    console.log(e);
  };
  useEffect(() => {
    if (authState !== null) {
      setFrom({
        fullname: authState.fullname || "",
        phone: authState.phone || "",
        email: authState.email || "",
        pin: authState.pin || "",
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

  const navBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="container-fluid pt-5 big-bg-theme"
      style={{ minHeight: "100vh" }}
    >
      <div className="row pt-4">
        <div className="col-12">
          <div className="row mx-1">
            <div className="col-12 ps-0 pe-0">
              <input
                value={formData.fullname}
                onChange={(e) =>
                  setFrom({ ...formData, fullname: e.target.value })
                }
                type="text"
                placeholder={"full name"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <input
                value={formData.phone}
                onChange={(e) =>
                  setFrom({ ...formData, phone: e.target.value })
                }
                type="text"
                placeholder={"phone"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <input
                value={formData.email}
                onChange={(e) =>
                  setFrom({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder={"email"}
                className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
            </div>

            <div className="col-12 ps-0 pe-0 mt-5 mb-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "18px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="fs-14 ps-3">easy login pin</span>
              </span>
              <OTPInput
                value={formData.pin}
                onChange={(e) => setFrom({ ...formData, pin: e })}
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputClassName="ww-25 form-control big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0 mt-3"
              />
            </div>
            <div className="col-12 ps-0 pe-0 mt-4">
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
                <li className="mt-2" onClick={logout}>
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
            <div className="col-12 ps-0 pe-0 ">
              <div className="row text-center">
                <div className="col-12">{error ? errorDiv : null}</div>
              </div>
              <div className="row mm-db" style={{ width: "98%" }}>
                <div className="col-3 pe-0">
                  <button
                    className="btn py-3 w-100"
                    style={{ border: "1px solid black" }}
                    onClick={navBack}
                  >
                    back
                  </button>
                </div>
                <div className="col-9">
                  {isUpdated ? (
                    <button
                      className="btn py-3 btn-success w-100 "
                      type="button"
                    >
                      {" "}
                      Updated
                    </button>
                  ) : (
                    <button
                      onClick={update}
                      disabled={pending}
                      className="btn py-3 w-100 bg-them text-white"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
