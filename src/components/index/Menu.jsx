import { useEffect, useState } from "react";
//import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import { pbFalse, pbTrue } from "../../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import ItemsBottom from "../../ui/ItemsBottom";
//import Shrudding from "../../ui/Shrudding";

function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const searchBar = useSelector((state) => state.menu.searchBar);
  //const authState = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  //let navigate = useNavigate();

  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
    };
  }, [dispatch]);

  const [subBut, showSubB] = useState(null);
  const [highLi, setHigLi] = useState(null);
  const [getRef, setRef] = useDynamicRefs();
  // eslint-disable-next-line
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
    console.log(e);
    //scroll to position
    const toScrollTo = getRef(e);

    toScrollTo.current.scrollIntoView(true);

    if (highLi === e) {
      setHigLi(null);
      setTimeout(() => {
        setHigLi(e);
      }, 1);
    } else {
      setHigLi(e);
    }
  };

  const lockOnTarget = (inv, key) => {};

  /*const addMeniItem = () => {
    navigate("/add-item");
  };*/

  return (
    <div className="container-fluid pt-5 big-bg-theme">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div className="row " id="sticky">
            <div className="col-12">
              {!searchBar && (
                <div
                  className="row mx-1 pb-3 g-0 flex-nowrap scroll-div sticky"
                  style={{
                    overflowX: "scroll",
                    borderBottom: "1px solid black",
                  }}
                >
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
                            id={dat.name}
                            className={`mx-2 my-auto fs-14 ${
                              lock === dat.name ? "border-bottom-drk" : ""
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
                      cat.sub.map((subb, index) => (
                        <InView
                          as="div"
                          onChange={(inView) => lockOnTarget(inView, subb.name)}
                          threshold={1}
                        >
                          <div
                            key={index}
                            id={subb.name}
                            ref={setRef(subb.name)}
                            className={`${
                              highLi === subb.name ? "bg-highlight" : ""
                            }  mb-2`}
                          >
                            {subb.menu.length > 0 && (
                              <div className="row px-0 justify-content-center">
                                <div className="col-11 px-0 pb-2">
                                  <span className="fs-13">{cat.name}</span>
                                  <span>{chevNxt}</span>
                                  <span className="fs-13">{subb.name}</span>
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
                      ))
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
  );
}

export default Menu;
