import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import ImageUploading from "react-images-uploading";
import { useSelector, useDispatch } from "react-redux";
import { addMenuItem } from "../helpers/web";
import {
  toggleAddingCat,
  toggleLangModal,
  toggleOverlay,
  toggleUploading,
} from "../redux/slices/menuSlice";
import { setRest } from "../redux/slices/restSlice";
import { useLocation, useNavigate } from "react-router-dom";
import AddCartModal from "../ui/AddCartModal";
import PureOverlay from "../ui/PureOverlay";
import LangSel from "../ui/LangSel";

function AddMenuItem() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const rest = useSelector((state) => state.rest.rest);
  const needToUpload = useSelector((state) => state.menu.uploadingMenu);
  const isAddingCat = useSelector((state) => state.menu.isAddingCat);
  const overlay = useSelector((state) => state.menu.overlay);
  const isLangModal = useSelector((state) => state.menu.isLangModal);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOptions, setSubOptions] = useState(null);
  const [imageUpPending, setImageUpPending] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const authState = useSelector((state) => state.auth.auth);
  const [redrng, setRedrng] = useState(false);

  const menuMainOptions = rest.categories.map((cat, index) => ({
    value: cat._id,
    label: cat.name,
    data: cat.sub.map((subs, index) => ({ value: subs._id, label: subs.name })),
  }));

  const [formData, setForm] = useState({
    status: 0,
    name: "",
    price: "",
    description: "",
    cat: {},
  });

  const [images, setImages] = React.useState([]);

  const maxNumber = 6;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const mainCatSelected = (e) => {
    setSelectedOption(e);
    setSubOptions(null);
    setTimeout(() => {
      setSubOptions(e.data);
    }, 100);

    setForm({
      ...formData,
      cat: { ...formData.cat, mainId: e.value },
    });
  };

  const subCatSelected = (e) => {
    setForm({
      ...formData,
      cat: { ...formData.cat, subId: e.value },
    });
  };

  useEffect(() => {
    if (needToUpload) {
      uploadImages();
    }
    // eslint-disable-next-line
  }, [needToUpload]);

  const uploadImages = () => {
    setImageUpPending(true);
    setImgErr(null);
    const imageAsArray = images.map((img) => img.file);

    const formData2 = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData2.append("menu-images", imageAsArray[i], imageAsArray[i].name);
    }

    formData2.append("restid", rest._id);
    formData2.append("name", formData.name);
    formData2.append("status", formData.status);
    formData2.append("price", formData.price);
    formData2.append("description", formData.description);
    formData2.append("mainId", formData.cat.mainId);
    formData2.append("subId", formData.cat.subId);

    addMenuItem(formData2, authState.token)
      .then((res) => {
        setImageUpPending(false);
        dispatch(setRest(res));
        dispatch(toggleUploading(false));
        navigate(`/${rest.url}/menu`);
      })
      .catch((err) => {
        setImageUpPending(false);
        dispatch(toggleUploading(false));
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  const addCat = () => {
    dispatch(toggleAddingCat(true));
    dispatch(toggleOverlay(true));
    setRedrng(true);
  };
  const closeOverlay = () => {
    dispatch(toggleAddingCat(false));
    dispatch(toggleLangModal(false));
    setRedrng(false);
    setTimeout(() => {
      dispatch(toggleOverlay(false));
    }, 200);
  };

  const showAddLangOpt = () => {
    dispatch(toggleLangModal(true));
    dispatch(toggleOverlay(true));
    setRedrng(true);
  };

  return (
    <>
      {isAddingCat && <AddCartModal close={closeOverlay} />}
      {isLangModal && <LangSel />}
      <div
        className="container-fluid pt-5 px-4 big-bg-theme"
        style={{ minHeight: "100vh" }}
      >
        {overlay && (
          <PureOverlay
            redrng={redrng}
            closeOverlay={closeOverlay}
            width={`100%`}
          />
        )}
        <div className="row pt-4">
          {location.pathname === "/add-item" && (
            <div className="col-12">
              {/** image selection */}
              <div className="row justify-content-center">
                <div className="col-11 ps-0">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    acceptType={["jpg", "jpeg"]}
                    dataURLKey="data_url"
                  >
                    {({ imageList, onImageUpload, onImageRemove, errors }) => (
                      <div className="covers-list-wrapper">
                        <div className="">
                          {imaUpLdErr ? imgErrorDiv : null}
                        </div>

                        {errors && (
                          <div className="text-danger">
                            {errors.maxNumber && (
                              <span className="row">
                                Number of selected images exceed {maxNumber}
                              </span>
                            )}
                            {errors.acceptType && (
                              <span className="row">
                                Your selected file type is not allow
                              </span>
                            )}
                            {errors.maxFileSize && (
                              <span className="row">
                                Selected file size exceed maxFileSize
                              </span>
                            )}
                          </div>
                        )}

                        <ul className="covers-list ps-0 pb-0">
                          {imageUpPending ? (
                            <li>
                              <a
                                href="#!"
                                className="cover-item"
                                style={{ height: "80px" }}
                              >
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              </a>
                            </li>
                          ) : (
                            <li>
                              <label
                                onClick={onImageUpload}
                                className="cover-item"
                                style={{
                                  height: "80px",
                                  border: "1px dashed black",
                                  backgroundColor: "#f6f4f2",
                                }}
                                htmlFor="coverbg"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ width: "31px" }}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="my-auto"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </label>
                            </li>
                          )}

                          {imageList.map((image, index) => (
                            <li key={index} className="">
                              <a
                                href="#!"
                                className="cover-item"
                                style={{ height: "80px" }}
                              >
                                <img src={image["data_url"]} alt="" />
                              </a>

                              <div className="row pt-2">
                                <div className="col-12 text-center">
                                  <span>
                                    <svg
                                      onClick={() => onImageRemove(index)}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="svg-icon"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </ImageUploading>
                </div>
                {/*<div className="col-12 text-secondary fs-14">
                  add images to display the item to your customers
                          </div>*/}
              </div>
              {/** end of image selection */}

              {/** language select */}
              <div className="row justify-content-center">
                <div className="col-11 ps-0">
                  <div className="row">
                    <div className="col-1 me-2">
                      <img src="icons/eng.png" alt="" />
                    </div>
                    <div className="col-1 me-2">
                      <img src="icons/jap.png" alt="" />
                    </div>
                    <div className="col-1 me-2">
                      <svg
                        onClick={showAddLangOpt}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "23px" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="my-auto"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/** end of language select */}

              {/** status */}
              <div className="row mt-4">
                <span className="fs-18 fw-bold mb-3">Status</span>

                <div className="col-12 px-3">
                  <div className="row">
                    <div
                      onClick={() => setForm({ ...formData, status: 0 })}
                      className={`col-4 fs-12 ${
                        formData.status === 0 && "option-selected"
                      } text-center  border border-dark py-2 br-lf-r`}
                    >
                      available
                    </div>
                    <div
                      onClick={() => setForm({ ...formData, status: 1 })}
                      className={`col-4 fs-12 ${
                        formData.status === 1 && "option-selected"
                      } text-center  border border-dark py-2`}
                    >
                      sold out
                    </div>

                    <div
                      onClick={() => setForm({ ...formData, status: 2 })}
                      className={`col-4 fs-12 ${
                        formData.status === 2 && "option-selected"
                      } text-center  border border-dark py-2 br-rf-r`}
                    >
                      hidden
                    </div>
                  </div>
                </div>
              </div>

              {/** end of status */}

              {/** input */}
              <div className="row mt-4">
                <div className="col-12">
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setForm({ ...formData, name: e.target.value })
                    }
                    type="text"
                    placeholder="name"
                    className="form-control fs-14 big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                  />
                </div>
                <div className="col-12 py-4">
                  <input
                    value={formData.price}
                    onChange={(e) =>
                      setForm({ ...formData, price: e.target.value })
                    }
                    type="number"
                    placeholder="price($)"
                    className="form-control fs-14 big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                  />
                </div>
                <div className="col-12">
                  <input
                    value={formData.description}
                    onChange={(e) =>
                      setForm({ ...formData, description: e.target.value })
                    }
                    type="text"
                    placeholder="description"
                    className="form-control fs-14 big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                  />
                </div>
              </div>
              {/** end of input */}

              {/** choose cate */}
              <div className="row mt-4">
                <span className="fw-bold mb-3 fs-18">choose category</span>

                <div className="col-6">
                  <span className="fs-14 text-secondary">main category</span>
                  <Select
                    defaultValue={selectedOption}
                    onChange={(e) => mainCatSelected(e)}
                    options={menuMainOptions}
                  />
                </div>

                <div className="col-6">
                  <span className="fs-14 text-secondary">sub category</span>
                  {subOptions !== null && (
                    <Select
                      onChange={(e) => subCatSelected(e)}
                      options={subOptions}
                    />
                  )}
                </div>
              </div>

              {/** end of choose cate */}

              {/**delete item */}
              <div className="row mt-5 pb-5 mb-3">
                <div className="col-12 float-add-cat-button" onClick={addCat}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "20px" }}
                    className="me-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="fw-bold fs-18">add category</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddMenuItem;
