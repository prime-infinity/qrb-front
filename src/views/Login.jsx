import { useState } from "react";
import LoginFirst from "../components/login/LoginFirst";
import LoginSecond from "../components/login/LoginSecond";

function Login() {
  const [secondStage, setSecondStage] = useState(false);

  return (
    <div className="container-fluid pt-5 px-3">
      <div className="row pt-5">
        <div className="col-12 mb-3">
          <input
            type="text"
            placeholder="enter mobile no. or email"
            className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>

        {secondStage ? (
          <LoginSecond />
        ) : (
          <LoginFirst procedToSecond={() => setSecondStage(true)} />
        )}
      </div>
    </div>
  );
}

export default Login;
