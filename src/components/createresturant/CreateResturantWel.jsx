import { useState } from "react";
import DoneCreatRest from "../../ui/DoneCreatRest";
import { useSelector } from "react-redux";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";
import { createRestFinal } from "../../helpers/web";

function CreateResturantWel() {
  let navigate = useNavigate();
  const authState = useSelector((state) => state.auth.auth);
  const restCreation = useSelector((state) => state.createrest);
  const [file, selectFile] = useFileUpload();
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);

  const errorDiv = <small className="text-danger">{error}</small>;

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = () => {
    setDone(true);
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
    handleSuccess();
  };

  return done ? (
    <DoneCreatRest />
  ) : (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-10">
          <span className="fw-bold h2">welcome screen</span>

          <div className="row">
            {!file && (
              <div
                className="col-6 offset-3 text-center border my-5"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
          <span>
            the content you upload here will be shown on your profile page.you
            can add a photo of the food or ambience.
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantWel;
