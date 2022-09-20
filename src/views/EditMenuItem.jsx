import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ImageUploading from "react-images-uploading";

function EditMenuItem() {
  let location = useLocation();
  const restToEdit = useSelector((state) => state.rest.restToEdit);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList);
  };
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
                    value={restToEdit.files}
                    onChange={onChange}
                    maxNumber={6}
                    acceptType={["jpg", "jpeg"]}
                    dataURLKey="data_url"
                  >
                    {({ imageList, onImageUpload, onImageRemove }) => (
                      <div className="covers-list-wrapper">
                        <ul className="covers-list ps-0">
                          {imageList.map((image, index) => (
                            <li key={index} className="col-5">
                              <a
                                href="#!"
                                className="cover-item"
                                style={{ height: "136px" }}
                              >
                                <img src={image} alt="placeholder" />
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default EditMenuItem;
