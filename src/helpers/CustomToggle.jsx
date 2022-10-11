import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestToEdit } from "../redux/slices/restSlice";
import { useNavigate } from "react-router-dom";
import PureOverlay from "../ui/PureOverlay";
import MenuWarnModal from "../ui/MenuWarnModal";

function CustomToggle({ eventKey, callback, item, parents }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const viewMode = useSelector((state) => state.menu.view);
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const [showWarn, setShowWarn] = useState(false);
  const [menToDel, setMenToDel] = useState(null);

  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  const editMenuItem = (item) => {
    //console.log(id, parents);
    dispatch(setRestToEdit({ ...parents, item: item }));
    navigate("/edit-item");
  };

  const deleteMenuItem = (e) => {
    setShowWarn(true);
    setMenToDel({ ...parents, name: e.name, id: e.id });
  };
  const removeWarn = () => {
    setShowWarn(false);
  };
  return (
    <>
      {showWarn && (
        <>
          <MenuWarnModal details={menToDel && menToDel} close={removeWarn} />
          <PureOverlay
            closeOverlay={removeWarn}
            redrng={showWarn}
            width={`100%`}
          />
        </>
      )}
      <div
        className={`row border-left-right ${
          isCurrentEventKey && "border-bottom-drk"
        }`}
        onClick={() => decoratedOnClick(item.name)}
      >
        <div className="m-cat ps-0 pe-0">
          <div className="m-cat-head">
            {item?.files?.length > 0 && (
              <div
                id={item.name}
                className={`   ${viewMode && "cat-left-view"} ${
                  !isCurrentEventKey && "border-right-theme"
                } ${isCurrentEventKey && "max-w-zero "} cat-left`}
              >
                <span className="cat-icon">
                  <img
                    style={{ objectFit: viewMode ? "cover" : "cover" }}
                    src={item.files[0]}
                    alt=""
                  />
                </span>
              </div>
            )}
            <div className={`${!viewMode && ""} cat-right `}>
              <div className="cat-head d-flex">
                <h4 style={{ marginBottom: viewMode ? "0px" : "5px" }}>
                  {item.name}
                </h4>

                {viewMode && authState && authState?._id === rest.user && (
                  <span className="mx-4 d-flex">
                    <span className="d-flex">
                      <svg
                        onClick={() => editMenuItem(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "18px", verticalAlign: "sub" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </span>
                    <span className="d-flex ms-4">
                      <svg
                        onClick={() =>
                          deleteMenuItem({ id: item._id, name: item.name })
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "18px", verticalAlign: "sub" }}
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
                  </span>
                )}

                <span className="price">
                  {viewMode && item?.status === "1" && (
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
                      <span className="fs-14">
                        {item?.status === "1" && "sold out"}
                      </span>
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
                      <>
                        <span
                          style={{
                            padding: "3%",
                            marginRight: "5px",
                          }}
                          onClick={() => editMenuItem(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "18px", verticalAlign: "sub" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </span>
                        <span
                          style={{
                            padding: "3%",
                          }}
                          onClick={() =>
                            deleteMenuItem({ id: item._id, name: item.name })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "18px", verticalAlign: "sub" }}
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
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomToggle;
