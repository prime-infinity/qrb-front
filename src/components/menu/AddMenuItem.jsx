import { useDispatch, useSelector } from "react-redux";
import { setAdding } from "../../redux/slices/menuSlice";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { addMenuItem } from "../../helpers/web";
import { setRest } from "../../redux/slices/restSlice";

function AddMenuItem({ details }) {
  const dispatch = useDispatch();
  const hasInitAdding = useSelector((state) => state.menu.hasInitAdding);
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const [uploadErr, setErr] = useState(null);
  const [isUpldni, setUpldin] = useState(null);
  const [editnMen, setEditM] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    isSet: false,
    status: 0,
  });
  const isHere = () => {
    return hasInitAdding === details._id ? true : false;
  };
  const isEditn = () => {
    return isHere() && editnMen.id === details._id ? true : false;
  };
  const startProc = () => {
    //console.log("pro");
    dispatch(setAdding(details._id));
    if (isHere()) {
      setUpldin(details._id);
      setErr(null);
      const imageAsArray = images.map((img) => img.file);
      const formData2 = new FormData();
      for (let i = 0; i < imageAsArray.length; i++) {
        formData2.append("menu-images", imageAsArray[i], imageAsArray[i].name);
      }

      formData2.append("restid", rest._id);
      formData2.append("name", editnMen.name);
      formData2.append("status", editnMen.status);
      formData2.append("price", editnMen.price);
      formData2.append("description", editnMen.description);
      formData2.append("mainId", details._id);

      addMenuItem(formData2, authState.token)
        .then((res) => {
          dispatch(setRest(res));
          setUpldin(null);
          canclProc();
        })
        .catch((err) => {
          setUpldin(null);
          err.response?.data ? setErr(err.response.data) : setErr(err.message);
        });
    }
  };

  const canclProc = () => {
    //console.log("canl");
    setErr(null);
    dispatch(setAdding(""));
    setEditM({
      id: null,
      name: "",
      description: "",
      price: "",
      isSet: false,
      status: 0,
    });
    setImages([]);
  };

  const strEdit = () => {
    setEditM({ ...editnMen, id: details._id });
  };

  const setName = (e) => {
    setEditM({ ...editnMen, name: e.target.value.toLowerCase() });
  };
  const setPrice = (e) => {
    setEditM({ ...editnMen, price: e.target.value });
  };
  const setDesc = (e) => {
    setEditM({ ...editnMen, description: e.target.value.toLowerCase() });
  };

  const maxNumber = 6;
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const toggleStatus = () => {
    setEditM({ ...editnMen, status: editnMen.status + 1 });
    if (editnMen.status >= 2) {
      setEditM({ ...editnMen, status: 0 });
    }
  };
  return (
    <div
      className={`px-0 justify-content-center ${
        details?.menu?.length > 0 ? "mt-4" : ""
      }`}
    >
      {/** in here */}
      <div
        style={{ opacity: isHere() ? "1" : "0" }}
        className={`d-ani menu-border ${isHere() ? "mb-08" : "mb-n-08"}`}
      >
        {/** in below */}
        <div
          style={{ height: isHere() ? "124px" : "0px" }}
          className="d-ani border-left-right border-bottom-drk"
        >
          {/** in below */}
          <div
            style={{
              opacity: isHere() ? "1" : "0",
              position: "relative",
              zIndex: "1",
            }}
            className="m-cat d-ani ps-0 pe-0"
          >
            {/** in below */}
            <div className="m-cat-head">
              {/** this very below */}
              {isHere() && (
                <div className=" cat-right ">
                  <>
                    <div
                      style={{ justifyContent: "space-between" }}
                      className="cat-head d-flex"
                    >
                      {isEditn() ? (
                        <input
                          onChange={setName}
                          value={editnMen.name}
                          style={{ width: "65%" }}
                          type="text"
                          placeholder="name"
                          autoFocus
                          className="cat-name-input big-bg-theme fs-14 ps-2"
                        />
                      ) : (
                        <h4
                          onClick={strEdit}
                          className="text-secondary text-decoration-underline"
                          style={{ marginBottom: "5px" }}
                        >
                          {editnMen?.name?.length > 0 && editnMen?.isSet
                            ? editnMen.name
                            : "name"}
                        </h4>
                      )}
                      {isEditn() ? (
                        <input
                          onChange={setPrice}
                          value={editnMen.price}
                          style={{ width: "25%" }}
                          type="number"
                          placeholder="price($)"
                          className="cat-name-input big-bg-theme fs-14 ps-2"
                        />
                      ) : (
                        <span
                          onClick={strEdit}
                          className="price text-secondary text-decoration-underline"
                        >
                          {editnMen?.price?.length > 0 && editnMen?.isSet
                            ? "$" + editnMen.price
                            : "$price"}
                        </span>
                      )}
                    </div>
                    {isEditn() ? (
                      <textarea
                        onChange={setDesc}
                        value={editnMen.description}
                        style={{ marginTop: "3%" }}
                        type="text"
                        placeholder="description"
                        className="cat-name-input big-bg-theme fs-14 ps-2"
                      />
                    ) : (
                      <p
                        onClick={strEdit}
                        className="text-secondary text-decoration-underline"
                      >
                        {editnMen?.description?.length > 0 && editnMen?.isSet
                          ? editnMen.description
                          : "description"}
                      </p>
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
        {/** not below */}
        <div
          style={{
            height: isHere() ? "368px" : "0px",
            overflowX: "scroll",
            position: "relative",
          }}
          className=" flex-nowrap d-flex border-left-right border-bottom-drk"
        >
          {isHere() && (
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              acceptType={["jpg", "jpeg"]}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemove, errors }) => (
                <>
                  {errors && (
                    <div
                      className="text-danger to-center bg-white"
                      style={{ position: "absolute", zIndex: "3", top: "40%" }}
                    >
                      {errors.maxNumber && (
                        <span className="row text-center">
                          <div className="col-12">
                            Number of selected images exceed {maxNumber}
                          </div>
                        </span>
                      )}
                      {errors.acceptType && (
                        <span className="row text-center">
                          <div className="col-12">
                            Your selected file type is not allow
                          </div>
                        </span>
                      )}
                      {errors.maxFileSize && (
                        <span className="row text-center">
                          <div className="col-12">
                            Selected file size exceed maxFileSize
                          </div>
                        </span>
                      )}
                    </div>
                  )}
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="col-12  px-0"
                      style={{ position: "relative" }}
                    >
                      <img
                        style={{
                          width: "inherit",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={image["data_url"]}
                        alt=""
                        className="img-fluid"
                      />
                      <span
                        onClick={() => onImageRemove(index)}
                        className="border-black bg-white"
                        style={{
                          position: "absolute",
                          right: "2%",
                          top: "3%",
                          zIndex: "1",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          style={{ width: "30px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                  <div
                    onClick={onImageUpload}
                    className="col-12 px-0"
                    style={{ position: "relative" }}
                  >
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src="/icons/Shape.png"
                      alt=""
                      className="to-center"
                    />
                  </div>
                </>
              )}
            </ImageUploading>
          )}
        </div>
      </div>
      {/** err */}
      {isHere() && uploadErr && (
        <div className="col-11 px-0 text-center">
          <span className="text-danger">{uploadErr}</span>
        </div>
      )}
      {/**end err */}
      {/** bottom */}
      {/** is not uploading */}
      {isUpldni !== details._id && (
        <div
          className=" px-0"
          style={{ display: "flex", position: "relative", zIndex: "1" }}
        >
          <button
            style={{
              justifyContent: "center",
              width: isHere() ? "12%" : "100%",
              border: "2px solid black",
              padding: "12px",
            }}
            onClick={startProc}
            className="btn br-0 d-flex"
          >
            <span
              style={{
                display: "flex",
              }}
            >
              {!isHere() ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="svg-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="svg-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </span>
          </button>
          {isHere() && (
            <button
              onClick={toggleStatus}
              style={{
                width: "40%",
                justifyContent: "center",
                position: "relative",
                left: "18%",
              }}
              className="btn br-0 bg-dark text-white border-black"
            >
              <span className="fs-14">
                {editnMen.status === 0
                  ? "available"
                  : editnMen.status === 1
                  ? "sold out"
                  : editnMen.status === 2
                  ? "hidden"
                  : null}
              </span>
            </button>
          )}
          {isHere() && (
            <button
              style={{
                border: "2px solid black",
                position: "absolute",
                right: "0%",
                padding: "12px",
              }}
              onClick={canclProc}
              className="btn br-0 d-flex border-black"
            >
              <span
                style={{
                  display: "flex",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="svg-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      )}
      {/** is uploading */}
      {isUpldni === details._id && (
        <div className="px-0" style={{ display: "flex", position: "relative" }}>
          <button
            style={{ justifyContent: "center" }}
            className="btn w-100 br-0 py-2 d-flex border-black"
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      )}
    </div>
  );
}
export default AddMenuItem;
