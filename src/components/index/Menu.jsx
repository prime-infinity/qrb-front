import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
//import { InView } from "react-intersection-observer";
import {
  pbFalse,
  pbTrue,
  setIsDragMen,
  setIsScrolGsap,
  setScrollCatBar,
  setScrollToMain,
  toggleAddingCat,
} from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import PureOverlay from "../../ui/PureOverlay";

import ItemsBottom from "../../ui/ItemsBottom";
import { toggleOverlay } from "../../redux/slices/menuSlice";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { changeMainCateogoryName, rearngCat } from "../../helpers/web";
import { resetRestCatOrder, setRest } from "../../redux/slices/restSlice";
import WarnModal from "../../ui/WarnModal";
import AddMenuItem from "../menu/AddMenuItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);
function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const scrollToMain = useSelector((state) => state.menu.scrollToMain);
  const [redrng, setRedrng] = useState(false);
  const dispatch = useDispatch();

  const rootElement = useRef();
  useEffect(() => {
    rootElement.current = document.querySelector("#root");
  }, []);

  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
      gsap.to(window, {
        duration: 0.1,
        scrollTo: { y: 0 },
      });
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      //setHLock(false);
    }, 300);
  }, []);

  const [ctNmErs, setCatNmErr] = useState({ id: null, mes: "" });
  const [ctPen, setCtPnd] = useState(null);
  const [getRef, setRef] = useDynamicRefs();
  const [editnCat, setEditnCat] = useState({
    id: null,
    name: "",
    hasTyped: false,
  });
  const [showWarn, setShowWarn] = useState(false);
  const [mainCatToDel, setMainToDel] = useState(null);
  const isEditnMenu = useSelector((state) => state.menu.isEditnMenu);
  const isAdmin = () => {
    return authState && authState?._id === rest.user && isEditnMenu
      ? true
      : false;
  };

  const closeOverlay = () => {
    dispatch(toggleAddingCat(false));
    setRedrng(false);
    setTimeout(() => {
      dispatch(toggleOverlay(false));
    }, 400);
  };

  const isDoneGsapScr = () => {
    dispatch(setIsScrolGsap(false));
    console.log("done,scrol main");
    //setScrollPx(0);
  };

  const scrollToMainCatGsap = (id) => {
    dispatch(setIsScrolGsap(true));
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(rootElement.current, {
      duration: 0.5,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneGsapScr,
    });
  };
  useEffect(() => {
    if (scrollToMain) {
      scrollToMainCatGsap(scrollToMain);
    }
    return () => {
      dispatch(setScrollToMain(null));
    };
    // eslint-disable-next-line
  }, [scrollToMain]);

  const showCatOpt = (id, name) => {
    if (isAdmin()) {
      if (authState?._id === rest.user) {
        setEditnCat({ id: id, name: name });
      }
    }
  };
  const deleteCat = (e) => {
    setShowWarn(true);
    setMainToDel(e);
  };
  const calcelCat = (id) => {
    setEditnCat({ id: null, name: "", hasTyped: false });
    setCatNmErr({ id: null, mes: "" });
  };
  const acceptCat = (id) => {
    setCatNmErr({ id: null, mes: "" });
    setCtPnd(id);
    changeMainCateogoryName(
      { id: id, name: editnCat.name, restid: rest._id },
      authState.token
    )
      .then((res) => {
        dispatch(setRest(res));
        setCtPnd(null);
        setEditnCat({ id: null, name: "", hasTyped: false });
      })
      .catch((err) => {
        setCtPnd(null);
        err.response?.data
          ? setCatNmErr({ id: id, mes: err.response.data })
          : setCatNmErr({ id: id, mes: err.message });
      });
  };
  const typeCatName = (e) => {
    setEditnCat({ ...editnCat, name: e.target.value, hasTyped: true });
  };
  const removeWarn = () => {
    setShowWarn(false);
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

  const reOrderMenu = (list, catt, startIndex, endIndex) => {
    const result = Array.from(list);
    const cat = result.filter((cat) => cat._id === catt);

    const menuItems = Array.from(cat[0].menu);
    const [removed] = menuItems.splice(startIndex, 1);
    menuItems.splice(endIndex, 0, removed);

    return result.map((cat) =>
      cat._id === catt
        ? {
            ...cat,
            menu: menuItems,
          }
        : cat
    );
  };

  const getListItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && "#f6f4f2",
    ...draggableStyle,
  });

  const getMenuListStyle = (isDraggingOver) => ({
    marginBottom: isDraggingOver ? "10%" : "",
    paddingBottom: isDraggingOver ? "30%" : "",
  });
  const onItemDragEnd = (e) => {
    //console.log(e);
    // dropped outside the list
    if (!e.destination) {
      return;
    }
    //droppable id is the catid
    let catId = e.source.droppableId;
    //its coming from e.source, its going to e.destination
    let startIndex = e.source.index;
    let endIndex = e.destination.index;

    if (startIndex !== endIndex) {
      console.log("will update");
      const newMenuOrder = reOrderMenu(
        rest.categories,
        catId,
        startIndex,
        endIndex
      );
      dispatch(resetRestCatOrder(newMenuOrder));
      if (authState?._id === rest.user) {
        rearngCat({ data: newMenuOrder, restId: rest._id }, authState.token)
          .then((res) => console.log("done rearranging"))
          .catch((err) => console.log("error rearranging", err));
      }
    }
    dispatch(setIsDragMen(false));
  };

  const menDragStart = () => {
    console.log("menu drag start1");
    dispatch(setIsDragMen(true));
    console.log("menu drag start2");
  };

  const enteredView = ({ name, id }) => {
    //console.log(name, "entered");
    dispatch(setScrollCatBar(id));
  };
  const leftView = ({ name, id }) => {
    //console.log(name, "left");
  };
  useEffect(() => {
    //console.log("eidted");
  }, []);
  return (
    <>
      {showWarn && (
        <>
          <WarnModal
            details={mainCatToDel && mainCatToDel}
            close={removeWarn}
          />
          <PureOverlay
            closeOverlay={removeWarn}
            redrng={showWarn}
            width={`100%`}
          />
        </>
      )}

      <div className="container-fluid pt-5 big-bg-theme">
        {overlay && (
          <PureOverlay
            redrng={redrng}
            closeOverlay={closeOverlay}
            width={`100%`}
          />
        )}
        <div className="row pt-5">
          <div className="col-12">
            {/** menu part */}
            <div className="row mt-4">
              {/** the menuss */}
              {true && (
                <div
                  className="col-12 mw-100"
                  style={{ marginBottom: "120px" }}
                >
                  <div
                    style={{
                      overflowY: "scroll",

                      /*overscrollBehavior: "none",*/
                    }}
                    className="row"
                    id="menus-cont"
                  >
                    <Accordion>
                      {rest?.categories?.length > 0 &&
                        rest.categories?.map(
                          (cat) =>
                            modifyView(cat) && (
                              <div className="" key={cat._id}>
                                <DragDropContext
                                  onDragStart={menDragStart}
                                  onDragEnd={onItemDragEnd}
                                >
                                  <Droppable
                                    droppableId={cat._id.toString()}
                                    direction="vertical"
                                  >
                                    {(provided, snapshot) => (
                                      <>
                                        <div
                                          ref={provided.innerRef}
                                          style={getMenuListStyle(
                                            snapshot.isDraggingOver
                                          )}
                                          {...provided.droppableProps}
                                          className="scroll-div d-ani-fast"
                                        >
                                          <div className={` mb-2`}>
                                            {true && (
                                              <div
                                                ref={setRef(
                                                  cat._id + "main_menu_span"
                                                )}
                                                className=" px-0 justify-content-center"
                                                id={cat._id + "main_menu_span"}
                                              >
                                                <motion.div
                                                  onViewportEnter={() =>
                                                    enteredView({
                                                      name: cat.name,
                                                      id: cat._id,
                                                    })
                                                  }
                                                  onViewportLeave={() =>
                                                    leftView({
                                                      name: cat.name,
                                                      id: cat._id,
                                                    })
                                                  }
                                                  viewport={{
                                                    once: false,
                                                    margin:
                                                      "0px 0px -450px 0px",
                                                  }}
                                                  className="px-0 pb-2"
                                                  style={{
                                                    position: "relative",
                                                    zIndex: "1",
                                                  }}
                                                >
                                                  {editnCat?.id === cat._id ? (
                                                    <input
                                                      onChange={typeCatName}
                                                      value={editnCat.name}
                                                      autoFocus
                                                      className="cat-name-input big-bg-theme fs-14 ps-2"
                                                    />
                                                  ) : (
                                                    <span
                                                      onClick={() =>
                                                        showCatOpt(
                                                          cat._id,
                                                          cat.name
                                                        )
                                                      }
                                                      className={`fs-13 ${
                                                        isAdmin() &&
                                                        "text-decoration-underline"
                                                      } `}
                                                    >
                                                      {cat.name}
                                                    </span>
                                                  )}
                                                  {editnCat?.id !== cat._id &&
                                                    snapshot.isDraggingOver && (
                                                      <span
                                                        style={{
                                                          position: "absolute",
                                                          right: "0%",
                                                        }}
                                                      >
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          fill="none"
                                                          viewBox="0 0 24 24"
                                                          strokeWidth={1.5}
                                                          stroke="currentColor"
                                                          className="svg-icon"
                                                        >
                                                          <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                                                          />
                                                        </svg>
                                                      </span>
                                                    )}
                                                  {editnCat?.id === cat._id && (
                                                    <span>
                                                      {ctPen !== cat._id && (
                                                        <span
                                                          onClick={() =>
                                                            calcelCat(cat._id)
                                                          }
                                                          className="ms-2"
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
                                                      )}
                                                      {editnCat.hasTyped &&
                                                        editnCat.name.length >
                                                          0 &&
                                                        editnCat.name.length <
                                                          20 && (
                                                          <span className="ps-2">
                                                            {ctPen ===
                                                            cat._id ? (
                                                              <div
                                                                className="spinner-border spinner-border-sm"
                                                                role="status"
                                                              >
                                                                <span className="visually-hidden">
                                                                  Loading...
                                                                </span>
                                                              </div>
                                                            ) : (
                                                              <span
                                                                onClick={() =>
                                                                  acceptCat(
                                                                    cat._id
                                                                  )
                                                                }
                                                              >
                                                                <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  strokeWidth={
                                                                    2
                                                                  }
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
                                                            )}
                                                          </span>
                                                        )}

                                                      {ctPen !== cat._id && (
                                                        <span
                                                          onClick={() =>
                                                            deleteCat({
                                                              id: cat._id,
                                                              name: cat.name,
                                                            })
                                                          }
                                                          style={{
                                                            position:
                                                              "absolute",
                                                            right: "0%",
                                                          }}
                                                        >
                                                          {
                                                            <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 24 24"
                                                              fill="currentColor"
                                                              className="svg-icon"
                                                            >
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                                clipRule="evenodd"
                                                              />
                                                            </svg>
                                                          }
                                                        </span>
                                                      )}
                                                    </span>
                                                  )}
                                                </motion.div>
                                                {ctNmErs.id === cat._id && (
                                                  <div className="col-11">
                                                    <span className="text-danger fs-14">
                                                      {ctNmErs.mes}
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            )}

                                            {cat.menu.map((item, indexx) => (
                                              <Draggable
                                                key={item._id.toString()}
                                                draggableId={item._id.toString()}
                                                index={indexx}
                                                isDragDisabled={
                                                  isAdmin() ? false : true
                                                }
                                              >
                                                {(provided, snapshot) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getListItemStyle(
                                                      snapshot.isDragging,
                                                      provided.draggableProps
                                                        .style
                                                    )}
                                                  >
                                                    <ItemsBottom
                                                      isAdmin={isAdmin()}
                                                      place={indexx}
                                                      parents={{
                                                        main: cat._id,
                                                      }}
                                                      item={item}
                                                      length={cat.menu.length}
                                                    />
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}

                                            {/** upload menu part */}
                                            {isAdmin() &&
                                              !snapshot.isDraggingOver && (
                                                <div className="">
                                                  <AddMenuItem details={cat} />
                                                </div>
                                              )}
                                            {/** end of upload menu */}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              </div>
                            )
                        )}
                    </Accordion>
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

export default Menu;
