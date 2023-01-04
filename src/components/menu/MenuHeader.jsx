import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { resetRestCatOrder, setRest } from "../../redux/slices/restSlice";
import { rearngCat, addMainCateogory } from "../../helpers/web";
import { useEffect, useState } from "react";
import useDynamicRefs from "use-dynamic-refs";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { setScrollToMain } from "../../redux/slices/menuSlice";

gsap.registerPlugin(ScrollToPlugin);
function MenuHeader() {
  const dispatch = useDispatch();

  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const targetCat = useSelector((state) => state.menu.scrollCatBarToTarget);
  const isScrolGsap = useSelector((state) => state.menu.isScrolGsap);
  const [addingCat, setAddingCat] = useState(false);
  const [catText, setCatText] = useState("");
  const [catErrs, setCatErrs] = useState(null);
  const [catPend, setCatPend] = useState(false);

  const isEditnMenu = useSelector((state) => state.menu.isEditnMenu);
  // eslint-disable-next-line
  const [getRef, setRef] = useDynamicRefs();

  const isAdmin = () => {
    return authState && authState?._id === rest.user && isEditnMenu
      ? true
      : false;
  };
  const onDragEnd = (e) => {
    // dropped outside the list
    if (!e.destination) {
      return;
    }
    //its coming from e.source, its going to e.destination
    let startIndex = e.source.index;
    let endIndex = e.destination.index;

    if (startIndex !== endIndex) {
      console.log("will update");
      const newItems = reOrder(rest.categories, startIndex, endIndex);
      dispatch(resetRestCatOrder(newItems));
      if (authState?._id === rest.user) {
        rearngCat({ data: newItems, restId: rest._id }, authState.token)
          .then((res) => console.log("done rearranging"))
          .catch((err) => console.log("error rearranging", err));
      }
    }
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "grey" : "",
    width: "fit-content",
    minWidth: "fit-content",
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#edecec" : "",
    display: "flex",
    overflow: "auto",
    paddingRight: "10%",
    paddingLeft: "10%",
  });
  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const scrollToMainCatGsap = (id) => {
    dispatch(setScrollToMain(id));
  };
  const setAddCatText = (e) => {
    setCatText(e.target.value.toLowerCase());
    gsap.to("#cat_input", {
      duration: 0.5,
      width: 4 + catText.length + "ch",
    });
  };
  const toggleAddCat = () => {
    setCatErrs(null);

    addingCat ? setAddingCat(false) : setAddingCat(true);

    if (addingCat) {
      setCatText("");
    }
  };
  const addCat = () => {
    setCatErrs(null);
    setCatPend(true);
    addMainCateogory({ name: catText, restid: rest._id }, authState.token)
      .then((res) => {
        dispatch(setRest(res));
        setCatPend(false);
        toggleAddCat();
      })
      .catch((err) => {
        setCatPend(false);
        err.response?.data
          ? setCatErrs(err.response.data)
          : setCatErrs(err.message);
      });
  };

  useEffect(() => {
    if (targetCat && !isScrolGsap) {
      scrollToCat(targetCat);
    }
    // eslint-disable-next-line
  }, [targetCat, isScrolGsap]);

  const scrollToCat = (id) => {
    let scrollTo = getRef(id + "main_button");
    gsap.to("#new-sticky", {
      duration: 0.2,
      scrollTo: { x: scrollTo.current, offsetX: 20, autoKill: true },
    });
  };

  const modifyView = (cat) => {
    if (!authState?._id) {
      if (cat.menu.length > 0) {
        return true;
      }
    }
    if (authState?._id === rest.user) {
      if (!isEditnMenu) {
        if (cat.menu.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    //if logged in and another rest
    if (authState?._id) {
      if (cat.menu.length > 0) {
        return true;
      }
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                className="scroll-div"
                id="new-sticky"
              >
                {rest?.categories?.length > 0 &&
                  rest.categories?.map(
                    (cat, index) =>
                      modifyView(cat) && (
                        <Draggable
                          key={cat._id.toString()}
                          draggableId={cat._id.toString()}
                          index={index}
                          isDragDisabled={isAdmin() ? false : true}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className="btn me-3 fw-600 fs-14 bg-them text-white cat-button"
                              onClick={() => scrollToMainCatGsap(cat._id)}
                            >
                              <span
                                ref={setRef(cat._id + "main_button")}
                                className={cat.name}
                                style={{
                                  textDecoration:
                                    targetCat === cat._id && "underline",
                                  textDecorationThickness:
                                    targetCat === cat._id && "3px",
                                }}
                              >
                                {cat.name}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      )
                  )}
                {provided.placeholder}
                {isAdmin() && (
                  <div
                    className={`pe-3 d-flex`}
                    style={{
                      width: "max-content",
                      position: "relative",
                    }}
                  >
                    {addingCat ? (
                      <input
                        ref={setRef("cat_input")}
                        id="cat_input"
                        value={catText}
                        autoFocus
                        onChange={setAddCatText}
                        className="cat-input fs-14 ps-3"
                        type="text"
                      />
                    ) : !addingCat ? (
                      <button
                        onClick={toggleAddCat}
                        className="btn fs-14 bg-them text-white cat-button"
                      >
                        <span style={{ display: "flex" }}>
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
                    ) : null}

                    <span
                      className={`d-ani-med`}
                      style={{
                        position: "absolute",
                        display: "flex",
                        opacity: addingCat ? "1" : "0%",
                        left: addingCat ? "100%" : "-100%",
                      }}
                    >
                      {catPend ? (
                        <span
                          style={{ width: "fit-content" }}
                          className="me-2 border-black cat-button"
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </span>
                      ) : (
                        <button
                          onClick={addCat}
                          className="btn fs-14 me-2 border-black cat-button"
                        >
                          <span style={{ display: "flex" }}>
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
                          </span>
                        </button>
                      )}

                      {!catPend && (
                        <button
                          disabled={catPend}
                          onClick={toggleAddCat}
                          className="btn fs-14 border-black cat-button"
                        >
                          <span style={{ display: "flex" }}>
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                      <span
                        className="text-danger fs-14 ps-2 d-flex"
                        style={{
                          width: "max-content",
                          alignItems: "center",
                        }}
                      >
                        {catErrs && catErrs}
                      </span>
                    </span>
                  </div>
                )}
                {rest?.categories?.length < 1 && isAdmin() && (
                  <>
                    <div
                      className="d-ani"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        left: addingCat ? "100%" : "0%",
                      }}
                    >
                      <span className="lr-ani">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{ width: "25px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                          />
                        </svg>
                      </span>
                      <span className="ms-3">categories</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default MenuHeader;
