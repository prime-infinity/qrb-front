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
gsap.registerPlugin(ScrollToPlugin);
function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const isAddingCat = useSelector((state) => state.menu.isAddingCat);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const [inSub, setInSub] = useState(null);
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
    }, 100);
  }, []);

  const [subBut, showSubB] = useState(null);
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
  const showMenuBut = (data) => {
    const { mId } = data;
    subBut === mId ? showSubB(null) : showSubB(mId);
  };

  const toAddCat = () => {
    dispatch(toggleAddingCat(true));
    dispatch(toggleOverlay(true));
    setRedrng(true);
  };
  const closeOverlay = () => {
    dispatch(toggleAddingCat(false));
    setRedrng(false);
    setTimeout(() => {
      dispatch(toggleOverlay(false));
    }, 400);
  };

  const lockOnTarget = (data) => {
    let { is, sub, main } = data;
    if (is && !lockHori) {
      setInSub(sub);
      showSubB(main);
      let scrollTo = getRef(sub + "sub_button");
      gsap.to("#sticky", {
        duration: 1.5,
        scrollTo: { x: scrollTo.current, offsetX: 150, autoKill: true },
      });
    }
  };

  const isDoneSub = () => {
    setHLock(false);
  };

  const scrollToSubCatGsap = (id) => {
    //console.log("scrolling sub");
    setInSub(id);
    setHLock(true);
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneSub,
    });
  };

  const scrollToMainCatGsap = (id) => {
    //console.log("scrolling main");
    setHLock(true);
    let scrollTo = getRef(id + "main_menu_span");
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: scrollTo.current, offsetY: 150 },
      onComplete: isDoneSub,
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
                    {" "}
                    {authState && authState?._id === rest.user && (
                      <div className={`pe-3`} style={{ width: "max-content" }}>
                        <button
                          onClick={toAddCat}
                          className="btn fs-14 bg-them text-white cat-button"
                        >
                          <span style={{ display: "flex" }}>
                            <svg
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    )}
                    {rest.categories?.length < 1 && (
                      <div className="pe-3" style={{ width: "max-content" }}>
                        <button className="btn fs-14 cat-button">
                          <span className="cat-btn-txt">no categories</span>
                        </button>
                      </div>
                    )}
                    {/* the actual buttons */}
                    {rest.categories?.map(
                      (cat, index) =>
                        cat.sub.length > 0 && (
                          <span
                            className={`${
                              rest.categories[rest.categories.length - 1]
                                ._id === cat._id && "mr-100"
                            } d-flex`}
                            key={cat._id}
                            style={{
                              minWidth: "min-content",
                              maxWidth: "max-content",
                            }}
                          >
                            <span
                              onClick={() =>
                                scrollToMainCatGsap(cat.sub[0]._id)
                              }
                            >
                              <div className="pe-3">
                                <button
                                  ref={setRef(cat._id + "main_button_span")}
                                  onClick={() =>
                                    showMenuBut({
                                      mId: cat._id,
                                      fSubCat: cat.sub[0],
                                    })
                                  }
                                  className="btn fs-14 bg-them text-white cat-button"
                                >
                                  <span className="cat-btn-txt">
                                    {cat.name}
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`cat-btn-arr ${
                                      subBut === cat._id
                                        ? "rotate-icon"
                                        : "counter-rotate-icon"
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </span>
                            <div
                              id={cat._id + "main"}
                              ref={setRef(cat._id + "sub_span")}
                              className={`scroll-div ${
                                true ? "d-flex" : "d-none"
                              } `}
                              style={{
                                overflowX: "scroll",
                                maxWidth: "max-content",
                              }}
                            >
                              {cat.sub.map(
                                (dat, ind) =>
                                  dat.menu.length > 0 && (
                                    <span
                                      className={` ${
                                        ind === cat.sub.length - 1 && "pe-lg"
                                      } mx-2 my-auto fs-14  min-width-maxcon`}
                                      key={dat._id}
                                      ref={setRef(dat._id + "sub_button")}
                                    >
                                      <span
                                        onClick={() =>
                                          scrollToSubCatGsap(dat._id)
                                        }
                                        className={`${
                                          inSub === dat._id && "bor-btm-black"
                                        }`}
                                      >
                                        <span>{dat.name}</span>
                                      </span>
                                    </span>
                                  )
                              )}
                            </div>
                          </span>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/** menu part */}
            <div className="row  mt-5">
              {/** the menuss */}
              {
                /*rest.menu.length === 0 ? (
              <div>
                <div className="col-12">
                  <div className="to-center">
                    <span>
                      <Shrudding />
                    </span>{" "}
                  </div>
                </div>
                <div className="col-12 mw-100">
                  <div
                    className="to-center text-center"
                    style={{ top: "70%", width: "90%" }}
                  >
                    <span className="fs-14 text-secondary">menu is empty</span>
                    {authState && authState?._id === rest.user && (
                      <button
                        onClick={addMeniItem}
                        className="btn mt-4 btn-solid w-100 bg-them text-white"
                      >
                        add items
                      </button>
                    )}
                  </div>
                </div>
              </div>
            */ //) : (
                <div className="col-12 mb-2 mw-100">
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
                                  className={` ${
                                    rest.categories[rest.categories.length - 1]
                                      .sub[
                                      rest.categories[
                                        rest.categories.length - 1
                                      ].sub.length - 1
                                    ].name === subb.name && "pb-100"
                                  }`}
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
                /*)*/
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
