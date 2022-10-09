import { useDispatch, useSelector } from "react-redux";
import { setAdding } from "../../redux/slices/menuSlice";

function AddMenuItem({ details }) {
  const dispatch = useDispatch();
  const hasInitAdding = useSelector((state) => state.menu.hasInitAdding);

  const startProc = () => {
    console.log("pro");
    dispatch(setAdding(details._id));
  };

  const canclProc = () => {
    console.log("canl");
    dispatch(setAdding(""));
  };

  return (
    <div className="row px-0 justify-content-center">
      <div
        className="col-11 px-0"
        style={{ display: "flex", position: "relative" }}
      >
        <button
          style={{
            justifyContent: "center",
            width: hasInitAdding === details._id ? "12%" : "100%",
          }}
          onClick={startProc}
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
          </span>
        </button>

        {hasInitAdding === details._id && (
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
