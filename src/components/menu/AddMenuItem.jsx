import { useDispatch, useSelector } from "react-redux";
import { setAdding } from "../../redux/slices/menuSlice";
import { useState } from "react";

function AddMenuItem({ details }) {
  const dispatch = useDispatch();
  const hasInitAdding = useSelector((state) => state.menu.hasInitAdding);
  const [editnMen, setEditM] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    isSet: false,
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
  };

  const canclProc = () => {
    //console.log("canl");
    dispatch(setAdding(""));
    setEditM({ id: null, name: "", description: "", price: "", isSet: false });
  };

  const strEdit = () => {
    setEditM({ ...editnMen, id: details._id });
  };

  const abortEdit = () => {
    setEditM({ id: null, name: "", description: "", price: "", isSet: false });
  };
  const doneEdit = () => {
    setEditM({ ...editnMen, isSet: true, id: null });
  };
  const setName = (e) => {
    setEditM({ ...editnMen, name: e.target.value });
  };
  const setPrice = (e) => {
    setEditM({ ...editnMen, price: e.target.value });
  };
  const setDesc = (e) => {
    setEditM({ ...editnMen, description: e.target.value });
  };
  return (
    <div className="row px-0 justify-content-center">
      <div
        style={{ opacity: isHere() ? "1" : "0" }}
        className={`col-11 d-ani menu-border ${isHere() ? "mb-08" : "mb-n-08"}`}
      >
        <div
          style={{ height: isHere() ? "124px" : "0px" }}
          className="row d-ani border-left-right border-bottom-drk"
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
                  {isEditn() ? (
                    <input
                      onChange={setName}
                      value={editnMen.name}
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
                  <input
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
              </div>
            </div>
            <div className="row">
              <div
                className="col-12 text-end"
                style={{ position: "absolute", bottom: "6%", right: "0%" }}
              >
                <>
                  {isEditn() && (
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
                  )}
                  {isEditn() && (
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
                    </span>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ height: isHere() ? "368px" : "0px" }}
          className="row d-flex border-left-right border-bottom-drk"
        >
          <div className="col-12 p-0 ">
            <div className="accordion-collapse collapse show">
              <div className="slick-slider slick-initialized">
                <div className="slick-list">
                  <div
                    className="slick-track"
                    style={{
                      opacity: "1",
                      transform: "translate3d(0px, 0px, 0px)",
                      width: "357px",
                    }}
                  >
                    <div
                      data-index="0"
                      className="slick-slide slick-active slick-current"
                      tabIndex="-1"
                      aria-hidden="false"
                      style={{ outline: "none", width: "357px" }}
                    >
                      <div>
                        <div
                          className="neg-mar"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div
                            style={{
                              height: isHere() ? "368px" : "0px",
                              position: "relative",
                            }}
                            className="sl-img d-ani"
                          >
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="/icons/Shape.png"
                              alt=""
                              className="to-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** bottom */}
      <div
        className="col-11 px-0"
        style={{ display: "flex", position: "relative" }}
      >
        <button
          style={{
            justifyContent: "center",
            width: isHere() ? "12%" : "100%",
          }}
          onClick={startProc}
          className="btn br-0 py-2 d-flex border-black"
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
            style={{ position: "absolute", right: "0%" }}
            onClick={canclProc}
            className="btn br-0 py-2 d-flex border-black"
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
    </div>
  );
}
export default AddMenuItem;
