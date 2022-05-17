import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext } from "react";
import { useSelector } from "react-redux";

function CustomToggle({ eventKey, callback, item }) {
  const viewMode = useSelector((state) => state.menu.view);

  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div
      className={`row border-left-right`}
      onClick={() => decoratedOnClick(item.name)}
    >
      <div className="m-cat ps-0 pe-0">
        <div className="m-cat-head">
          <div
            id={item.name}
            className={` ${viewMode && "cat-left-view"} ${isCurrentEventKey &&
              "max-w-zero "} cat-left`}
          >
            <span className="cat-icon">
              <img
                style={{ objectFit: viewMode ? "fill" : "cover" }}
                src={item.files[0]}
                alt=""
              />
            </span>
          </div>
          <div className="cat-right">
            <div className="cat-head">
              <h4 style={{ marginBottom: viewMode ? "0px" : "5px" }}>
                {item.name}
              </h4>
              <span className="price">${item.price}</span>
            </div>
            {!viewMode && (
              <p>
               {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomToggle;
