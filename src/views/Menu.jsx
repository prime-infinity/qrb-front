import { useState } from "react";
import MenuItems from "../ui/MenuItems";
import { useNavigate } from "react-router-dom";

function Menu() {
  let navigate = useNavigate();
  const [subBut, showSubB] = useState(false);

  const showSubButtons = () => {
    showSubB(!subBut);
  };

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

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div
            className="row flex-nowrap scroll-div"
            style={{ overflowX: "scroll" }}
          >
            <div className="col-5">
              <button
                onClick={showSubButtons}
                className="btn bg-them w-100 text-white q-font-weight-bold"
              >
                drinks
                {btt}
              </button>
            </div>
            {subBut && (
              <>
                <div className="col-2">
                  <button className="btn w-100 q-font-weight-bold">
                    cofee
                  </button>
                </div>
                <div className="col-2">
                  <button className="btn w-100 q-font-weight-bold">
                    juice
                  </button>
                </div>
                <div className="col-2">
                  <button className="btn w-100 q-font-weight-bold">tea</button>
                </div>
                <div className="col-2">
                  <button className="btn w-100 q-font-weight-bold">soda</button>
                </div>
                <div className="col-2">
                  <button className="btn w-100 q-font-weight-bold">milk</button>
                </div>
              </>
            )}
            <div className="col-5">
              <button className="btn bg-them w-100 text-white q-font-weight-bold">
                main menu
                {btt}
              </button>
            </div>

            <div className="col-5">
              <button className="btn bg-them w-100 text-white q-font-weight-bold">
                lunch
                {btt}
              </button>
            </div>
          </div>

          {/** menu part */}
          <div className="row  mt-4">
            {/** the menuss */}
            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 pb-2 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>drinks</span>
              </div>
              <div className="row justify-content-center">
                {[1, 2].map((item, index) => (
                  <MenuItems
                    key={index}
                    viewMenuItem={viewMenuItem}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 pb-2 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>stews</span>
              </div>
              <div className="row justify-content-center">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <MenuItems
                    key={index}
                    viewMenuItem={viewMenuItem}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 pb-2 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>category 3</span>
              </div>
              <div className="row justify-content-center">
                {[1, 2, 3].map((item, index) => (
                  <MenuItems
                    key={index}
                    viewMenuItem={viewMenuItem}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
