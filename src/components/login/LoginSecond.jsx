import { useNavigate } from "react-router-dom";

function LoginSecond() {
  let navigate = useNavigate();
  const enter = () => {
    navigate("/");
  };

  return (
    <div className="col-12 mt-5 mb-5">
      <span className="fw-bold h1">verfication code</span> <br />
      <span>
        enter the 4 digit number that we sent to 541-754-300 or your pin
      </span>
      <div className="row mt-3 mb-5">
        <div className="col-3">
          <input
            type="number"
            maxLength="1"
            className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>
        <div className="col-3">
          <input
            type="number"
            className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>
        <div className="col-3">
          <input
            type="number"
            className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>
        <div className="col-3">
          <input
            type="number"
            className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>
      </div>
      <button
        onClick={enter}
        className="btn mt-3 py-3 w-100 bg-them text-white q-font-weight-bold"
      >
        enter qrb
      </button>
      <div className="row justify-content-center mt-2">
        <div className="col-10">
          didn't receive anything? <span className="fw-bold">resend code</span>
        </div>
      </div>
    </div>
  );
}

export default LoginSecond;
