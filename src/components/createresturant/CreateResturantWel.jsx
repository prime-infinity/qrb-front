import { useEffect, useState } from "react";
import DoneCreatRest from "../../ui/DoneCreatRest";
import { useSelector, useDispatch } from "react-redux";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";
import { createRestFinal } from "../../helpers/web";
import { setIsResOwner, saveAuthToLocal } from "../../redux/slices/authSlice";
import { incrementCreationState } from "../../redux/slices/createRestSlice";
import { setRest } from "../../redux/slices/restSlice";

function CreateResturantWel() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);
  const restCreation = useSelector((state) => state.createrest);
  const [file, selectFile] = useFileUpload();
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);

  const errorDiv = <small className="text-danger">{error}</small>;

  useEffect(() => {
    dispatch(incrementCreationState(5));
  }, [dispatch]);

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    //set resturnat in state
    dispatch(setRest(e));
    setDone(true);
    //change the isRstOwner of user to true
    dispatch(setIsResOwner(true));
    dispatch(saveAuthToLocal());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const next = () => {
    setPending(true);
    const formData = new FormData();
    formData.append("welcome-image", file.file, file.name);
    formData.append("name", restCreation.restName);
    formData.append("location", restCreation.restLoc);
    formData.append("year", restCreation.restYear);
    formData.append("description", restCreation.restDesc);

    createRestFinal(formData, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });
  };
  const skip = () => {
    setPending(true);
    const formData = new FormData();
    formData.append("name", restCreation.restName);
    formData.append("location", restCreation.restLoc);
    formData.append("year", restCreation.restYear);
    formData.append("description", restCreation.restDesc);

    createRestFinal(formData, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  return done ? (
    <DoneCreatRest />
  ) : (
    <div
      className="container-fluid pt-5 big-bg-theme"
      style={{ minHeight: "100vh" }}
    >
      <div className="row px-2 pt-5">
        <div className="col-1 pt-1">5.</div>
        <div className="col-10">
          <span className=" h2">welcome screen</span>

          <div className="row">
            {!file && (
              <div
                className="col-6 offset-3 text-center border-dashed my-5"
                style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
                onClick={() => {
                  selectFile({ accept: ".jpg, .jpeg" });
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "30px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            )}
            {file && (
              <div className="col-6 offset-3 my-4">
                <img
                  onClick={() => {
                    selectFile({ accept: ".jpg, .jpeg" });
                  }}
                  src={file.source}
                  alt={file.name}
                  className="img-fluid"
                />
              </div>
            )}
          </div>
          <div className="row text-center">
            <div className="col-12">{error ? errorDiv : null}</div>
          </div>
          <button
            onClick={next}
            disabled={!file || pending}
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
            the content you upload here will be shown on your profile page.you
            can add a photo of the food or ambience.
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantWel;
