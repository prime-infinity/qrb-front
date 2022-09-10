import { useState } from "react";
import LoginFirst from "../components/login/LoginFirst";
import LoginSecond from "../components/login/LoginSecond";
import { loginFirst } from "../helpers/web";
import "../react-phone-number.css";
import PhoneInput from "react-phone-number-input";

function Login() {
  const [secondStage, setSecondStage] = useState(false);
  const [field, setField] = useState();
  const [firstPending, setFirstPending] = useState(false);
  const [error, setErrors] = useState(null);
  const handleErrors = (e) => {
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const sendVeri = () => {
    setErrors(null);
    setFirstPending(true);

    loginFirst({ field: field })
      .then((res) => {
        //should move to second
        console.log(res);
        if (res === "pending") {
          setFirstPending(false);
          setSecondStage(true);
        }
      })
      .catch((err) => {
        handleErrors(err);
        console.log(err);
        setFirstPending(false);
        //setSecondStage(true); //should go
      });
  };

  const disableButton = () => {
    if (!field) {
      return true;
    }
    return false;
  };
  const errorDiv = <small className="text-danger">{error}</small>;
  return (
    <div
      className="container-fluid pt-5 px-4 big-bg-theme"
      style={{ minHeight: "100vh", maxHeight: "100vh" }}
    >
      <div
        className="row pt-5"
        style={{ position: "fixed", width: "94%", left: "6%" }}
      >
        <div className="col-12 mb-3">
          <PhoneInput
            placeholder="enter mobile no"
            defaultCountry="US"
            readOnly={secondStage}
            className="form-control pb-0 big-bg-theme mb-2 border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
            value={field}
            onChange={setField}
          />
          <div className="row text-center">
            <div className="col-12">{error ? errorDiv : null}</div>
          </div>
        </div>

        {secondStage ? (
          <LoginSecond resend={sendVeri} field={field} />
        ) : (
          <LoginFirst
            firstPending={firstPending}
            disableButton={disableButton()}
            procedToSecond={sendVeri}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
