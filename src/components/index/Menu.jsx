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
  //const [lock, setLock] = useState(null);
  const [viewEmp, setViewEm] = useState(false);
  const [fixLeft, setFixLeft] = useState(false);
  const [catsMorphed, setCatsMor] = useState(
    rest.categories.map((cat, index) => ({
      ...cat,
      order: index + 1,
    }))
  );
  const [subSelected, setSubSelected] = useState(null);
  const [mainCatDivSel, setMainCatDiv] = useState(null);
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

  const scrollToMainCat = (id) => {
    let htmlElement = document.getElementById(id);
    let elementPosition = htmlElement.getBoundingClientRect();
    let outsider = document.getElementById("sticky");
    outsider.scrollTo({
      left: elementPosition.x + 0,
      behavior: "smooth",
    });
  };

  //eslint-disable-next-line
  const reArrange = (id) => {
    //rearrange order of rest cats
    let original = rest.categories.map((cat, index) => ({
      ...cat,
      order: index + 1,
    }));
    let setted = original.map((cat) =>
      cat._id === id ? { ...cat, order: 0 } : cat
    );
    setCatsMor(setted);

    subBut === id
      ? setFixLeft(false)
      : !subBut
      ? setFixLeft(true)
      : setFixLeft(true);

    //add inner sliding class
    setMainCatDiv(id);
    setTimeout(() => {
      scrollToMainCat(id);
    }, 200);
  };

  const showMenuBut = (id) => {
    subBut === id ? showSubB(null) : showSubB(id);
    setViewEm(!viewEmp);
    //reArrange(id);
  };

  const highLightCat = (e) => {
    //console.log(e);
    setSubSelected(e);
    //scroll to position
    const toScrollTo = getRef(e);

    toScrollTo.current.scrollIntoView(true);
  };

  const lockOnTarget = (data) => {
    //console.log(data);
    //let { is, sub, main /*mn, sn*/ } = data;
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
                      <div
                        className={`pe-3 ${fixLeft ? "d-none" : ""}`}
                        style={{ width: "max-content" }}
                      >
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
                    {catsMorphed &&
                      catsMorphed
                        ?.sort((a, b) => a.order - b.order)
                        .map(
                          (cat, index) =>
                            cat.sub.length > 0 && (
                              <span
                                id={cat._id}
                                className={`d-contents ${
                                  false && "cat-div-selec"
                                }`}
                              >
                                <div
                                  className="pe-3"
                                  style={{ width: "max-content" }}
                                  key={cat._id}
                                >
                                  <button
                                    id={cat._id}
                                    onClick={() => showMenuBut(cat._id)}
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
                                <div
                                  id={cat._id + "main"}
                                  className={`scroll-div ${
                                    subBut === cat._id ? "d-contents" : "d-none"
                                  } ${
                                    mainCatDivSel === cat._id &&
                                    subBut === cat._id &&
                                    "d-sub-cat-slide"
                                  }`}
                                >
                                  {cat.sub.map((dat, ind) => (
                                    <span
                                      id={dat._id + "sub"}
                                      className={` ${
                                        ind === cat.sub.length - 1 && "pe-lg"
                                      } mx-2 my-auto fs-14  min-width-maxcon ${
                                        subSelected === dat._id &&
                                        "bor-btm-black"
                                      } `}
                                      onClick={() => highLightCat(dat._id)}
                                      key={dat._id}
                                    >
                                      {dat.name}
                                    </span>
                                  ))}
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
                                    /*mn: cat.name,
                                    sn: subb.name,*/
                                  })
                                }
                                threshold={1}
                              >
                                <div
                                  key={subb._id}
                                  id={subb.name}
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
