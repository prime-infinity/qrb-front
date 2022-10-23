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
  const [fileSele, setFileSe] = useState(true);
  const [mediaType, setMediaType] = useState(0);
  const [hasRend, setRendered] = useState(true);
  const [realFile, setReal] = useState(null);

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
      navigate(`/${e.url}`);
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
  const forceUpdate = (e) => {
    setReal(e);
    setFileSe(false);
    setRendered(false);
    setTimeout(() => {
      setFileSe(true);
      setRendered(true);
    }, 10);
  };
  const setMType = (e) => {
    setMediaType(e);
  };
  return done ? (
    <DoneCreatRest />
  ) : (
    <div className="container-fluid pt-1 big-bg-theme mw-100">
      <div className="row px-2 pt-5">
        <div className="col-1 pt-1">5.</div>
        <div className="col-10">
          <div className="row">
            <div className="col-12">
              <span className=" h2">background media</span>
            </div>
          </div>

          <div className="row mt-4 justify-content-center">
            <div className="col-6">
              <div className="row border-black br-4">
                <div
                  onClick={() => setMType(0)}
                  className="col-6 py-2 text-center d-ani-fast"
                  style={{
                    opacity: "0.65",
                    backgroundColor: mediaType === 0 ? "black" : "#f6f4f2",
                    color: mediaType === 0 ? "white" : "black",
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{ width: "25px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  onClick={() => setMType(1)}
                  style={{
                    opacity: "0.65",
                    backgroundColor: mediaType === 1 ? "black" : "#f6f4f2",
                    color: mediaType === 1 ? "white" : "black",
                  }}
                  className="col-6 py-2 text-center d-ani-fast"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{ width: "25px" }}
                    >
                      <path
                        strokeLinecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {hasRend && (
            <div className="row justify-content-center">
              {mediaType === 1 && !file && (
                <div
                  className="col-6 text-center border-dashed my-5"
                  style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
                  onClick={() => {
                    selectFile({ accept: "video/mp4" }, ({ file }) => {
                      forceUpdate(file);
                    });
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
              {mediaType === 0 && !file && (
                <div
                  className="col-6 text-center border-dashed my-5"
                  style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
                  onClick={() => {
                    selectFile({ accept: "image/*" }, ({ file }) => {
                      forceUpdate(file);
                    });
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      style={{ width: "30px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </span>
                </div>
              )}
              {mediaType === 1 && file && (
                <>
                  {realFile.type == "video/mp4" ? (
                    <div className="col-10 my-4">
                      <div className="covers-list-wrapper">
                        <ul
                          className="covers-list"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <li
                            onClick={() => {
                              selectFile(
                                { accept: "video/mp4" },
                                ({ file }) => {
                                  forceUpdate(file);
                                }
                              );
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
                                      <source
                                        src={file.source}
                                        type="video/mp4"
                                      />
                                    </video>
                                  )}
                                </div>
                              </div>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="col-6 text-center border-dashed my-5"
                      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
                      onClick={() => {
                        selectFile({ accept: "video/mp4" }, ({ file }) => {
                          forceUpdate(file);
                        });
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
                </>
              )}
              {mediaType === 0 && file && (
                <>
                  {" "}
                  {realFile.type == "image/jpeg" ||
                  realFile.type == "image/jpg" ? (
                    <div className="col-10 my-4">
                      <div className="covers-list-wrapper">
                        <ul
                          className="covers-list"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          <li
                            onClick={() => {
                              selectFile({ accept: "image/*" }, ({ file }) => {
                                forceUpdate(file);
                              });
                            }}
                          >
                            <span className="cover-item">
                              <div id="videowrapper">
                                <div id="fullScreenDiv">
                                  {fileSele && (
                                    <img src={file.source} alt="preview" />
                                  )}
                                </div>
                              </div>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="col-6 text-center border-dashed my-5"
                      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
                      onClick={() => {
                        selectFile({ accept: "image/*" }, ({ file }) => {
                          forceUpdate(file);
                        });
                      }}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          style={{ width: "30px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
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
          {!file && (
            <button
              onClick={skip}
              className="btn py-3 my-3 w-100 text-decoration-underline q-font-weight-bold"
            >
              skip
            </button>
          )}
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
            choose a suitable video/image that will be used as the background
            for your restaurant
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantWel;
