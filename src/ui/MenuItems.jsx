import MenuItemSlide from "../ui/MenuItemSlide";
import { useState } from "react";

function MenuItems({ index, viewMenuItem }) {
  const [viewing, setIsview] = useState(false);

  const expandMenu = () => {
    setIsview(!viewing);
  };

  return (
    <div className="col-11 border border-dark mb-3">
      <div className={`row ${viewing && "pt-2"}`}>
        {!viewing && (
          <>
            <div className="col-4 ps-0" onClick={viewMenuItem}>
              <img src="images/qbacon.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-8 my-auto" onClick={expandMenu}>
              <div className="row">
                <div className="col-9 ps-0">
                  <span className="h6 fw-bold">flavored cafe late</span>
                </div>
                <div className="col-3">
                  <span>${8.49}</span>
                </div>
                <div className="col-12 ps-0">
                  <span style={{ verticalAlign: "text-top" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </span>
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
