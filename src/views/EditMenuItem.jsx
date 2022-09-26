import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import React, { useEffect, useState } from "react";

function EditMenuItem() {
  let location = useLocation();
  const restToEdit = useSelector((state) => state.rest.restToEdit);
  const editing = useSelector((state) => state.menu.editingMenu);
  const [imageUpPending, setImageUpPending] = useState(false);
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList);
    setImages(imageList);
  };

  useEffect(() => {
    setImages(restToEdit.files);
  }, [restToEdit.files]);
  const [formData, setForm] = useState({
    status: parseInt(restToEdit.status),
    name: restToEdit.name,
    price: restToEdit.price,
    description: restToEdit.description,
  });
  const doneEdit = () => {
    console.log("ddd");
    //setImageUpPending(true);
    //console.log(formData, 5);
  };
  useEffect(() => {
    if (editing) {
      doneEdit();
    }
    // eslint-disable-next-line
  }, [editing]);

  return (
    <>
      <div
        className="container-fluid pt-5 px-4 big-bg-theme"
        style={{ minHeight: "100vh" }}
      >
        <div className="row pt-4">
          {location.pathname === "/edit-item" && (
            <div className="col-12">
              {/** image selection */}
              <div className="row justify-content-center">
                <div className="col-11 ps-0">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={6}
                    acceptType={["jpg", "jpeg"]}
                    dataURLKey="data_url"
                  >
                    {({ imageList, onImageUpload, onImageRemove }) => (
                      <div className="covers-list-wrapper">
                        <ul className="covers-list ps-0">
                          {imageUpPending ? (
                            <li>
                              <a
                                href="#!"
                                className="cover-item"
                                style={{ height: "136px" }}
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
                                  height: "136px",
                                  border: "1px dashed black",
                                  backgroundColor: "#f6f4f2",
                                }}
                                htmlFor="coverbg"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ width: "40px" }}
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
                            <li key={index} className="col-5">
                              <a
                                href="#!"
                                className="cover-item"
                                style={{ height: "136px" }}
                              >
                                <img
                                  src={image.data_url ? image.data_url : image}
                                  alt="placeholder"
                                />
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
                <div className="col-12 text-secondary fs-14">
                  add images to display the item to your customers
                </div>
              </div>
              {/** end of image selection */}
              {/** status */}
              <div className="row mt-4">
                <span className="fs-14 fw-bold mb-3">Status</span>

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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default EditMenuItem;
