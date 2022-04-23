import { useState } from "react";
import LoginFirst from "../components/login/LoginFirst";
import LoginSecond from "../components/login/LoginSecond";
import { loginFirst } from "../helpers/web";
function Login() {
  const [secondStage, setSecondStage] = useState(false);
  const [field, setField] = useState("");
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
    if (field === "") {
      return true;
    }
    return false;
  };
  const errorDiv = <small className="text-danger">{error}</small>;
  return (
    <div className="container-fluid pt-5 px-3">
      <div className="row pt-5">
        <div className="col-12 mb-3">
          <input
            readOnly={secondStage}
            value={field}
            onChange={(e) => setField(e.target.value)}
            type="number"
            placeholder="enter mobile no"
            className="form-control mb-2 border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
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
