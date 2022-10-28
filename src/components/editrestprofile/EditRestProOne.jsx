import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editRestProOne,
  updateRestWelcomeVideo,
  updateRestWelcomeImage,
} from "../../helpers/web";
import { setRest, setRestWelcomScreen } from "../../redux/slices/restSlice";
import { useFileUpload } from "use-file-upload";
import { useNavigate } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

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
  const [mediaType, setMediaType] = useState(0);
  const [hasRend, setRendered] = useState(true);
  const [realFile, setReal] = useState(null);
  const [color, setColor] = useColor("hex", "#121212");

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

  const uploadVideo = () => {
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
  const uploadImage = () => {
    setFilePending(true);
    setFileErrs(null);
    const formData = new FormData();
    formData.append("welcome-image", file.file, file.name);
    formData.append("restid", rest._id);

    updateRestWelcomeImage(formData, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccessFile(res);
      })
      .catch((err) => {
        handleErrorsFile(err);
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

  const replaceWImage = () => {
    console.log("is replacing with image", file);
    uploadImage();
  };
  const replaceWVideo = () => {
    console.log("is replacing with video", file);
    uploadVideo();
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

        <div className="covers-list-wrapper text-center mt-3">
          <span className="fs-14 text-secondary">replace background media</span>
          <div className="row text-center">
            <div className="col-12">{fileErrs ? fileErr : null}</div>
          </div>

          <div className="row mt-2 justify-content-center">
            <div className="col-6">
              <div className="row border-black br-4">
                <div
                  onClick={() => setMType(0)}
                  className="col-4 py-2 text-center d-ani-fast"
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
                      strokeWidth={2}
                      stroke="currentColor"
                      style={{ width: "20px" }}
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
                  onClick={() => setMType(2)}
                  className="col-4 py-2 text-center d-ani-fast"
                  style={{
                    opacity: "0.65",
                    backgroundColor: mediaType === 2 ? "black" : "#f6f4f2",
                    color: mediaType === 2 ? "white" : "black",
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      style={{ width: "20px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
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
                  className="col-4 py-2 text-center d-ani-fast"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      style={{ width: "20px" }}
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
                  className="col-6 text-center border-dashed my-4"
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
                  className="col-6 text-center border-dashed my-4"
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
              {mediaType === 2 && !file && (
                <div
                  className="col-8 my-4"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ColorPicker
                    width={200}
                    height={228}
                    color={color}
                    onChange={setColor}
                    hideHSV
                    hideHEX
                    hideRGB
                    dark
                  />
                </div>
              )}
              {mediaType === 1 && file && (
                <>
                  {realFile.type === "video/mp4" ? (
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
                      <button
                        disabled={isFilePending}
                        onClick={replaceWVideo}
                        className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
                      >
                        {isFilePending && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {!isFilePending && <span>replace with video</span>}
                      </button>
                    </div>
                  ) : (
                    <div
                      className="col-6 text-center border-dashed my-4"
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
                  {realFile.type === "image/jpeg" ||
                  realFile.type === "image/jpg" ? (
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
                      <button
                        disabled={isFilePending}
                        onClick={replaceWImage}
                        className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
                      >
                        {isFilePending && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {!isFilePending && <span>replace with image</span>}
                      </button>
                    </div>
                  ) : (
                    <div
                      className="col-6 text-center border-dashed my-4"
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

          {false && (
            <ul className="covers-list ps-0">
              {!file && (
                <li>
                  <label
                    onClick={() => {
                      selectFile({ accept: "video/*" }, ({ file }) => {
                        forceUpdate(file);
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
                    <label className="cover-item" style={{}}>
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
                    selectFile({ accept: "video/*" }, ({ file }) => {
                      forceUpdate(file);
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
          )}
        </div>
      </div>
    </div>
  );
}
export default EditRestProOne;
