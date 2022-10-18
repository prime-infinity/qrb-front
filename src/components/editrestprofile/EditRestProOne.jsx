import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editRestProOne, updateRestWelcomeVideo } from "../../helpers/web";
import { setRest, setRestWelcomScreen } from "../../redux/slices/restSlice";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";

function EditRestProOne() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [file, selectFile] = useFileUpload();
  const [fileSele, setFileSe] = useState(true);
  const [isFilePending, setFilePending] = useState(false);
  const [formData, setFrom] = useState({
    id: "",
    name: "",
    location: "",
    year: "",
    description: "",
  });
  const [fileErrs, setFileErrs] = useState(null);

  useEffect(() => {
    if (rest !== null) {
      setFrom({
        id: rest._id || "",
        name: rest.name || "",
        location: rest.location || "",
        year: rest.year || "",
        description: rest.description || "",
      });
    }
  }, [rest]);

  const errorDiv = <small className="text-danger">{error}</small>;
  const fileErr = <small className="text-danger">{fileErrs}</small>;

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    setIsUpdated(true);
    setPending(false);
    dispatch(setRest(e));
    setTimeout(() => {
      setIsUpdated(false);
    }, 2000);
  };

  const update = () => {
    setPending(true);
    setErrors(null);
    editRestProOne(formData, authState.token)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  const handleErrorsFile = (e) => {
    setFilePending(false);
    e.response?.data ? setFileErrs(e.response.data) : setFileErrs(e.message);
  };

  const handleSuccessFile = (e) => {
    setFilePending(false);
    dispatch(setRestWelcomScreen(e.welcomescreen));
    alert("welcome screen updated");
    setTimeout(() => {
      navigate(`/${rest.url}`);
    }, 1000);
  };

  const uploadFile = () => {
    setFilePending(true);
    setFileErrs(null);
    const formData = new FormData();
    formData.append("welcome-image", file.file, file.name);
    formData.append("restid", rest._id);

    updateRestWelcomeVideo(formData, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccessFile(res);
      })
      .catch((err) => {
        handleErrorsFile(err);
      });
  };
  const forceUpdate = (e) => {
    console.log(e);
    setFileSe(false);
    setTimeout(() => {
      setFileSe(true);
    }, 200);
  };
  return (
    <div className="col-12">
      <div className="row mx-1">
        <div className="col-12">
          <input
            value={formData.name}
            onChange={(e) => setFrom({ ...formData, name: e.target.value })}
            type="text"
            placeholder={formData.name}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.location}
            onChange={(e) => setFrom({ ...formData, location: e.target.value })}
            type="text"
            placeholder={formData.location}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.year}
            onChange={(e) => setFrom({ ...formData, year: e.target.value })}
            type="text"
            placeholder={formData.year}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.description}
            onChange={(e) =>
              setFrom({ ...formData, description: e.target.value })
            }
            type="text"
            placeholder={
              formData.description ? formData.description : "brief description"
            }
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
        </div>

        <div className="col-12">
          <div className="row text-center">
            <div className="col-12">{error ? errorDiv : null}</div>
          </div>
          {isUpdated ? (
            <button
              className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
              type="button"
            >
              {" "}
              Updated
            </button>
          ) : (
            <button
              onClick={update}
              disabled={pending}
              className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
            >
              {pending && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {!pending && <span>update</span>}
            </button>
          )}
        </div>

        <div className="covers-list-wrapper mt-3">
          <span className="fs-14 text-secondary">replace background video</span>
          <div className="row text-center">
            <div className="col-12">{fileErrs ? fileErr : null}</div>
          </div>
          <ul className="covers-list ps-0">
            {!file && (
              <li>
                <label
                  onClick={() => {
                    selectFile({ accept: "video/*" }, ({ name }) => {
                      forceUpdate(name);
                    });
                  }}
                  className="cover-item"
                >
                  <img src="/ang/round-add.svg" alt="" />
                </label>
              </li>
            )}
            {file && (
              <li>
                {!isFilePending && (
                  <label onClick={uploadFile} className="cover-item" style={{}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "35px" }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                    </svg>
                  </label>
                )}
                {isFilePending && (
                  <label className="cover-item" style={{}}>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </label>
                )}
              </li>
            )}
            {file && (
              <li
                onClick={() => {
                  selectFile({ accept: "video/*" }, ({ name }) => {
                    forceUpdate(name);
                  });
                }}
              >
                <span className="cover-item">
                  <div id="videowrapper">
                    <div id="fullScreenDiv">
                      {fileSele && (
                        <video
                          id="video"
                          role="presentation"
                          preload="auto"
                          playsInline
                          crossOrigin="anonymous"
                          loop
                          muted
                          autoPlay
                        >
                          <source src={file.source} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </div>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default EditRestProOne;
