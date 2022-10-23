import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRestDesc } from "../../helpers/web";
import {
  incrementCreationState,
  setResDesc,
} from "../../redux/slices/createRestSlice";

function CreateResturantDesc() {
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

  useEffect(() => {
    dispatch(incrementCreationState(4));
  }, [dispatch]);

  const handleSuccess = (e) => {
    dispatch(setResDesc(e));
    navigate("/create-resturant/welcome");
  };

  const next = () => {
    setPending(true);

    createRestDesc({ description: name }, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccess(res);
      })
      .catch((err) => {
        setPending(false);
        handleErrors(err);
      });
  };
  const skip = () => {
    navigate("/create-resturant/welcome");
  };
  const disabled = () => {
    if (name === "") {
      return true;
    }
    return false;
  };

  return (
    <div className="container-fluid pt-1 big-bg-theme mw-100">
      <div className="row px-2 pt-5">
        <div className="col-1 pt-1">4.</div>
        <div className="col-10">
          <span className="h2">it is</span>
          <textarea
            type="text"
            value={name}
            placeholder="e.g fusion asian bistro"
            onChange={(e) => setName(e.target.value)}
            className="my-4 big-bg-theme pb-0 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
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

          <button
            onClick={skip}
            className="btn py-3 my-3 w-100 text-decoration-underline q-font-weight-bold"
          >
            skip
          </button>
        </div>
        <div className="col-11" style={{ position: "absolute", bottom: "3%" }}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon me-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="fs-14 text-secondary">
            provide a short description about your business, what you do, what
            you are known for
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantDesc;
