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
                src="/ang/gallery004.jpg"
                alt=""
              />
            </span>
          </div>
          <div className="cat-right">
            <div className="cat-head">
              <h4 style={{ marginBottom: viewMode ? "0px" : "5px" }}>
                {item.name}
              </h4>
              <span className="price">$8.49</span>
            </div>
            {!viewMode && (
              <p>
                Viverra nisl, parturient felis vel eget adipiscing felis erat
                condimentum. Arcu ornare se parturient felis vel eget adipiscing
                felis erat condimentum.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomToggle;
