import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { pbFalse, pbTrue, toggleAddingCat } from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import PureOverlay from "../../ui/PureOverlay";

import ItemsBottom from "../../ui/ItemsBottom";
//import Shrudding from "../../ui/Shrudding";
import { toggleOverlay } from "../../redux/slices/menuSlice";
import AddCartModal from "../../ui/AddCartModal";
import { Link, Element } from "react-scroll";

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
  };

  const scrollToMainCategory = (id, name) => {
    console.log("main: ", name);
    subBut === id ? showSubB(null) : showSubB(id);
    setTimeout(() => {
      let scrollTo = getRef(id + "main_button_span");
      scrollTo.current.scrollIntoView({ inline: "start" });
    }, 100);
  };

  const scrollToSubCategory = (id, name, mid) => {
    console.log("sub: ", name);
    let scrollIn = getRef(mid + "sub_span");
    let scrollTo = getRef(id + "sub_button");
    let elePosi = scrollTo.current.getBoundingClientRect();
    scrollIn.current.scrollTo({
      left: elePosi.x,
      behavior: "smooth",
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
                            <Link
                              to={cat.sub[0]._id + "main_menu_span"}
                              spy={true}
                              smooth={true}
                              duration={1000}
                              offset={-100}
                              onSetActive={() =>
                                scrollToMainCategory(cat._id, cat.name)
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
                            </Link>
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
                                      className={` ${
                                        ind === cat.sub.length - 1 && "pe-lg"
                                      } mx-2 my-auto fs-14  min-width-maxcon`}
                                      key={dat._id}
                                    >
                                      <Link
                                        to={dat._id + "main_menu_span"}
                                        spy={true}
                                        smooth={true}
                                        duration={1000}
                                        offset={-100}
                                        onSetActive={() =>
                                          scrollToSubCategory(
                                            dat._id,
                                            dat.name,
                                            cat._id
                                          )
                                        }
                                      >
                                        <span
                                          ref={setRef(dat._id + "sub_button")}
                                        >
                                          {dat.name}
                                        </span>
                                      </Link>
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
                      {rest.categories?.map((cat, mainIndex) =>
                        cat.sub.map(
                          (subb, index) =>
                            subb.menu.length > 0 && (
                              <Element
                                name={subb._id + "main_menu_span"}
                                key={subb._id}
                                className={` ${
                                  rest.categories[rest.categories.length - 1]
                                    .sub[
                                    rest.categories[rest.categories.length - 1]
                                      .sub.length - 1
                                  ].name === subb.name && "pb-100"
                                }`}
                              >
                                <div className={` mb-2`}>
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
                              </Element>
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
