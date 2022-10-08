import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import { pbFalse, pbTrue, toggleAddingCat } from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import PureOverlay from "../../ui/PureOverlay";

import ItemsBottom from "../../ui/ItemsBottom";
//import Shrudding from "../../ui/Shrudding";
import { toggleOverlay } from "../../redux/slices/menuSlice";
import AddCartModal from "../../ui/AddCartModal";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { addMainCateogory } from "../../helpers/web";
import { setRest } from "../../redux/slices/restSlice";
gsap.registerPlugin(ScrollToPlugin);
function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const isAddingCat = useSelector((state) => state.menu.isAddingCat);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const [redrng, setRedrng] = useState(false);
  const [lockHori, setHLock] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setHLock(false);
    }, 300);
  }, []);

  //const [subBut, showSubB] = useState(null);
  const [addingCat, setAddingCat] = useState(false);
  const [catText, setCatText] = useState("");
  const [catErrs, setCatErrs] = useState(null);
  const [catPend, setCatPend] = useState(false);
  const [getRef, setRef] = useDynamicRefs();

  const chevNxt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "middle", width: "14px" }}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  //this below function opens up the main cats
  //to reveal the subcats

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
    let { is, sub /*main*/ } = data;
    if (is && !lockHori) {
      //showSubB(main);
      let scrollTo = getRef(sub + "sub_button");
      gsap.to("#sticky", {
        duration: 1.5,
        scrollTo: { x: scrollTo.current, offsetX: 150, autoKill: true },
      });
    }
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
        setAddingCat(false);
      })
      .catch((err) => {
        setCatPend(false);
        err.response?.data
          ? setCatErrs(err.response.data)
          : setCatErrs(err.message);
      });
  };
  return (
    <>
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
                    {rest.categories?.map((cat, index) => (
                      <span
                        className={`d-flex ${index !== 0 && "ps-3"}`}
                        key={cat._id}
                        style={{
                          minWidth: "min-content",
                          maxWidth: "max-content",
                        }}
                      >
                        <div className="">
                          <button
                            style={{ width: "fit-content" }}
                            ref={setRef(cat._id + "main_button_span")}
                            className="btn fs-14 bg-them text-white cat-button"
                          >
                            <span className="cat-btn-txt">{cat.name}</span>
                          </button>
                        </div>
                      </span>
                    ))}
                    {authState && authState?._id === rest.user && (
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

                        {true && (
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
              {false && (
                <div className="col-12 mb-2 mw-100 pb-100">
                  <div className="row" id="menus-cont">
                    <Accordion>
                      {rest.categories?.map(
                        (cat, mainIndex) =>
                          cat.sub.length > 0 &&
                          cat.sub.map(
                            (subb, index) =>
                              subb.menu.length > 0 && (
                                <InView
                                  as="div"
                                  key={subb._id}
                                  onChange={(inView) =>
                                    lockOnTarget({
                                      is: inView,
                                      sub: subb._id,
                                      sn: subb.name,
                                      main: cat._id,
                                      /*mn: cat.name,
                                      mn: cat.name,
                                    */
                                    })
                                  }
                                  threshold={1}
                                >
                                  <div className={` mb-2`}>
                                    {subb.menu.length > 0 && (
                                      <div
                                        ref={setRef(
                                          subb._id + "main_menu_span"
                                        )}
                                        className="row px-0 justify-content-center"
                                      >
                                        <div className="col-11 px-0 pb-2">
                                          <span className="fs-13">
                                            {cat.name}
                                          </span>
                                          <span>{chevNxt}</span>
                                          <span className="fs-13">
                                            {subb.name}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {subb.menu.map((item, indexx) => (
                                      <ItemsBottom
                                        key={item._id}
                                        place={indexx}
                                        parents={{
                                          main: cat._id,
                                          sub: subb._id,
                                        }}
                                        item={item}
                                        length={subb.menu.length}
                                      />
                                    ))}
                                  </div>
                                </InView>
                              )
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
