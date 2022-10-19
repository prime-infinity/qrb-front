import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import { pbFalse, pbTrue, toggleAddingCat } from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import PureOverlay from "../../ui/PureOverlay";

import ItemsBottom from "../../ui/ItemsBottom";
import { toggleOverlay } from "../../redux/slices/menuSlice";
import AddCartModal from "../../ui/AddCartModal";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { addMainCateogory, changeMainCateogoryName } from "../../helpers/web";
import { resetRestCatOrder, setRest } from "../../redux/slices/restSlice";
import WarnModal from "../../ui/WarnModal";
import AddMenuItem from "../menu/AddMenuItem";
import { Reorder, useDragControls } from "framer-motion";

gsap.registerPlugin(ScrollToPlugin);
function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const isAddingCat = useSelector((state) => state.menu.isAddingCat);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const [redrng, setRedrng] = useState(false);
  //const [lockHori, setHLock] = useState(true);
  const dispatch = useDispatch();
  const controls = useDragControls();
  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
    };
  }, [dispatch]);

  useEffect(() => {
    /*setTimeout(() => {
      setHLock(false);
    }, 300);*/
  }, []);

  //const [subBut, showSubB] = useState(null);
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
  const [showCatInput, setShowCatInput] = useState(false);
  const isAdmin = () => {
    return authState && authState?._id === rest.user ? true : false;
  };

  //this below function opens up the main cats
  //to reveal the subcats
  const toggleAddCat = () => {
    setCatErrs(null);
    showCatInput ? setShowCatInput(false) : setShowCatInput(true);
    setTimeout(() => {
      addingCat ? setAddingCat(false) : setAddingCat(true);
    }, 100);

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
    //let { is, sub /*main*/ } = data;
    //if (is && !lockHori) {
    //showSubB(main);
    //let scrollTo = getRef(sub + "sub_button");
    //gsap.to("#sticky", {
    //duration: 1.5,
    //scrollTo: { x: scrollTo.current, offsetX: 150, autoKill: true },
    //});
    //}
  };

  /*const isDoneSub = () => {
    setHLock(false);
  };*/

  /*const scrollToSubCatGsap = (id) => {
    //console.log("scrolling sub");
    setHLock(true);
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneSub,
    });
  };*/

  /*const scrollToMainCatGsap = (id) => {
    //console.log("scrolling main");
    setHLock(true);
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneSub,
    });
  };*/
  const setAddCatText = (e) => {
    setCatText(e.target.value);
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
      return true;
    }
    //forgot if logged in and another rest
    if (authState?._id) {
      if (cat.menu.length > 0) {
        return true;
      }
    }
  };
  const reOrder = (e) => {
    //console.log(e);
    dispatch(resetRestCatOrder(e));
  };

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
      {isAddingCat && <AddCartModal close={closeOverlay} />}
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
            {/** head button part */}
            <div className="row ">
              <div className="col-12">
                {!searchBar && (
                  <div
                    id="sticky"
                    className="row mx-1-plus-some pb-3 g-0 flex-nowrap scroll-div sticky"
                    style={{
                      overflowX: "scroll",
                      borderBottom: "1px solid black",
                    }}
                  >
                    {/* the actual buttons */}
                    <Reorder.Group
                      axis="x"
                      as="div"
                      values={rest.categories}
                      onReorder={reOrder}
                      style={{ display: "contents" }}
                    >
                      {rest.categories?.map((cat, index) => (
                        <Reorder.Item
                          as="div"
                          dragListener={false}
                          dragControls={controls}
                          className={` ${index !== 0 && "ps-3"}`}
                          key={cat._id}
                          value={cat}
                          style={{
                            minWidth: "min-content",
                            maxWidth: "max-content",
                          }}
                        >
                          <div className="">
                            <button
                              style={{ width: "fit-content", paddingLeft: "0" }}
                              ref={setRef(cat._id + "main_button_span")}
                              className="btn fs-14 bg-them text-white cat-button"
                            >
                              <span style={{ display: "flex" }}>
                                <svg
                                  onPointerDown={(e) => controls.start(e)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  style={{ width: "25px" }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <span className="cat-btn-txt ">{cat.name}</span>
                            </button>
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                    {isAdmin() && (
                      <div
                        className={`pe-3 ps-3 d-flex`}
                        style={{ width: "max-content", position: "relative" }}
                      >
                        {addingCat ? (
                          <input
                            ref={setRef("cat_input")}
                            id="cat_input"
                            value={catText}
                            onChange={setAddCatText}
                            className="cat-input fs-14"
                            type="text"
                            autoFocus
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

                        {showCatInput && (
                          <span
                            className={`d-flex`}
                            style={{
                              position: "absolute",
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
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/** menu part */}
            <div className="row  mt-5">
              {/** the menuss */}
              {rest.categories?.length < 1 && (
                <div>
                  <div className="col-12">
                    <div className="to-center">
                      <span></span>{" "}
                    </div>
                  </div>
                  <div className="col-12 mw-100">
                    <div
                      className="to-center text-center"
                      style={{ top: "50%", width: "90%" }}
                    >
                      <span className="fs-14 text-secondary">
                        add categories to start <br /> adding menu items
                      </span>
                    </div>
                  </div>
                </div>
              )}{" "}
              {true && (
                <div className="col-12 mb-2 mw-100 pb-100">
                  <div className="row" id="menus-cont">
                    <Accordion>
                      {rest.categories.length > 0 &&
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
                                  })
                                }
                                threshold={1}
                              >
                                <div className={` mb-2`}>
                                  {true && (
                                    <div
                                      ref={setRef(cat._id + "main_menu_span")}
                                      className="row px-0 justify-content-center"
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
                                              showCatOpt(cat._id, cat.name)
                                            }
                                            className={`fs-13 ${
                                              isAdmin() &&
                                              "text-decoration-underline"
                                            } `}
                                          >
                                            {cat.name}
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
                                              editnCat.name.length > 0 &&
                                              editnCat.name.length < 20 && (
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
                                                        acceptCat(cat._id)
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
                                    <ItemsBottom
                                      key={item._id}
                                      place={indexx}
                                      parents={{
                                        main: cat._id,
                                      }}
                                      item={item}
                                      length={cat.menu.length}
                                    />
                                  ))}

                                  {/** upload menu part */}
                                  {isAdmin() && <AddMenuItem details={cat} />}
                                  {/** end of upload menu */}
                                </div>
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
