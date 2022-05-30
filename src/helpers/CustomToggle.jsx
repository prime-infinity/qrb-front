import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenuItemBack } from "./web";
import { setRest } from "../redux/slices/restSlice";

function CustomToggle({ eventKey, callback, item }) {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.menu.view);
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);

  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  const deleteMenuItem = (name) => {
    if (window.confirm("delete menu item?")) {
      deleteMenuItemBack({ name: name, restId: rest._id }, authState.token)
        .then((res) => {
          dispatch(setRest(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={`row border-left-right`}
      onClick={() => decoratedOnClick(item.name)}
    >
      <div className="m-cat ps-0 pe-0">
        <div className="m-cat-head">
          <div
            id={item.name}
            className={` ${viewMode && "cat-left-view"} ${
              isCurrentEventKey && "max-w-zero "
            } cat-left`}
          >
            <span className="cat-icon">
              <img
                style={{ objectFit: viewMode ? "fill" : "cover" }}
                src={item.files[0]}
                alt=""
              />
            </span>
          </div>
          <div className="cat-right">
            <div className="cat-head">
              <h4 style={{ marginBottom: viewMode ? "0px" : "5px" }}>
                {item.name}
              </h4>

              <span className="price">
                {viewMode && (
                  <span className="me-2">
                    <svg
                      className=""
                      style={{ width: "12px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    <span className="fs-14">soldout</span>
                  </span>
                )}
                ${item.price}
              </span>
            </div>
            {!viewMode && <p>{item.description}</p>}
            {!viewMode && isCurrentEventKey && (
              <div className="row">
                <div
                  className="col-12 text-end"
                  style={{ position: "absolute", bottom: "6%" }}
                >
                  {authState && authState?._id === rest.user && (
                    <span
                      style={{
                        padding: "3%",
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                      onClick={() => deleteMenuItem(item.name)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomToggle;
