import MenuItems from "../ui/MenuItems";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";
import useDynamicRefs from "use-dynamic-refs";

function Menu() {
  let navigate = useNavigate();

  const [subBut, showSubB] = useState(null);
  const [newArr, setNewArr] = useState(null);
  const [highLi, setHigLi] = useState(null);
  const [getRef, setRef] = useDynamicRefs();

  const viewMenuItem = () => {
    navigate("/view-item");
  };

  const btt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
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
  ];

  const showMenuBut = (id) => {
    subBut === id ? showSubB(null) : showSubB(id);

    setNewArr(_.groupBy(MENUITEMS, "cat.subTitle"));
    ///console.log(_.groupBy(MENUITEMS, "cat.subTitle"));
  };

  const returnMainTitle = (e) => {
    let findDeep = function(data, title) {
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

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div
            className="row flex-nowrap scroll-div"
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
                    {btt}
                  </button>
                </div>
                <div
                  className={`${subBut === cat.id ? "d-contents" : "d-none"}`}
                >
                  {cat.data.map((dat, index) => (
                    <div className="col-5" key={index}>
                      <button
                        onClick={() => highLightCat(dat.title)}
                        className="btn w-100 q-font-weight-bold"
                      >
                        {dat.title}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>

          {/** menu part */}
          <div className="row  mt-4">
            {/** the menuss */}

            {newArr && (
              <div className="col-12 mb-4">
                {Object.entries(newArr).map(([key, value]) => (
                  <div
                    key={key}
                    id={key}
                    ref={setRef(key)}
                    className={`${
                      highLi === key ? "bg-highlight" : ""
                    } row justify-content-center`}
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
