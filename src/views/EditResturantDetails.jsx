import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRestSummary, setRestImages } from "../redux/slices/restSlice";
import LoadingScreen from "../ui/LoadingScreen";
import NetworkErr from "../ui/NetworkErr";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { submitRestSumm, uploadRestDetailImages } from "../helpers/web";
import Redirects from "../ui/Redirects";

function EditResturantDetails() {
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  let navigate = useNavigate();
  const [summary, setSummary] = useState(rest?.summary ? rest.summary : "");
  const [isEditingSum, setIsEdSum] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);
  const [imageUpPending, setImageUpPending] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const [hasSetImages, setHasSetImages] = useState(false);

  const [images, setImages] = React.useState([]);
  const maxNumber = 6;

  const uploadImages = () => {
    setImageUpPending(true);
    setHasSetImages(true);
    setImgErr(null);
    const imageAsArray = images.map((img) => img.file);

    const formData = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData.append("rest-images", imageAsArray[i], imageAsArray[i].name);
    }

    formData.append("restid", rest._id);

    uploadRestDetailImages(formData, authState.token)
      .then((res) => {
        //set details image to array
        console.log(res.images);
        dispatch(setRestImages(res.images));
        //console.log(imageAsArray)
        setImageUpPending(false);
        setHasSetImages(false);

        alert("updated");
      })
      .catch((err) => {
        setImageUpPending(false);
        setHasSetImages(false);
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList/*, addUpdateIndex*/);
    setHasSetImages(true);
    //console.log(imageList);
    setImages(imageList);
  };

  const errorDiv = <small className="text-danger">{error}</small>;

  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    setPending(false);
    dispatch(setRestSummary(summary));
    setIsEdSum(false);
    alert("updated");
  };

  useEffect(() => {
    if (rest === null) {
      navigate("/");
    }
  }, [rest, navigate]);

  const setSsummary = (e) => {
    setSummary(e);
    setIsEdSum(true);
  };

  const disabled = () => {
    if (summary === "") {
      return true;
    }
    return false;
  };

  const submitSum = () => {
    setPending(true);
    setErrors(null);
    let data = { summ: summary, restid: rest._id };
    submitRestSumm(data, authState.token)
      .then((res) => {
        console.log(res);
        handleSuccess(res);
      })
      .catch((err) => {
        console.log(err);
        handleErrors(err);
      });
  };

  return rest === null ? (
    <LoadingScreen />
  ) : rest === "Network Error" ? (
    <NetworkErr />
  ) : (
    <>
      <div
        className="container-fluid pt-5 big-bg-theme"
        style={{ minHeight: "110vh" }}
      >
        <div className="row pt-5">
          <div className="col-12 col-md-6 offset-md-3 px-4">
            <ul className="navbar-nav fs-14">
              <li className="pb-3">
                <span>
                  <svg
                    className="svg-icon me-2"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33333 9.66732C2.96514 9.66732 2.66667 9.9658 2.66667 10.334C2.66667 10.7022 2.96514 11.0007 3.33333 11.0007H4.66667C5.03486 11.0007 5.33333 10.7022 5.33333 10.334C5.33333 9.9658 5.03486 9.66732 4.66667 9.66732H3.33333ZM2 0.333984C0.895431 0.333984 0 1.22941 0 2.33398V11.6673C0 12.7719 0.89543 13.6673 2 13.6673H6C7.10457 13.6673 8 12.7719 8 11.6673V2.33398C8 1.22942 7.10457 0.333984 6 0.333984H2ZM1.33333 2.33398C1.33333 1.96579 1.63181 1.66732 2 1.66732H6C6.36819 1.66732 6.66667 1.96579 6.66667 2.33398V11.6673C6.66667 12.0355 6.36819 12.334 6 12.334H2C1.63181 12.334 1.33333 12.0355 1.33333 11.6673V2.33398Z"
                      fill="#212121"
                    />
                  </svg>

                  <span className="fs-12">{rest.phone ? rest.phone : ""}</span>
                </span>
              </li>
              <li className="pb-3">
                <span>
                  <svg
                    className="svg-icon me-2"
                    viewBox="0 0 13 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.00292969 3.03807V8C0.00292969 9.10457 0.89836 10 2.00293 10H10.0029C11.1075 10 12.0029 9.10457 12.0029 8V2C12.0029 0.895431 11.1075 0 10.0029 0H2.00293C0.89836 0 0.00292969 0.89543 0.00292969 2V3.03807C0.00292969 3.03804 0.00292969 3.03809 0.00292969 3.03807ZM2.00293 1H10.0029C10.5552 1 11.0029 1.44772 11.0029 2V2.73987L6.00303 5.43212L1.00293 2.73976V2C1.00293 1.44772 1.45064 1 2.00293 1ZM1.00293 3.87552L5.76598 6.44024C5.91396 6.51992 6.09209 6.51992 6.24008 6.44024L11.0029 3.87562V8C11.0029 8.55229 10.5552 9 10.0029 9H2.00293C1.45065 9 1.00293 8.55228 1.00293 8V3.87552Z"
                      fill="#212121"
                    />
                  </svg>

                  <span className="fs-12">{rest.email ? rest.email : ""}</span>
                </span>
              </li>
              <li className="pb-3">
                <span>
                  <svg
                    className="svg-icon me-2"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.00098 12C9.31468 12 12.001 9.31371 12.001 6C12.001 2.68629 9.31468 0 6.00098 0C2.68727 0 0.000976562 2.68629 0.000976562 6C0.000976562 9.31371 2.68727 12 6.00098 12ZM6.00098 1C6.37469 1 6.87641 1.35608 7.31356 2.31781C7.40828 2.52619 7.49546 2.75446 7.57363 3H4.42832C4.5065 2.75446 4.59368 2.52619 4.68839 2.31781C5.12554 1.35608 5.62726 1 6.00098 1ZM3.77803 1.90401C3.62712 2.23601 3.49526 2.6038 3.38509 3H2.00061C2.52438 2.30269 3.22623 1.74677 4.03863 1.39978C3.94384 1.56117 3.85694 1.7304 3.77803 1.90401ZM3.16396 4C3.05792 4.6275 3.00098 5.30146 3.00098 6C3.00098 6.69854 3.05792 7.3725 3.16396 8H1.41702C1.14942 7.38754 1.00098 6.7111 1.00098 6C1.00098 5.2889 1.14942 4.61246 1.41702 4H3.16396ZM3.38509 9C3.49526 9.3962 3.62712 9.76399 3.77803 10.096C3.85694 10.2696 3.94384 10.4388 4.03863 10.6002C3.22623 10.2532 2.52438 9.69731 2.00061 9H3.38509ZM4.42832 9H7.57363C7.49546 9.24554 7.40828 9.47381 7.31356 9.68219C6.87641 10.6439 6.37469 11 6.00098 11C5.62726 11 5.12554 10.6439 4.68839 9.68219C4.59368 9.47381 4.5065 9.24554 4.42832 9ZM7.82232 8H4.17964C4.06536 7.3892 4.00098 6.71396 4.00098 6C4.00098 5.28604 4.06536 4.6108 4.17964 4H7.82232C7.9366 4.6108 8.00098 5.28604 8.00098 6C8.00098 6.71396 7.9366 7.3892 7.82232 8ZM8.61686 9H10.0013C9.47757 9.69731 8.77573 10.2532 7.96332 10.6002C8.05811 10.4388 8.14501 10.2696 8.22393 10.096C8.37483 9.76399 8.50669 9.3962 8.61686 9ZM10.5849 8H8.83799C8.94404 7.3725 9.00098 6.69854 9.00098 6C9.00098 5.30146 8.94404 4.6275 8.83799 4H10.5849C10.8525 4.61246 11.001 5.2889 11.001 6C11.001 6.7111 10.8525 7.38754 10.5849 8ZM7.96332 1.39978C8.77572 1.74677 9.47757 2.30269 10.0013 3H8.61686C8.50669 2.6038 8.37483 2.23601 8.22393 1.90401C8.14501 1.7304 8.05811 1.56117 7.96332 1.39978Z"
                      fill="#212121"
                    />
                  </svg>

                  <span className="fs-12">
                    {rest.website ? rest.website : ""}
                  </span>
                </span>
              </li>
              <li className="pb-3">
                <span>
                  <svg
                    className="svg-icon me-2"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.00195 0C9.31566 0 12.002 2.68629 12.002 6C12.002 8.4835 10.1089 11.0865 6.40195 13.8667C6.16492 14.0444 5.83899 14.0444 5.60195 13.8667C1.89503 11.0865 0.00195312 8.4835 0.00195312 6C0.00195312 2.68629 2.68824 0 6.00195 0ZM6.00195 1.33333C3.42462 1.33333 1.33529 3.42267 1.33529 6C1.33529 7.80724 2.74736 9.89049 5.6335 12.2046L6.00195 12.495L6.3704 12.2046C9.25655 9.89049 10.6686 7.80724 10.6686 6C10.6686 3.42267 8.57928 1.33333 6.00195 1.33333ZM6.00195 4.66667C6.73833 4.66667 7.33529 5.26362 7.33529 6C7.33529 6.73638 6.73833 7.33333 6.00195 7.33333C5.26557 7.33333 4.66862 6.73638 4.66862 6C4.66862 5.26362 5.26557 4.66667 6.00195 4.66667Z"
                      fill="#212121"
                    />
                  </svg>

                  <span className="fs-12">
                    {rest.address ? rest.address : ""}
                  </span>
                </span>
              </li>
              <li className="pb-3">
                <span>
                  <svg
                    className="svg-icon me-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#252525"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#252525"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="fs-12">{rest.hours ? rest.hours : ""}</span>
                </span>
              </li>
            </ul>
            <hr />

            {/** the little icons */}
            <Redirects />
            {/** little icons end */}

            <hr />

            <div className="px-2">
              <textarea
                style={{ border: "0" }}
                value={summary}
                onChange={(e) => setSsummary(e.target.value)}
                className="my-4 fs-14 py-5 form-control text-center big-bg-theme"
                type="text"
                placeholder={`${
                  rest?.summary
                    ? rest?.summary
                    : "enter short summary for your business"
                }`}
              />
            </div>

            <div className="row text-center">
              <div className="col-12">{error ? errorDiv : null}</div>
            </div>

            {isEditingSum && (
              <button
                onClick={submitSum}
                disabled={pending || disabled()}
                className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
              >
                {pending && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {!pending && <span>update summary</span>}
              </button>
            )}

            {false && (
              <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                multiple
                acceptType={["jpg", "jpeg"]}
              >
                {({ imageList, onImageUpload, errors }) => (
                  <div
                    className="row g-0 mt-4"
                    style={{ position: "absolute", width: "100%", left: "0" }}
                  >
                    <div className="col-12 text-center">
                      <h4>upload new images</h4>
                      {imaUpLdErr ? imgErrorDiv : null}

                      {errors && (
                        <>
                          {errors.maxNumber && (
                            <span className="text-danger">
                              Number of selected images exceed {maxNumber}
                            </span>
                          )}
                          {errors.acceptType && (
                            <span className="text-danger">
                              Your selected file type is not allow
                            </span>
                          )}
                          {errors.maxFileSize && (
                            <span className="text-danger">
                              Selected file size exceed maxFileSize
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {!hasSetImages && (
                      <div className="col-6">
                        <label
                          onClick={onImageUpload}
                          className="cover-item"
                          style={{ width: "100%", height: "200px" }}
                        >
                          <img src="/ang/round-add.svg" alt="" />
                        </label>
                      </div>
                    )}

                    {hasSetImages && (
                      <>
                        <div
                          className="col-6 text-center"
                          style={{ backgroundColor: "#dadada" }}
                        >
                          {!imageUpPending && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ width: "50px", height: "200px" }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              onClick={uploadImages}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          )}
                          {imageUpPending && (
                            <div
                              style={{
                                width: "50px",
                                height: "200px",
                                position: "relative",
                              }}
                            >
                              <div
                                className="spinner-border"
                                style={{
                                  position: "absolute",
                                  top: "45%",
                                  left: "160%",
                                }}
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {imageList.map((image, index) => (
                      <div className="col-6" key={index}>
                        <img
                          alt="..."
                          className="img-fluid"
                          src={image["data_url"]}
                          style={{ height: "200px", width: "100%" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditResturantDetails;
