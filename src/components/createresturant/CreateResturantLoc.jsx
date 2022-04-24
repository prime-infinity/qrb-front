import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRestLoc } from "../../helpers/web";
import {
  incrementCreationState,
  setResLoc,
} from "../../redux/slices/createRestSlice";

function CreateResturantLoc() {
  const authState = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setErrors] = useState(null);
  const [pending, setPending] = useState(false);

  const errorDiv = <small className="text-danger">{error}</small>;

  const handleErrors = (e) => {
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    dispatch(incrementCreationState());
    dispatch(setResLoc(e));
    navigate("/create-resturant/year");
  };

  const next = () => {
    setPending(true);

    createRestLoc({ location: name }, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccess(res);
      })
      .catch((err) => {
        setPending(false);
        handleErrors(err);
      });
  };
  const disabled = () => {
    if (name === "") {
      return true;
    }
    return false;
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-10">
          <span className="fw-bold h2">business location</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="city"
            className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <div className="row text-center">
            <div className="col-12">{error ? errorDiv : null}</div>
          </div>
          <button
            onClick={next}
            disabled={disabled()}
            className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
          >
            {pending && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {!pending && <span>next</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantLoc;
