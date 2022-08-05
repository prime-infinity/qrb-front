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

function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  const isAddingCat = useSelector((state) => state.menu.isAddingCat);
  const overlay = useSelector((state) => state.menu.overlay);
  const authState = useSelector((state) => state.auth.auth);
  const [redrng, setRedrng] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
    };
  }, [dispatch]);

  //console.log(rest.categories);

  const [subBut, showSubB] = useState(null);
  const [getRef, setRef] = useDynamicRefs();

  const [subSelected, setSubSelected] = useState(null);
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

  const [scrolledMain, setSm] = useState(null);

  //this below function scrolls vertically
  //to the first menu item
  const scrollToVerToFirsItem = (fSubCat) => {
    //get first menu itemid,so we can scroll to it
    let firstMenuItemId = fSubCat?.menu[0]?._id;
    if (firstMenuItemId) {
      //console.log(firstMenuItemId);
      /*
    we have the id of the first item
    of the first sub cat of this
    main cat clicked, we now have to scroll toit
  */
      let scrollTo = getRef(firstMenuItemId);
      scrollTo.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  //this below function opens up the main cats
  //to reveal the subcats
  const showMenuBut = (data) => {
    const { mId, fSubCat } = data;
    subBut === mId ? showSubB(null) : showSubB(mId);

    //scrollToVerToFirsItem(fSubCat);
  };

  //this below function is called when a sub cat
  //is clicked, it scrolls the menu list down to
  //locate the menu items
  const highLightCat = (e) => {
    setSubSelected(e);
    //scroll to position
    const toScrollTo = getRef(e);
    if (toScrollTo) {
      toScrollTo.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const lockOnTarget = (data) => {
    //console.log(data);
    let { is, sub, main, mn, sn } = data;
    if (is) {
      //if already scolled to that
      //main cat
      if (scrolledMain === main) {
        //you are already in the maain cat
        //console.log("aler");
        /**
          make the main cat the container and scroll
          the sub cats inside it
        */
        console.log("sub" + sn);
        setTimeout(() => {
          let scrollIn = getRef(main + "sub_span");
          let subEle = getRef(sub + "sub_div");
          let sPosition = subEle.current.getBoundingClientRect();
          scrollIn.current.scrollTo({
            left: sPosition.x,
            behavior: "smooth",
          });
          setSubSelected(sub);
        }, 500);
      } else {
        console.log("main" + mn);
        //first, let us scroll to the main cat
        let outsider = document.getElementById("sticky");
        let ele = getRef(main + "main_span");
        let aPositi = ele.current.getBoundingClientRect();
        //console.log(aPositi);
        outsider.scrollTo({
          left: aPositi.x,
          behavior: "smooth",
        });
        setSm(main);

        //open up main cat to reveal sub
        subBut === main ? showSubB(null) : showSubB(main);
      }
    }

    /*if (is) {
      //console.log(sub, main, mainCatDivSel);
      if (main === mainCatDivSel) {
        //scroll sub cat and highlight
        //console.log(sn);
        setLock(sub);
        let subCat = document.getElementById(sub + "sub");
        let subPosition = subCat.getBoundingClientRect();
        let minCat = document.getElementById(main + "main");
        minCat.scrollTo({
          left: subPosition.x - 300,
          behavior: "smooth",
        });
      }
    }
    /*if (is) {
      showSubB(main);
      var htmlElement = document.getElementById(sub);
      var elementPosition = htmlElement.getBoundingClientRect();
      var outsider = document.getElementById("sticky");
      outsider.scrollTo({
        left: elementPosition.x + 250,
        behavior: "smooth",
      });
      setLock(sub);
      //console.log(mn, sn);
    }*/
  };

  const toAddCat = () => {
    dispatch(toggleAddingCat(true));
    dispatch(toggleOverlay(true));
    setRedrng(true);
  };
  const closeOverlay = () => {
    dispatch(toggleAddingCat(false));
    setRedrng(false);
  };

  //console.log(rest.categories);

  //console.log(catsMorphed);

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
                    className="row mx-1 pb-3 g-0 flex-nowrap scroll-div sticky"
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
                            className={`d-flex ${false && "cat-div-selec"}`}
                            ref={setRef(cat._id + "main_span")}
                            style={{
                              minWidth: "min-content",
                              maxWidth: "max-content",
                            }}
                          >
                            <div
                              className="pe-3"
                              style={{ width: "max-content" }}
                              key={cat._id}
                            >
                              <button
                                onClick={() =>
                                  showMenuBut({
                                    mId: cat._id,
                                    fSubCat: cat.sub[0],
                                  })
                                }
                                className="btn fs-14 bg-them text-white cat-button"
                              >
                                <span className="cat-btn-txt">{cat.name}</span>

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
                            <div
                              id={cat._id + "main"}
                              ref={setRef(cat._id + "sub_span")}
                              className={`scroll-div ${
                                subBut === cat._id ? "d-flex" : "d-none"
                              } `}
                              style={{
                                overflowX: "scroll",
                                maxWidth: "220px",
                              }}
                            >
                              {cat.sub.map(
                                (dat, ind) =>
                                  dat.menu.length > 0 && (
                                    <span
                                      id={dat._id + "sub"}
                                      className={` ${
                                        ind === cat.sub.length - 1 && "pe-lg"
                                      } mx-2 my-auto fs-14  min-width-maxcon ${
                                        subSelected === dat._id &&
                                        "bor-btm-black"
                                      } `}
                                      ref={setRef(dat._id + "sub_div")}
                                      onClick={() => highLightCat(dat._id)}
                                      key={dat._id}
                                    >
                                      {dat.name}
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
                  <div className="row">
                    <Accordion>
                      {rest.categories?.map((cat) =>
                        cat.sub.map(
                          (subb, index) =>
                            subb.menu.length > 0 && (
                              <InView
                                as="div"
                                onChange={(inView) =>
                                  lockOnTarget({
                                    is: inView,
                                    sub: subb._id,
                                    main: cat._id,
                                    mn: cat.name,
                                    sn: subb.name,
                                  })
                                }
                                threshold={1}
                              >
                                <div
                                  key={subb._id}
                                  ref={setRef(subb._id)}
                                  className={` mb-2`}
                                >
                                  {subb.menu.length > 0 && (
                                    <div className="row px-0 justify-content-center">
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
                                    <>
                                      <ItemsBottom
                                        key={item._id}
                                        place={indexx}
                                        item={item}
                                        length={subb.menu.length}
                                      />
                                    </>
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
