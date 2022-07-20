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
  const [lock, setLock] = useState(null);
  const [viewEmp, setViewEm] = useState(false);
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

  const showMenuBut = (id) => {
    subBut === id ? showSubB(null) : showSubB(id);
    setViewEm(!viewEmp);
  };

  const highLightCat = (e) => {
    //console.log(e);
    //scroll to position
    const toScrollTo = getRef(e);

    toScrollTo.current.scrollIntoView(true);
  };

  const lockOnTarget = (data) => {
    //console.log(data);
    let { is, sub, main, mn, sn } = data;
    if (is) {
      showSubB(main);
      var htmlElement = document.getElementById(sub);
      var elementPosition = htmlElement.getBoundingClientRect();
      var outsider = document.getElementById("sticky");
      outsider.scrollTo({
        left: elementPosition.x /*+ 200,*/,
        behavior: "smooth",
      });
      setLock(sub);
      console.log(mn, sn);
    }
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
                      <div className="pe-3" style={{ width: "max-content" }}>
                        <button
                          onClick={toAddCat}
                          className="btn fs-14 bg-them text-white cat-button"
                        >
                          <span className="cat-btn-txt pe-1">add category</span>
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
                    {rest.categories?.map((cat, index) => (
                      <>
                        <div
                          className="pe-3"
                          style={{ width: "max-content" }}
                          key={index}
                        >
                          <button
                            onClick={() => showMenuBut(cat._id)}
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
                          className={`${
                            subBut === cat._id ? "d-contents" : "d-none"
                          }`}
                        >
                          {cat.sub.map((dat, ind) => (
                            <span
                              id={dat._id}
                              className={`mx-2 my-auto fs-14 ${
                                lock === dat._id ? "bor-btm-black" : ""
                              } min-width-maxcon`}
                              onClick={() => highLightCat(dat.name)}
                              key={ind}
                            >
                              {dat.name}
                            </span>
                          ))}
                        </div>
                      </>
                    ))}
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
                                  key={index}
                                  id={subb.name}
                                  ref={setRef(subb.name)}
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
                                        key={indexx}
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
