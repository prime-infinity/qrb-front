import MenuItemSlide from "../ui/MenuItemSlide";
import { useState } from "react";

function MenuItems({ item, viewMenuItem }) {
  const [viewing, setIsview] = useState(false);

  const expandMenu = () => {
    setIsview(!viewing);
  };

  return (
    <div className="col-11 menu-border mb-3">
      <div className={`row ${viewing && "pt-2"}`}>
        {!viewing && (
          <>
            <div className="col-4 ps-0" onClick={viewMenuItem}>
              <img src="images/qbacon.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-8 my-auto" onClick={expandMenu}>
              <div className="row">
                <div className="col-9 ps-0 pb-1">
                  <span className="menu-name">{item.name}</span>
                </div>
                <div className="col-3">
                  <span className="fs-14 text-secondary">${8.49}</span>
                </div>
                <div className="col-12 ps-0">
                  <span
                    className="fs-14 text-secondary"
                    style={{ verticalAlign: "text-top" }}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </span>
                </div>
                <div className="col-12 text-end">
                  <span className="pe-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="fs-14">sold out</span>
                </div>
              </div>
            </div>
          </>
        )}
        {viewing && (
          <>
            <div className="col-12" onClick={expandMenu}>
              <div className="row">
                <div className="col-9">
                  <span className="h6 fw-bold">flavored cafe late</span>
                </div>
                <div className="col-3 text-end">
                  <span>${8.49}</span>
                </div>
                <div className="col-12 pb-3">
                  <span style={{ verticalAlign: "text-top" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>
            </div>
            {/**carousel */}
            <div className="col-12 border border-dark border-bottom-0 px-0">
              <MenuItemSlide />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuItems;
