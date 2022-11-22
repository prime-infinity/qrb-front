import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import {
  pbFalse,
  pbTrue,
  // eslint-disable-next-line
  setIsScrolGsap,
  toggleAddingCat,
} from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import PureOverlay from "../../ui/PureOverlay";

import ItemsBottom from "../../ui/ItemsBottom";
import { toggleOverlay } from "../../redux/slices/menuSlice";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  addMainCateogory,
  changeMainCateogoryName,
  rearngCat,
} from "../../helpers/web";
import { resetRestCatOrder, setRest } from "../../redux/slices/restSlice";
import WarnModal from "../../ui/WarnModal";
import AddMenuItem from "../menu/AddMenuItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSwipeable } from "react-swipeable";

gsap.registerPlugin(ScrollToPlugin);
function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const [redrng, setRedrng] = useState(false);
  // eslint-disable-next-line
  const [lockHori, setHLock] = useState(true);
  const dispatch = useDispatch();
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

  const [addingCat, setAddingCat] = useState(false);
  const [catText, setCatText] = useState("");
  const [catErrs, setCatErrs] = useState(null);
  const [ctNmErs, setCatNmErr] = useState({ id: null, mes: "" });
  const [ctPen, setCtPnd] = useState(null);
  const [catPend, setCatPend] = useState(false);
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

  const toggleAddCat = () => {
    setCatErrs(null);

    addingCat ? setAddingCat(false) : setAddingCat(true);

    if (addingCat) {
      setCatText("");
    }
  };
  const closeOverlay = () => {
    dispatch(toggleAddingCat(false));
    setRedrng(false);
    setTimeout(() => {
      dispatch(toggleOverlay(false));
    }, 400);
  };

  const lockOnTarget = (data) => {
    // eslint-disable-next-line
    let { is, main, name } = data;
    if (is && !lockHori) {
      //console.log(name);
      /*let scrollTo = getRef(main + "main_button");
      gsap.to("#new-sticky", {
        duration: 1.5,
        scrollTo: { x: scrollTo.current, offsetX: 150, autoKill: true },
      });*/
    }
  };

  /*const isDoneSub = () => {
    console.log("done");
    setHLock(false);
  };*/

  const isDoneGsapScr = () => {
    console.log("done,scrol main");
    //setScrollPx(0);
  };

  const scrollToMainCatGsap = (id) => {
    //dispatch(setIsScrolGsap(true));
    //setHLock(true);
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneGsapScr,
    });
  };
  const setAddCatText = (e) => {
    setCatText(e.target.value.toLowerCase());
    gsap.to("#cat_input", {
      duration: 0.5,
      width: 4 + catText.length + "ch",
    });
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
  const showCatOpt = (id, name) => {
    if (authState?._id === rest.user) {
      setEditnCat({ id: id, name: name });
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
  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
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
  const onDragEnd = (e) => {
    // dropped outside the list
    if (!e.destination) {
      return;
    }
    //its coming from e.source, its going to e.destination
    let startIndex = e.source.index;
    let endIndex = e.destination.index;

    const newItems = reOrder(rest.categories, startIndex, endIndex);
    dispatch(resetRestCatOrder(newItems));
    if (authState?._id === rest.user) {
      rearngCat({ data: newItems, restId: rest._id }, authState.token)
        .then((res) => console.log("done rearranging"))
        .catch((err) => console.log("error rearranging", err));
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "grey" : "",
    width: "fit-content",
    minWidth: "fit-content",
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && "#f6f4f2",
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#edecec" : "",
    display: "flex",
    overflow: "auto",
    touchAction: "none",
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
  };

  /*const restCatHasLen = () => {
    return rest?.categories?.length > 0 ? true : false;
  };*/

  const config = {
    delta: 80, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };
  const [scrollPx, setScrollPx] = useState(0);
  const [hScrollPx, setHscrollPx] = useState(0);
  const scrollFactor = 450;
  const hScrollFactor = 50;

  const doneDown = () => {
    setScrollPx(scrollPx - scrollFactor);
  };
  const doneUp = () => {
    setScrollPx(scrollPx + scrollFactor);
  };
  const handlers = useSwipeable({
    //look for a way to disable this for
    //chrome andriod
    onSwiping: (eventData) => {
      if (eventData.dir === "Down") {
        //scroll down
        //console.log("scroll donw");
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {
            y: scrollPx - scrollFactor,
          },
          onComplete: doneDown,
        });
      }
      if (eventData.dir === "Up") {
        //scroll up
        //console.log("scroll up");
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: scrollPx + scrollFactor },
          onComplete: doneUp,
        });
      }
    },
    ...config,
  });

  const newHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === "Left") {
        //console.log("scroll left");
        gsap.to("#new-sticky", {
          duration: 0.5,
          scrollTo: {
            x: hScrollPx + hScrollFactor,
          },
          onComplete: setHscrollPx(hScrollPx + hScrollFactor),
        });
      }
      if (eventData.dir === "Right") {
        //console.log("scroll donw");
        gsap.to("#new-sticky", {
          duration: 0.5,
          scrollTo: {
            x: hScrollPx - hScrollFactor,
          },
          onComplete: setHscrollPx(hScrollPx - hScrollFactor),
        });
      }
    },
    ...config,
  });

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

      <div className="container-fluid pt-5 big-bg-theme" id="mmm">
        {overlay && (
          <PureOverlay
            redrng={redrng}
            closeOverlay={closeOverlay}
            width={`100%`}
          />
        )}
        <div className="row pt-5">
          <div className="col-12">
            {/** head button part */}
            <div className="row ">
              <div className="col-12">
                {!searchBar && (
                  <>
                    <div
                      {...newHandlers}
                      id="sticky"
                      className="row mx-1-plus-some g-0 flex-nowrap scroll-div sticky"
                      style={{
                        overflowX: "scroll",
                        paddingBottom: "0.9rem",
                        paddingRight: "2px",
                        paddingLeft: "2px",
                      }}
                    >
                      {/* the actual buttons */}
                      {true && (
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable
                            droppableId="droppable"
                            direction="horizontal"
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                className="scroll-div"
                                id="new-sticky"
                              >
                                {rest.categories?.map((cat, index) => (
                                  <Draggable
                                    key={cat._id.toString()}
                                    draggableId={cat._id.toString()}
                                    index={index}
                                    isDragDisabled={
                                      authState?._id === rest.user
                                        ? false
                                        : true
                                    }
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
                                        className="btn me-3 fs-14 bg-them text-white cat-button"
                                        onClick={() =>
                                          scrollToMainCatGsap(cat._id)
                                        }
                                      >
                                        <span
                                          ref={setRef(cat._id + "main_button")}
                                          className={cat.name}
                                        >
                                          {cat.name}
                                        </span>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
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
                                        <span className="me-2 border-black cat-button">
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
                            )}
                          </Droppable>
                        </DragDropContext>
                      )}
                    </div>
                    <div
                      style={{
                        position: "fixed",
                        width: "100%",
                        zIndex: "1",
                        marginTop: "17px",
                      }}
                      className="row justify-content-center"
                    >
                      <div
                        style={{ borderBottom: "2px solid black" }}
                        className="col-11 big-bg-theme"
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/** menu part */}
            <div className="row mt-4">
              {/** the menuss */}
              {true && (
                <div {...handlers} className="col-12 mb-2 mw-100">
                  <div className="row" id="menus-cont">
                    <Accordion>
                      {rest?.categories?.length > 0 &&
                        rest.categories?.map(
                          (cat) =>
                            modifyView(cat) && (
                              <InView
                                as="div"
                                key={cat._id}
                                onChange={(inView) =>
                                  lockOnTarget({
                                    is: inView,
                                    main: cat._id,
                                    name: cat.name,
                                  })
                                }
                                threshold={1}
                              >
                                <DragDropContext onDragEnd={onItemDragEnd}>
                                  <Droppable
                                    droppableId={cat._id.toString()}
                                    direction="vertical"
                                  >
                                    {(provided, snapshot) => (
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
                                              className="row px-0 justify-content-center"
                                              id={cat._id + "main_menu_span"}
                                            >
                                              <div
                                                className="col-11 px-0 pb-2"
                                                style={{ position: "relative" }}
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
                                                          {ctPen === cat._id ? (
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
                                                                strokeWidth={2}
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
                                                          position: "absolute",
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
                                              </div>
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
                                                authState?._id === rest.user
                                                  ? false
                                                  : true
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
                                              <div>
                                                <AddMenuItem details={cat} />
                                              </div>
                                            )}
                                          {/** end of upload menu */}
                                        </div>
                                      </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              </InView>
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
