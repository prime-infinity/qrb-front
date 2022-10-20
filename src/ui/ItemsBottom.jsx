import CustomToggle from "../helpers/CustomToggle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from "react-bootstrap/Accordion";
import useDynamicRefs from "use-dynamic-refs";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { setRestToEdit } from "../redux/slices/restSlice";
import { editMenuItem } from "../helpers/web";
import { setRest } from "../redux/slices/restSlice";

function ItemsBottom({ item, place, length, parents }) {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [getRef, setRef] = useDynamicRefs();
  const itemToEdit = useSelector((state) => state.rest.restToEdit);
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const maxNumber = 6;
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    //console.log(imageList);
    setImages(imageList);
  };

  useEffect(() => {
    setImages(itemToEdit?.item.files);
  }, [itemToEdit?.item.files]);

  const [formData, setForm] = useState({
    status: "",
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    setForm({
      name: itemToEdit?.item.name || "",
      price: itemToEdit?.item.price || "",
      status: parseInt(itemToEdit?.item.status) || 0,
      description: itemToEdit?.item.description || "",
    });
  }, [itemToEdit?.item]);
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  //console.log(itemToEdit);
  const isHere = () => {
    return itemToEdit?.item._id === item._id ? true : false;
  };
  const [isPending, setPendin] = useState(false);
  const [error, setErr] = useState(null);
  const doneEdit = () => {
    setPendin(true);
    setErr(null);

    const imageAsArray = images.map((img) => {
      //return img.file ? img.file : handleUrl(img);
      if (img.file) {
        return img.file;
      } else {
        //console.log(img);
        return img;
      }
    });

    const formData2 = new FormData();
    for (let i = 0; i < imageAsArray.length; i++) {
      if (imageAsArray[i].name) {
        formData2.append("menu-images", imageAsArray[i], imageAsArray[i].name);
      } else {
        formData2.append("imagesurl", imageAsArray[i]);
      }
    }

    formData2.append("restid", rest._id);
    formData2.append("itemid", itemToEdit.item._id);
    formData2.append("name", formData.name);
    formData2.append("status", formData.status);
    formData2.append("price", formData.price);
    formData2.append("description", formData.description);
    formData2.append("mainId", itemToEdit.main);

    editMenuItem(formData2, authState.token)
      .then((res) => {
        setPendin(false);
        dispatch(setRest(res));
        abortEdit();
      })
      .catch((err) => {
        setPendin(false);
        err.response?.data ? setErr(err.response.data) : setErr(err.message);
      });
  };
  const abortEdit = () => {
    setErr(null);
    dispatch(setRestToEdit(null));
  };
  const setName = (e) => {
    setForm({ ...formData, name: e.target.value });
  };
  const setPrice = (e) => {
    setForm({ ...formData, price: e.target.value });
  };
  const setDesc = (e) => {
    setForm({ ...formData, description: e.target.value });
  };
  const toggleStatus = () => {
    setForm({ ...formData, status: formData.status + 1 });
    if (formData.status >= 2) {
      setForm({ ...formData, status: 0 });
    }
  };
  return (
    <div ref={setRef(item._id)} className="row px-0 justify-content-center">
      <div className={`col-11 menu-border ${place !== length - 1 && "mb-08"}`}>
        {itemToEdit?.item._id !== item._id && (
          <CustomToggle eventKey={item.name} item={item} parents={parents} />
        )}

        {isHere() && (
          <div
            style={{ height: isHere() ? "124px" : "0px" }}
            className="row  d-ani border-left-right border-bottom-drk"
          >
            <div
              style={{
                opacity: isHere() ? "1" : "0",
                position: "relative",
              }}
              className="m-cat d-ani ps-0 pe-0"
            >
              <div className="m-cat-head">
                <div className=" cat-right ">
                  <div
                    style={{ justifyContent: "space-between" }}
                    className="cat-head d-flex"
                  >
                    <input
                      onChange={setName}
                      value={formData.name}
                      type="text"
                      placeholder="name"
                      autoFocus
                      className="cat-name-input big-bg-theme fs-14 ps-2"
                    />
                    <input
                      onChange={setPrice}
                      value={formData.price}
                      style={{ width: "25%" }}
                      type="number"
                      placeholder="price($)"
                      className="cat-name-input big-bg-theme fs-14 ps-2"
                    />
                  </div>

                  <input
                    onChange={setDesc}
                    value={formData.description}
                    style={{ marginTop: "3%" }}
                    type="text"
                    placeholder="description"
                    className="cat-name-input big-bg-theme fs-14 ps-2"
                  />
                </div>
              </div>

              <div className="row">
                <div
                  className="col-12 text-end"
                  style={{
                    position: "absolute",
                    bottom: "6%",
                    right: "0%",
                    display: isPending && "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <button
                      onClick={toggleStatus}
                      style={{ float: "left", height: "29px" }}
                      className="btn bg-dark text-white py-0"
                    >
                      <span className="fs-14">
                        {formData.status === 0
                          ? "available"
                          : formData.status === 1
                          ? "sold out"
                          : formData.status === 2
                          ? "hidden"
                          : null}
                      </span>
                    </button>
                    {error && (
                      <span className="text-danger fs-12">{error}</span>
                    )}
                    {isPending && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}

                    {!isPending && (
                      <>
                        <span
                          onClick={doneEdit}
                          style={{
                            marginRight: "20px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            style={{ width: "20px" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                        <span onClick={abortEdit}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            style={{ width: "20px" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>{" "}
                      </>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        )}

        {itemToEdit?.item._id !== item._id && (
          <div className={`row border-left-right border-bottom-drk`}>
            <div className="col-12 p-0 ">
              <Accordion.Collapse eventKey={item.name}>
                <Slider {...settings}>
                  {item &&
                    item.files.map((file, index) => (
                      <div className="neg-mar" key={index}>
                        <div className="sl-img">
                          <img src={file} style={{ width: "100%" }} alt="" />
                        </div>
                      </div>
                    ))}
                </Slider>
              </Accordion.Collapse>
            </div>
          </div>
        )}
        {itemToEdit?.item._id === item._id && (
          <div
            style={{
              height: isHere() ? "368px" : "0px",
              overflowX: "scroll",
              position: "relative",
            }}
            className="row flex-nowrap d-flex border-left-right border-bottom-drk"
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
                        style={{
                          position: "absolute",
                          zIndex: "3",
                          top: "40%",
                        }}
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
                        className="col-12 px-0"
                        style={{ position: "relative" }}
                      >
                        <img
                          style={{
                            width: "inherit",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={image.data_url ? image.data_url : image}
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
                      className="col-12 border-black px-0"
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
        )}
      </div>
    </div>
  );
}

export default ItemsBottom;
