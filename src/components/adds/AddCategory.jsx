import { useState } from "react";

function AddCategory() {
  const [expand, setExpand] = useState(null);

  const items = [
    {
      id: 1,
      title: "drinks",
      sub: [
        {
          id: 1,
          title: "coffee",
        },
        {
          id: 2,
          title: "juice",
        },
        {
          id: 3,
          title: "tea",
        },
      ],
    },
    {
      id: 2,
      title: "main menu",
      sub: [
        { id: 1, title: "french fries" },
        { id: 2, title: "onion rings" },
        { id: 3, title: "fried shirmps" },
      ],
    },
    {
      id: 3,
      title: "lunch",
      sub: [
        { id: 1, title: "donuts" },
        { id: 2, title: "coke" },
        { id: 3, title: "chips" },
      ],
    },
  ];

  const expandCat = (id) => {
    expand === id ? setExpand(null) : setExpand(id);
  };

  return (
    <div className="col-12">
      <div className="row justify-content-center pt-3">
        <span className="ps-0 fw-14 fw-bold">all categories</span>
        {items.map((item, index) => (
          <div
            className="col-12 pos-rel border border-dark br-4 my-2 py-2 fs-14"
            key={index}
            onClick={() => expandCat(item.id)}
          >
            {item.title}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon cat-icon ${
                  expand === item.id ? "rotate-icon-90" : "counter-rotate-icon"
                } `}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCategory;
