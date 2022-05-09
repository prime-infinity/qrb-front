import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSecond } from "../../helpers/web";
import OTPInput, { ResendOTP } from "otp-input-react";
import { setAuth, saveAuthToLocal } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function LoginSecond({ resend, field }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  const [doneCounting, setDoneC] = useState(false);
  const [ss, sss] = useState(true);
  const [pending, setPending] = useState(false);

  const [error, setErrors] = useState(null);
  const handleErrors = (e) => {
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const verifyToken = () => {
    setErrors(null);
    setPending(true);

    loginSecond({ field: field, code: OTP })
      .then((res) => {
        dispatch(setAuth(res));
        dispatch(saveAuthToLocal());
        console.log(res);

        navigate("/");
      })
      .catch((err) => {
        setPending(false);
        handleErrors(err);
        console.log(err);
      });
  };

  const renderSecButton = () => {
    return <button className="d-none"></button>;
  };

  const toggleDoneCoun = () => {
    setDoneC(true);
  };

  const erresend = () => {
    setErrors(null);
    resend();
    sss(false);
    setDoneC(false);
    setTimeout(() => {
      sss(true);
    }, 2);
  };
  const errorDiv = <small className="text-danger">{error}</small>;
  return (
    <div className="col-12 mt-5 mb-5">
      <span className="h3">verfication code</span> <br />
      <span className="fs-14 text-secondary">
        enter the 4 digit number that we sent to {field}.
      </span>
      <div className="row mt-3 mb-5">
        <div className="col-12">
          {ss && (
            <>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputClassName="ww-25 form-control big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />

              <ResendOTP
                onTimerComplete={toggleDoneCoun}
                renderButton={renderSecButton}
              />
            </>
          )}
        </div>
      </div>
      <button
        onClick={verifyToken}
        className="btn mt-3 py-3 w-100 bg-them text-white q-font-weight-bold"
      >
        {pending && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {!pending && <span>enter qrb</span>}
      </button>
      <div className="row text-center">
        <div className="col-12">{error ? errorDiv : null}</div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-10">
          didn't receive anything?{" "}
          {doneCounting ? (
            <span className="fw-bold" onClick={erresend}>
              resend code
            </span>
          ) : !doneCounting ? (
            <span className="">please wait</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LoginSecond;
