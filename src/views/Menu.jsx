import { useEffect, useState } from "react";
import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import { pbFalse, pbTrue } from "../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import {  useNavigate } from "react-router-dom";

import ItemsBottom from "../ui/ItemsBottom";
import Shrudding from "../ui/Shrudding";

function Menu() {
  const rest = useSelector((state) => state.rest.rest);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const CAT = [
    {
      id: 1,
      title: "drinks",
      data: [
        { id: 1, title: "coffee" },
        { id: 2, title: "Juice" },
        { id: 3, title: "Tea" },
        { id: 4, title: "Soda" },
        { id: 5, title: "Milk" },
        { id: 6, title: "Lemonade" },
      ],
    },
    {
      id: 2,
      title: "main menu",
      data: [
        { id: 1, title: "French Fries" },
        { id: 2, title: "Onion Rings" },
        { id: 3, title: "Fried Shrimps" },
        { id: 4, title: "Chicked" },
      ],
    },
    {
      id: 3,
      title: "lunch",
      data: [
        { id: 1, title: "Donuts" },
        { id: 2, title: "Coke" },
        { id: 3, title: "Chips" },
      ],
    },
  ];

  useEffect(() => {
    dispatch(pbTrue());
    return () => {
      dispatch(pbFalse());
    };
  }, [dispatch]);

  const [subBut, showSubB] = useState(null);
  const newArr = _.groupBy(rest.menu, "cat.subTitle");
  const [highLi, setHigLi] = useState(null);
  const [getRef, setRef] = useDynamicRefs();
  // eslint-disable-next-line
  const [lock, setLock] = useState(null);
  const [viewEmp, setViewEm] = useState(false);

  const chevNxt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon-lg"
      style={{ verticalAlign: "middle" }}
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

  //console.log(rest.menu);

  const showMenuBut = (id) => {
    subBut === id ? showSubB(null) : showSubB(id);
    setViewEm(!viewEmp);
  };

  const returnMainTitle = (e) => {
    let findDeep = function(data, title) {
      //eslint-disable-next-line
      return data.find(function(e) {
        if (e.title === title) return true;
        else if (e.data) return findDeep(e.data, title);
      });
    };
    return findDeep(CAT, e).title;
  };

  const highLightCat = (e) => {
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

  const addMeniItem = ()=>{
    navigate("/add-item");
  }

  return (
    <div
      className="container-fluid pt-5 big-bg-theme"
      style={{ minHeight: "100vh" }}
    >
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div className="row " id="sticky">
            <div className="col-12">
              <div
                className="row g-0 flex-nowrap scroll-div sticky"
                style={{ overflowX: "scroll", borderBottom: "2px solid black" }}
              >
                {CAT.map((cat, index) => (
                  <>
                    <div
                      className="pe-3"
                      style={{ width: "max-content" }}
                      key={index}
                    >
                      <button
                        onClick={() => showMenuBut(cat.id)}
                        className="btn fs-14 bg-them text-white cat-button"
                        style={{ borderRadius: "0" }}
                      >
                        {cat.title}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={` ${
                            subBut === cat.id
                              ? "rotate-icon"
                              : "counter-rotate-icon"
                          }`}
                          style={{ width: "20px", height: "20px" }}
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
                        subBut === cat.id ? "d-contents" : "d-none"
                      }`}
                    >
                      {cat.data.map((dat, indexx) => (
                        <span
                          id={dat.title}
                          className={`mx-2 my-auto fs-14 ${
                            lock === dat.title ? "border-bottom-drk" : ""
                          } min-width-maxcon`}
                          onClick={() => highLightCat(dat.title)}
                          key={indexx}
                        >
                          {dat.title}
                        </span>
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/** menu part */}
          <div className="row  mt-5">
            {/** the menuss */}

            {rest.menu.length === 0 ? (
              <>
                <div className="col-12">
                  <div className="to-center">
                    <span>
                      <Shrudding />
                    </span>{" "}
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="to-center text-center"
                    style={{ top: "70%", width: "90%" }}
                  >
                    <span className="fs-14 text-secondary">
                      your menu is empty
                    </span>
                    <button onClick={addMeniItem}  className="btn mt-4 btn-solid w-100 bg-them text-white">
                      add items
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12 mb-2">
                <Accordion>
                  {Object.entries(newArr).map(([key, value], ind) => (
                    <InView
                      as="div"
                      onChange={(inView) => lockOnTarget(inView, key)}
                      threshold={1}
                      key={ind}
                    >
                      <div
                        
                        id={key}
                        ref={setRef(key)}
                        className={`${
                          highLi === key ? "bg-highlight" : ""
                        }  mb-2`}
                      >
                        <div className="row px-0 justify-content-center">
                          <div className="col-11 px-0">
                            <span className="fs-13">
                              {returnMainTitle(key)}
                            </span>
                            <span>{chevNxt}</span>
                            <span className="fs-13">{key}</span>
                          </div>
                        </div>

                        {value.map((item, indexx) => (
                          <>
                            <ItemsBottom key={indexx} item={item} />
                          </>
                        ))}
                      </div>
                    </InView>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
