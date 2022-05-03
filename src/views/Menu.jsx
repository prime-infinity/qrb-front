import MenuItems from "../ui/MenuItems";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";

function Menu() {
  let navigate = useNavigate();

  const CAT = [
    {
      id: 1,
      title: "Drinks",
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
      title: "Main Menu",
      data: [
        { id: 1, title: "French Fries" },
        { id: 2, title: "Onion Rings" },
        { id: 3, title: "Fried Shrimps" },
        { id: 4, title: "Chicked" },
      ],
    },
    {
      id: 3,
      title: "Lunch",
      data: [
        { id: 1, title: "Donuts" },
        { id: 2, title: "Coke" },
        { id: 3, title: "Chips" },
      ],
    },
  ];

  const MENUITEMS = [
    {
      name: "flavored cafe late",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored cafe late2",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored cafe late3",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored Milk",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "flaMilk 2",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Lemonade",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Lemonade",
        subId: 6,
      },
    },
    {
      name: "Boring Tea",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Tea",
        subId: 3,
      },
    },
    {
      name: "Exciting Fries",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "More Exciting Fries",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Most Exciting Fries",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Standup Chicken",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "Chicked",
        subId: 4,
      },
    },
    {
      name: "surrendered Chicken",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "Chicked",
        subId: 4,
      },
    },
    {
      name: "Mr Crabs",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "Fried Shrimps",
        subId: 3,
      },
    },
    {
      name: "LOrd of the RIngs?",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "Onion Rings",
        subId: 2,
      },
    },
    {
      name: "LIght Snack 1",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "LIght Snack 2",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "Coke",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Coke",
        subId: 2,
      },
    },
    {
      name: "Chipanzees",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Chips",
        subId: 3,
      },
    },
    {
      name: "Chipmunks",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Chips",
        subId: 3,
      },
    },
    {
      name: "Literal Soda",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Soda",
        subId: 4,
      },
    },
    {
      name: "Fizzy Soda",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Soda",
        subId: 4,
      },
    },
    {
      name: "HollanDia Yoghurt",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Bread",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "Diet Coke",
      cat: {
        mainTitle: "Lunch",
        mainId: 3,
        subTitle: "Coke",
        subId: 2,
      },
    },
    {
      name: "LobStery",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "Fried Shrimps",
        subId: 3,
      },
    },
    {
      name: "Literal french Fries",
      cat: {
        mainTitle: "Main Menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Boring Drink one",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Tea",
        subId: 3,
      },
    },
    {
      name: "CowBell",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Dano",
      cat: {
        mainTitle: "Drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
  ];

  useEffect(() => {
    window.onscroll = function() {
      myFunction();
    };
    var header = document.getElementById("sticky");

    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }, []);

  const [subBut, showSubB] = useState(null);
  const newArr = _.groupBy(MENUITEMS, "cat.subTitle");
  const [highLi, setHigLi] = useState(null);
  const [getRef, setRef] = useDynamicRefs();
  const [lock, setLock] = useState(null);
  const [viewEmp, setViewEm] = useState(false);

  const viewMenuItem = () => {
    navigate("/view-item");
  };

  const chevNxt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
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

  const fakeHigh = (e) => {
    if (highLi === e) {
      setHigLi(null);
      setTimeout(() => {
        setHigLi(e);
      }, 1);
    } else {
      setHigLi(e);
    }
  };

  const lockOnTarget = (inv, key) => {
    if (inv === true) {
      setLock(key);

      let menuId = CAT.find((cat) => cat.title === returnMainTitle(key)).id;
      showSubB(menuId);

      var htmlElement = document.getElementById(key);
      var elementPosition = htmlElement.getBoundingClientRect();
      var outsider = document.getElementById("sticky");
      outsider.scrollTo({
        left: elementPosition.x + 200,
        behavior: "smooth",
      });
      //console.log(key);
      fakeHigh(key);
    }
  };

  const toAddItem = () => {
    navigate("/add-item");
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div
            className="row flex-nowrap scroll-div"
            id="sticky"
            style={{ overflowX: "scroll" }}
          >
            {CAT.map((cat, index) => (
              <>
                <div className="col-5" key={index}>
                  <button
                    onClick={() => showMenuBut(cat.id)}
                    className="btn bg-them w-100 text-white q-font-weight-bold"
                  >
                    {cat.title}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`svg-icon ${
                        subBut === cat.id
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
                  className={`${subBut === cat.id ? "d-contents" : "d-none"}`}
                >
                  {cat.data.map((dat, index) => (
                    <span
                      id={dat.title}
                      className={`mx-2 my-auto fw-bold ${
                        lock === dat.title ? "border-bottom-drk" : ""
                      } min-width-maxcon`}
                      onClick={() => highLightCat(dat.title)}
                      key={index}
                    >
                      {dat.title}
                    </span>
                  ))}
                </div>
              </>
            ))}
          </div>

          {/** menu part */}
          <div className="row  mt-4">
            {/** the menuss */}

            {!viewEmp ? (
              <div className="col-12 mb-4">
                {Object.entries(newArr).map(([key, value]) => (
                  <InView
                    as="div"
                    onChange={(inView) => lockOnTarget(inView, key)}
                    threshold={1}
                  >
                    <div
                      key={key}
                      id={key}
                      ref={setRef(key)}
                      className={`${
                        highLi === key ? "bg-highlight" : ""
                      } row justify-content-center mb-5`}
                    >
                      <div className="pb-2 ps-3 text-start">
                        <span>{returnMainTitle(key)}</span>
                        <span>{chevNxt}</span>
                        <span>{key}</span>
                      </div>{" "}
                      <>
                        {value.map((item, index) => (
                          <>
                            <MenuItems
                              key={index}
                              viewMenuItem={viewMenuItem}
                              item={item}
                            />
                          </>
                        ))}
                      </>
                    </div>
                  </InView>
                ))}
              </div>
            ) : viewEmp ? (
              <div className="col-12 mb-4">
                <div className="to-center">
                  <span>
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M38.9442 2.24349C35.3531 1.08082 26.9051 1.39904 24.7931 4.14393C19.3015 4.24882 12.8588 9.21238 12.0144 15.7617C11.1788 22.2417 13.042 25.2515 13.7051 30.1244C14.4553 35.6462 17.5593 37.4115 20.0411 38.151C23.6108 42.8693 27.4046 42.6666 33.778 42.6666C46.2224 42.6666 52.1495 34.3395 52.674 20.1973C52.9904 11.6426 47.9717 5.16438 38.9442 2.24349Z"
                        fill="#676767"
                      />
                      <path
                        d="M47.9998 37.334H15.9998C12.0727 37.334 8.88867 40.518 8.88867 44.4451V64.0007H55.1109V44.4451C55.1109 40.518 51.9269 37.334 47.9998 37.334Z"
                        fill="#A4A4A4"
                      />
                      <path
                        d="M46.0519 20.8599C44.8483 19.1924 43.3052 17.8501 39.9256 17.3755C41.1932 17.9568 42.4074 19.9621 42.5656 21.0715C42.7239 22.1808 42.8821 23.0786 41.8794 21.9692C37.8599 17.5266 33.483 19.2759 29.1452 16.563C26.1176 14.6661 25.195 12.5684 25.195 12.5684C25.195 12.5684 24.8252 15.3666 20.2314 18.2181C18.8999 19.0448 17.3105 20.8866 16.4288 23.6048C15.7959 25.5586 15.9914 27.3008 15.9914 30.2786C15.9914 38.9701 23.1541 46.2786 31.9914 46.2786C40.8288 46.2786 47.9914 38.9061 47.9914 30.2786C47.9914 24.8724 47.4261 22.7604 46.0519 20.8599Z"
                        fill="#D2D2D2"
                      />
                      <path
                        d="M17.7773 48H19.5551V64H17.7773V48Z"
                        fill="#3D3D3D"
                      />
                      <path
                        d="M8.35879 47.1021L7.85568 46.9972H6.94724C6.94724 46.8941 6.98813 46.7981 7.00946 46.6968C6.39079 46.3146 6.03879 45.5857 6.19524 44.8337C6.39435 43.8701 7.33835 43.2514 8.30368 43.4488L12.021 44.2186H15.0006C16.5348 44.2186 17.7775 45.463 17.7775 46.999V49.7777H11.1161C11.1161 49.7777 8.48324 48.5883 8.35879 47.1021Z"
                        fill="#8B8B8B"
                      />
                      <path
                        d="M0 45.609C0 44.841 0.622222 44.2188 1.38844 44.2188L9.72622 45.609H16.3876C17.1556 45.609 17.776 46.233 17.776 46.9974V49.7779H8.88889L1.38844 46.9992C1.38844 46.9992 0 46.377 0 45.609Z"
                        fill="#D2D2D2"
                      />
                      <path
                        d="M7.11133 63.9996H17.778V49.7773H8.88911L7.11133 63.9996Z"
                        fill="#A4A4A4"
                      />
                      <path
                        d="M44.4453 48H46.2231V64H44.4453V48Z"
                        fill="#3D3D3D"
                      />
                      <path
                        d="M55.6415 47.1021L56.1446 46.9972H57.0531C57.0531 46.8941 57.0122 46.7981 56.9908 46.6968C57.6095 46.3146 57.9615 45.5857 57.8051 44.8337C57.6059 43.8701 56.6637 43.2514 55.6984 43.4488L51.9811 44.2186H49.0015C47.4673 44.2186 46.2246 45.463 46.2246 46.999V49.7777H52.8859C52.8842 49.7777 55.5171 48.5883 55.6415 47.1021Z"
                        fill="#8B8B8B"
                      />
                      <path
                        d="M64.0004 45.609C64.0004 44.841 63.3782 44.2188 62.612 44.2188L54.2724 45.609H47.6111C46.8431 45.609 46.2227 46.233 46.2227 46.9974V49.7779H55.1115L62.612 46.9992C62.612 46.9992 64.0004 46.377 64.0004 45.609Z"
                        fill="#D2D2D2"
                      />
                      <path
                        d="M56.8893 63.9996H46.2227V49.7773H55.1115L56.8893 63.9996Z"
                        fill="#A4A4A4"
                      />
                      <path
                        d="M33.7784 34.6664H30.2229C29.7322 34.6664 29.334 34.2682 29.334 33.7776C29.334 33.2869 29.7322 32.8887 30.2229 32.8887H33.7784C34.2691 32.8887 34.6673 33.2869 34.6673 33.7776C34.6673 34.2682 34.2691 34.6664 33.7784 34.6664ZM36.4451 40.8887H35.5562C35.0655 40.8887 34.6673 40.4904 34.6673 39.9998C34.6673 39.5091 35.0655 39.1109 35.5562 39.1109H36.4451C36.9358 39.1109 37.334 39.5091 37.334 39.9998C37.334 40.4904 36.9358 40.8887 36.4451 40.8887Z"
                        fill="#7E7E7E"
                      />
                      <path
                        d="M24.8891 28.4447C23.9078 28.4447 23.1113 27.6482 23.1113 26.6669V24.8891C23.1113 23.9078 23.9078 23.1113 24.8891 23.1113C25.8704 23.1113 26.6669 23.9078 26.6669 24.8891V26.6669C26.6669 27.6482 25.8704 28.4447 24.8891 28.4447ZM39.1113 28.4447C38.1282 28.4447 37.3336 27.6482 37.3336 26.6669V24.8891C37.3336 23.9078 38.1282 23.1113 39.1113 23.1113C40.0944 23.1113 40.8891 23.9078 40.8891 24.8891V26.6669C40.8891 27.6482 40.0944 28.4447 39.1113 28.4447Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className="to-center text-center"
                  style={{ top: "70%", width: "80%" }}
                >
                  <div className="pb-3">your menu is empty</div>
                  <button
                    onClick={toAddItem}
                    className="btn bg-them w-100 text-white q-font-weight-bold"
                  >
                    add item
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
