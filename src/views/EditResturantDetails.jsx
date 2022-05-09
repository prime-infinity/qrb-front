import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRestSummary, setRestImages } from "../redux/slices/restSlice";
import LoadingScreen from "../ui/LoadingScreen";
import NetworkErr from "../ui/NetworkErr";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import ImageUploading from "react-images-uploading";
import { submitRestSumm, uploadRestDetailImages } from "../helpers/web";
import PureOverlay from "../ui/PureOverlay";
import RedirModal from "../ui/RedirModal";

function EditResturantDetails() {
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  let navigate = useNavigate();
  const [summary, setSummary] = useState(rest?.summary ? rest.summary : "");
  const [isEditingSum, setIsEdSum] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);
  // eslint-disable-next-line
  const [imageUpPending, setImageUpPending] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const [redrng, setRedrng] = useState(false);
  const [ani, setAni] = useState(false);

  const [images, setImages] = React.useState([]);
  // eslint-disable-next-line
  const maxNumber = 6;

  // eslint-disable-next-line
  const uploadImages = () => {
    setImageUpPending(true);
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
        alert("updated");
      })
      .catch((err) => {
        setImageUpPending(false);
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  // eslint-disable-next-line
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList/*, addUpdateIndex*/);
    setImages(imageList);
  };

  // eslint-disable-next-line
  const errorDiv = <small className="text-danger">{error}</small>;
  // eslint-disable-next-line
  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    setPending(false);
    dispatch(setRestSummary(summary));
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
  const redirect = (x) => {
    setRedrng(true);
    setAni(true);
    //console.log(x);
  };

  const closeOverlay = () => {
    setRedrng(false);
  };

  return rest === null ? (
    <LoadingScreen />
  ) : rest === "Network Error" ? (
    <NetworkErr />
  ) : (
    <>
      {redrng && (
        <>
          <RedirModal close={closeOverlay} />
        </>
      )}
      <div
        className="container-fluid pt-5 big-bg-theme"
        style={{ minHeight: "100vh" }}
      >
        {ani && (
          <PureOverlay
            redrng={redrng}
            closeOverlay={closeOverlay}
            width={`100%`}
          />
        )}
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

                  <span className="fs-12">
                    {"mon - fri  |  9:00 am - 6:00 pm"}
                  </span>
                </span>
              </li>
            </ul>
            <hr />

            {/** the little icons */}
            <div className="row py-2">
              <div className="col-1">
                <svg
                  onClick={() => redirect(1)}
                  className="svg-icon-lg me-2"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.86309 0.555C6.84059 0.51 7.15225 0.5 9.64225 0.5C12.1323 0.5 12.4439 0.510833 13.4206 0.555C14.3973 0.599167 15.0639 0.755 15.6473 0.980833C16.2581 1.21167 16.8123 1.5725 17.2706 2.03917C17.7373 2.49667 18.0973 3.05 18.3273 3.66167C18.5539 4.245 18.7089 4.91167 18.7539 5.88667C18.7989 6.86583 18.8089 7.1775 18.8089 9.66667C18.8089 12.1567 18.7981 12.4683 18.7539 13.4458C18.7098 14.4208 18.5539 15.0875 18.3273 15.6708C18.0972 16.2826 17.7367 16.8368 17.2706 17.295C16.8123 17.7617 16.2581 18.1217 15.6473 18.3517C15.0639 18.5783 14.3973 18.7333 13.4223 18.7783C12.4439 18.8233 12.1323 18.8333 9.64225 18.8333C7.15225 18.8333 6.84059 18.8225 5.86309 18.7783C4.88809 18.7342 4.22142 18.5783 3.63809 18.3517C3.02635 18.1216 2.4721 17.761 2.01392 17.295C1.54757 16.8372 1.18668 16.2832 0.956419 15.6717C0.730586 15.0883 0.575586 14.4217 0.530586 13.4467C0.485586 12.4675 0.475586 12.1558 0.475586 9.66667C0.475586 7.17667 0.486419 6.865 0.530586 5.88833C0.574753 4.91167 0.730586 4.245 0.956419 3.66167C1.18702 3.05007 1.54818 2.49609 2.01475 2.03833C2.47229 1.57208 3.02598 1.2112 3.63725 0.980833C4.22059 0.755 4.88725 0.6 5.86225 0.555H5.86309ZM13.3464 2.205C12.3798 2.16083 12.0898 2.15167 9.64225 2.15167C7.19475 2.15167 6.90475 2.16083 5.93809 2.205C5.04392 2.24583 4.55892 2.395 4.23559 2.52083C3.80809 2.6875 3.50225 2.885 3.18142 3.20583C2.87729 3.50171 2.64324 3.8619 2.49642 4.26C2.37059 4.58333 2.22142 5.06833 2.18059 5.9625C2.13642 6.92917 2.12725 7.21917 2.12725 9.66667C2.12725 12.1142 2.13642 12.4042 2.18059 13.3708C2.22142 14.265 2.37059 14.75 2.49642 15.0733C2.64309 15.4708 2.87725 15.8317 3.18142 16.1275C3.47725 16.4317 3.83809 16.6658 4.23559 16.8125C4.55892 16.9383 5.04392 17.0875 5.93809 17.1283C6.90475 17.1725 7.19392 17.1817 9.64225 17.1817C12.0906 17.1817 12.3798 17.1725 13.3464 17.1283C14.2406 17.0875 14.7256 16.9383 15.0489 16.8125C15.4764 16.6458 15.7823 16.4483 16.1031 16.1275C16.4073 15.8317 16.6414 15.4708 16.7881 15.0733C16.9139 14.75 17.0631 14.265 17.1039 13.3708C17.1481 12.4042 17.1573 12.1142 17.1573 9.66667C17.1573 7.21917 17.1481 6.92917 17.1039 5.9625C17.0631 5.06833 16.9139 4.58333 16.7881 4.26C16.6214 3.8325 16.4239 3.52667 16.1031 3.20583C15.8072 2.90173 15.447 2.66768 15.0489 2.52083C14.7256 2.395 14.2406 2.24583 13.3464 2.205ZM8.47142 12.4925C9.1253 12.7647 9.8534 12.8014 10.5314 12.5964C11.2093 12.3914 11.7951 11.9574 12.1886 11.3685C12.5821 10.7796 12.759 10.0724 12.689 9.36759C12.6189 8.66278 12.3064 8.00414 11.8048 7.50417C11.4849 7.18456 11.0983 6.93984 10.6725 6.78762C10.2468 6.6354 9.79261 6.57947 9.34266 6.62385C8.89272 6.66823 8.45821 6.81181 8.07042 7.04427C7.68263 7.27674 7.35121 7.59229 7.1 7.96821C6.8488 8.34413 6.68408 8.77107 6.61768 9.2183C6.55129 9.66553 6.58488 10.1219 6.71603 10.5546C6.84719 10.9873 7.07265 11.3855 7.37619 11.7206C7.67972 12.0557 8.05377 12.3193 8.47142 12.4925ZM6.31059 6.335C6.74811 5.89748 7.26752 5.55042 7.83917 5.31363C8.41082 5.07685 9.0235 4.95498 9.64225 4.95498C10.261 4.95498 10.8737 5.07685 11.4453 5.31363C12.017 5.55042 12.5364 5.89748 12.9739 6.335C13.4114 6.77252 13.7585 7.29193 13.9953 7.86358C14.2321 8.43523 14.3539 9.04792 14.3539 9.66667C14.3539 10.2854 14.2321 10.8981 13.9953 11.4698C13.7585 12.0414 13.4114 12.5608 12.9739 12.9983C12.0903 13.8819 10.8919 14.3784 9.64225 14.3784C8.39263 14.3784 7.1942 13.8819 6.31059 12.9983C5.42697 12.1147 4.93056 10.9163 4.93056 9.66667C4.93056 8.41705 5.42697 7.21861 6.31059 6.335ZM15.3989 5.65667C15.5073 5.55439 15.5941 5.4314 15.6542 5.29498C15.7142 5.15856 15.7463 5.01147 15.7484 4.86244C15.7506 4.71341 15.7229 4.56546 15.6668 4.42734C15.6108 4.28923 15.5276 4.16376 15.4222 4.05837C15.3168 3.95297 15.1914 3.8698 15.0532 3.81376C14.9151 3.75773 14.7672 3.72998 14.6181 3.73215C14.4691 3.73432 14.322 3.76638 14.1856 3.82641C14.0492 3.88645 13.9262 3.97325 13.8239 4.08167C13.625 4.29252 13.5161 4.5726 13.5203 4.86244C13.5246 5.15228 13.6416 5.42907 13.8465 5.63404C14.0515 5.839 14.3283 5.95602 14.6181 5.96025C14.908 5.96447 15.1881 5.85557 15.3989 5.65667Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="col-1 px-4">
                <svg
                  onClick={() => redirect(2)}
                  className="svg-icon-lg me-2"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 0.75C1.4295 0.75 0.75 1.4295 0.75 2.25V15.75C0.75 16.5705 1.4295 17.25 2.25 17.25H15.75C16.5705 17.25 17.25 16.5705 17.25 15.75V2.25C17.25 1.4295 16.5705 0.75 15.75 0.75H2.25ZM2.25 2.25H15.75V15.75H11.859V10.6875H13.8045L14.0858 8.4375H11.8597V6.984C11.8597 6.3285 12.0203 5.883 12.9608 5.883H14.1795V3.84375C13.9718 3.8175 13.251 3.77325 12.4222 3.77325C10.6935 3.77325 9.516 4.8135 9.516 6.75V8.4375H7.54725V10.6875H9.51525V15.75H2.25V2.25Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="col-1 px-4">
                <svg
                  onClick={() => redirect(3)}
                  className="svg-icon-lg me-2"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5 8.06601C21.5 8.11758 21.5 8.17617 21.4977 8.24414C21.4953 8.43398 21.4906 8.64726 21.4859 8.87461C21.4672 9.52851 21.4344 10.1801 21.3828 10.7941C21.3125 11.6402 21.2094 12.3457 21.0687 12.8754C20.9204 13.4282 20.6295 13.9323 20.2252 14.3374C19.8209 14.7426 19.3173 15.0345 18.7648 15.184C18.1016 15.3621 16.8031 15.4723 14.975 15.5402C14.1055 15.573 13.175 15.5941 12.2445 15.6059C11.9187 15.6105 11.6164 15.6129 11.3445 15.6152H10.6555C10.3836 15.6129 10.0813 15.6105 9.75547 15.6059C8.825 15.5941 7.89453 15.573 7.025 15.5402C5.19687 15.4699 3.89609 15.3598 3.23516 15.184C2.6825 15.0348 2.17876 14.743 1.7744 14.3379C1.37004 13.9327 1.07928 13.4283 0.93125 12.8754C0.788281 12.3457 0.6875 11.6402 0.617188 10.7941C0.565625 10.1801 0.532812 9.52851 0.514062 8.87461C0.507031 8.64726 0.504687 8.43398 0.502344 8.24414C0.502344 8.17617 0.5 8.11758 0.5 8.06601V7.93476C0.5 7.8832 0.5 7.82461 0.502344 7.75664C0.504687 7.5668 0.509375 7.35351 0.514062 7.12617C0.532812 6.47226 0.565625 5.8207 0.617188 5.20664C0.6875 4.36055 0.790625 3.65508 0.93125 3.12539C1.23125 2.00273 2.1125 1.11679 3.23516 0.816794C3.89609 0.638669 5.19687 0.528514 7.025 0.460545C7.89453 0.427732 8.825 0.406637 9.75547 0.394918C10.0813 0.390231 10.3836 0.387887 10.6555 0.385543H11.3445C11.6164 0.387887 11.9187 0.390231 12.2445 0.394918C13.175 0.406637 14.1055 0.427732 14.975 0.460545C16.8031 0.530857 18.1039 0.641013 18.7648 0.816794C19.8875 1.11679 20.7687 2.00039 21.0687 3.12539C21.2117 3.65508 21.3125 4.36055 21.3828 5.20664C21.4344 5.8207 21.4672 6.47226 21.4859 7.12617C21.493 7.35351 21.4953 7.5668 21.4977 7.75664C21.4977 7.82461 21.5 7.8832 21.5 7.93476V8.06601ZM19.8125 7.94414C19.8125 7.89492 19.8125 7.84101 19.8102 7.77773C19.8078 7.59492 19.8031 7.39336 19.7984 7.17539C19.782 6.55195 19.7492 5.92851 19.7 5.34961C19.6367 4.59492 19.5477 3.97617 19.4375 3.56133C19.2922 3.01992 18.8656 2.59101 18.3266 2.44804C17.8344 2.31679 16.5945 2.21133 14.9094 2.14805C14.0562 2.11523 13.1375 2.09414 12.2211 2.08242C11.9 2.07773 11.6023 2.07539 11.3352 2.07539H10.6648L9.77891 2.08242C8.8625 2.09414 7.94609 2.11523 7.09063 2.14805C5.40547 2.21367 4.16328 2.31679 3.67344 2.44804C3.13437 2.59336 2.70781 3.01992 2.5625 3.56133C2.45234 3.97617 2.36328 4.59492 2.3 5.34961C2.25078 5.92851 2.22031 6.55195 2.20156 7.17539C2.19453 7.39336 2.19219 7.59726 2.18984 7.77773C2.18984 7.84101 2.1875 7.89726 2.1875 7.94414V8.05664C2.1875 8.10586 2.1875 8.15976 2.18984 8.22305C2.19219 8.40586 2.19688 8.60742 2.20156 8.82539C2.21797 9.44883 2.25078 10.0723 2.3 10.6512C2.36328 11.4059 2.45234 12.0246 2.5625 12.4395C2.70781 12.9809 3.13437 13.4098 3.67344 13.5527C4.16562 13.684 5.40547 13.7895 7.09063 13.8527C7.94375 13.8855 8.8625 13.9066 9.77891 13.9184C10.1 13.923 10.3977 13.9254 10.6648 13.9254H11.3352L12.2211 13.9184C13.1375 13.9066 14.0539 13.8855 14.9094 13.8527C16.5945 13.7871 17.8367 13.684 18.3266 13.5527C18.8656 13.4074 19.2922 12.9809 19.4375 12.4395C19.5477 12.0246 19.6367 11.4059 19.7 10.6512C19.7492 10.0723 19.7797 9.44883 19.7984 8.82539C19.8055 8.60742 19.8078 8.40351 19.8102 8.22305C19.8102 8.15976 19.8125 8.10351 19.8125 8.05664V7.94414ZM8.91406 4.85976L14.3516 8.02383L8.91406 11.141V4.85976Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="col-3">
                <svg
                  onClick={() => redirect(4)}
                  className="svg-icon-lg me-2"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5914 16.1882C15.4739 16.9957 13.827 19.092 13.0689 19.3945C12.8083 19.4951 12.5608 19.4726 12.3595 19.3195C12.2326 19.2189 12.0989 19.0132 10.322 16.1295L9.79452 15.2701C9.58952 14.9607 9.62827 14.5539 9.88264 14.2445C10.1301 13.9451 10.4914 13.8345 10.807 13.9545C10.8233 13.9645 12.1383 14.3939 12.1383 14.3939C15.1264 15.377 15.2245 15.4157 15.3514 15.5101C15.5401 15.6664 15.6283 15.907 15.5889 16.187L15.5914 16.1882ZM9.60202 11.8001C9.38702 11.4776 9.39389 11.097 9.61202 10.8364L10.442 9.70323C12.2651 7.21636 12.3689 7.08574 12.4926 6.99824C12.7045 6.85511 12.9676 6.84824 13.2183 6.97199C13.9408 7.32386 15.4026 9.49448 15.4901 10.3282V10.3576C15.5164 10.6407 15.402 10.872 15.2039 11.012C15.067 11.1001 14.9401 11.1489 11.542 11.9757C11.0051 12.1126 10.7051 12.1876 10.5295 12.2495L10.552 12.2232C10.217 12.3239 9.84264 12.1614 9.62764 11.8264L9.60202 11.8001ZM7.51202 10.5114C7.35264 10.5601 6.85764 10.7132 6.24889 9.73011C6.24889 9.73011 2.13764 3.26199 2.04327 3.06324C1.98452 2.83886 2.05327 2.58449 2.25514 2.37949C2.86702 1.74449 6.18389 0.816987 7.05327 1.02886C7.33639 1.10386 7.53202 1.27949 7.60014 1.53324C7.65202 1.81324 8.05577 7.81261 8.11452 9.15699C8.17014 10.3064 7.67514 10.4626 7.51202 10.5114ZM8.05577 17.087C8.04577 20.2314 8.03952 20.3389 7.98764 20.4889C7.90327 20.7201 7.70139 20.8795 7.42139 20.9282C6.62077 21.0651 4.11764 20.1407 3.59327 19.522C3.49264 19.3851 3.43077 19.2482 3.41764 19.1089C3.40407 19.0116 3.4177 18.9126 3.45702 18.8226C3.51889 18.6601 3.60702 18.5326 5.85639 15.8964L6.51702 15.112C6.74514 14.822 7.14202 14.7345 7.51639 14.8839C7.88077 15.0207 8.10577 15.3332 8.07952 15.6714V17.0714L8.05577 17.087ZM1.23577 15.0751C0.991391 15.0689 0.770141 14.9189 0.640141 14.6745C0.548891 14.4957 0.483891 14.2026 0.441391 13.8414C0.327641 12.7576 0.467641 11.1201 0.793266 10.6026C0.943266 10.3651 1.16764 10.2382 1.41202 10.2476C1.57452 10.2476 1.72139 10.2964 4.93764 11.6214L5.87827 11.9957C6.21702 12.1226 6.42514 12.4707 6.40577 12.8714C6.37952 13.2589 6.15514 13.5582 5.82639 13.6464L4.48827 14.0726C1.49702 15.0364 1.39577 15.0589 1.23952 15.0457L1.23577 15.0751ZM13.7164 20.9964H13.7133L13.7101 20.9995L13.7164 20.9964Z"
                    fill="#252525"
                  />
                </svg>
              </div>
            </div>
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

            <div
              className="row g-0 mt-4"
              style={{ position: "absolute", width: "100%", left: "0" }}
            >
              <div className="col-6">
                <label
                  className="cover-item"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img src="/ang/round-add.svg" alt="" />
                </label>
              </div>
              <div className="col-6">
                <img
                  src="/ang/profile-cover.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-6">
                <img
                  src="/ang/profile-cover.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditResturantDetails;
