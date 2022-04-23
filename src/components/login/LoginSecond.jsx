import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSecond } from "../../helpers/web";
import OTPInput, { ResendOTP } from "otp-input-react";
import React from "react";

function LoginSecond({ resend, field }) {
  let navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [doneCounting, setDoneC] = useState(false);
  const [ss, sss] = useState(true);

  const verifyToken = () => {
    loginSecond({ field: field, code: OTP })
      .then((res) => {
        console.log(res);
        if (res === "approved") {
          navigate("/");
        }
      })
      .catch((err) => {
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
    resend();
    sss(false);
    setDoneC(false);
    setTimeout(() => {
      sss(true);
    }, 2);
  };

  return (
    <div className="col-12 mt-5 mb-5">
      <span className="fw-bold h1">verfication code</span> <br />
      <span>enter the 4 digit number that we sent to {field} or your pin</span>
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
                inputClassName="ww-25 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
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
        enter qrb
      </button>
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
