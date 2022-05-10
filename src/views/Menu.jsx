import MenuItems from "../ui/MenuItems";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";
import { InView } from "react-intersection-observer";
import { pbFalse, pbTrue } from "../redux/slices/menuSlice";
import { useDispatch } from "react-redux";

function Menu() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
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

  const MENUITEMS = [
    {
      name: "flavored cafe late",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored cafe late2",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored cafe late3",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "coffee",
        subId: 1,
      },
    },
    {
      name: "flavored Milk",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "flaMilk 2",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Lemonade",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Lemonade",
        subId: 6,
      },
    },
    {
      name: "Boring Tea",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Tea",
        subId: 3,
      },
    },
    {
      name: "Exciting Fries",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "More Exciting Fries",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Most Exciting Fries",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Standup Chicken",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "Chicked",
        subId: 4,
      },
    },
    {
      name: "surrendered Chicken",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "Chicked",
        subId: 4,
      },
    },
    {
      name: "Mr Crabs",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "Fried Shrimps",
        subId: 3,
      },
    },
    {
      name: "LOrd of the RIngs?",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "Onion Rings",
        subId: 2,
      },
    },
    {
      name: "LIght Snack 1",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "LIght Snack 2",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "Coke",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Coke",
        subId: 2,
      },
    },
    {
      name: "Chipanzees",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Chips",
        subId: 3,
      },
    },
    {
      name: "Chipmunks",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Chips",
        subId: 3,
      },
    },
    {
      name: "Literal Soda",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Soda",
        subId: 4,
      },
    },
    {
      name: "Fizzy Soda",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Soda",
        subId: 4,
      },
    },
    {
      name: "HollanDia Yoghurt",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Bread",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Donuts",
        subId: 1,
      },
    },
    {
      name: "Diet Coke",
      cat: {
        mainTitle: "lunch",
        mainId: 3,
        subTitle: "Coke",
        subId: 2,
      },
    },
    {
      name: "LobStery",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "Fried Shrimps",
        subId: 3,
      },
    },
    {
      name: "Literal french Fries",
      cat: {
        mainTitle: "main menu",
        mainId: 2,
        subTitle: "French Fries",
        subId: 1,
      },
    },
    {
      name: "Boring Drink one",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Tea",
        subId: 3,
      },
    },
    {
      name: "CowBell",
      cat: {
        mainTitle: "drinks",
        mainId: 1,
        subTitle: "Milk",
        subId: 5,
      },
    },
    {
      name: "Dano",
      cat: {
        mainTitle: "drinks",
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
        dispatch(pbTrue());
      } else {
        header.classList.remove("sticky");
        dispatch(pbFalse());
      }
    }
  }, [dispatch]);

  const [subBut, showSubB] = useState(null);
  const newArr = _.groupBy(MENUITEMS, "cat.subTitle");
  const [highLi, setHigLi] = useState(null);
  const [getRef, setRef] = useDynamicRefs();
  const [lock, setLock] = useState(null);
  const [viewEmp, setViewEm] = useState(false);

  /*useEffect(() => {
    console.log(newArr);
  }, []);*/

  const viewMenuItem = () => {
    navigate("/view-item");
  };

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

  /*const toAddItem = () => {
    navigate("/add-item");
  };*/

  return (
    <div className="container-fluid pt-5 big-bg-theme">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div
            className="row g-0 flex-nowrap scroll-div"
            id="sticky"
            style={{ overflowX: "scroll" }}
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
                    className="btn fs-14 bg-them text-white "
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
                  className={`${subBut === cat.id ? "d-contents" : "d-none"}`}
                >
                  {cat.data.map((dat, index) => (
                    <span
                      id={dat.title}
                      className={`mx-2 my-auto fs-14 ${
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
          <hr style={{ borderTop: "2px solid black" }} />
          {/** menu part */}
          <div className="row  mt-4">
            {/** the menuss */}

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
                      <span className="fs-13">{returnMainTitle(key)}</span>
                      <span>{chevNxt}</span>
                      <span className="fs-13">{key}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
