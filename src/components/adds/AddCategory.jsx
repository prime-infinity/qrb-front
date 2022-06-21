import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { addMainCateogory } from "../../helpers/web";

function AddCategory() {
  const [expand, setExpand] = useState(null);
  const [mainCat, setMainCat] = useState("");
  const [error, setErrors] = useState({ main: null, sub: null });
  const [mainCatAdded, setMainCatAdded] = useState(null);
  const [pending, setPending] = useState({ main: false, sub: false });
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);
  const errorDiv = <small className="text-danger">{error.main}</small>;

  const handleErrors = (e) => {
    setPending({ ...pending, main: false });
    e.response?.data
      ? setErrors({ ...error, main: e.response.data })
      : setErrors({ ...error, main: e.message });
  };

  const handleSuccess = (e) => {
    setMainCatAdded(true);
    setPending({ ...pending, main: false });
    setTimeout(() => {
      setMainCatAdded(false);
    }, 2000);
  };

  const addMainCat = () => {
    console.log(mainCat);
    setPending({ ...pending, main: true });
    setErrors({ ...pending, main: null });

    addMainCateogory({ name: mainCat, restid: rest._id }, authState.token);
  };

  const mainCatt = [
    { value: "drinks", label: "drinks" },
    { value: "main menu", label: "main menu" },
    { value: "lunch", label: "lunch" },
  ];

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
          >
            <div className="row">
              <div className="col-12">
                {item.title}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon  cat-icon"
                    style={{ right: "20%" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`svg-icon cat-icon ${
                      expand === item.id
                        ? "rotate-icon-90"
                        : "counter-rotate-icon"
                    } `}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => expandCat(item.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div
              className={`row mt-2 ${
                expand === item.id ? "d-block" : "d-none"
              }`}
            >
              {item.sub.map((subb, indexx) => (
                <div key={indexx} className="col-12 py-1 my-2 border">
                  {subb.title}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon  cat-icon"
                      style={{ right: "2%" }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="col-12 px-0 mt-5">
          <span className="ps-0 fw-14 fw-bold">add main category</span>
          <div className="row">
            <div className="col-12">
              <input
                type="test"
                value={mainCat}
                onChange={(e) => setMainCat(e.target.value)}
                placeholder="category name"
                className="form-control fs-14 big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">{error.main ? errorDiv : null}</div>
          </div>
          {mainCatAdded ? (
            <button
              className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
              type="button"
            >
              {" "}
              added
            </button>
          ) : (
            <button
              onClick={addMainCat}
              disabled={!mainCat || pending.main}
              className="mt-3 btn btn-solid w-100 bg-them text-white"
            >
              {pending.main && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {!pending.main && <span>add main category</span>}
            </button>
          )}
        </div>

        <div className="col-12 px-0 mt-5">
          <span className="ps-0 fw-14 fw-bold">add sub category</span>
          <div className="row">
            <div className="col-12">
              <input
                type="test"
                placeholder="sub category name"
                className="form-control mb-3 fs-14 big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <span className="fs-14 text-secondary">
                main category to insert in
              </span>
              <Select options={mainCatt} />
            </div>
          </div>
          <button className="mt-3 btn btn-solid w-100 bg-them text-white">
            add sub category
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
