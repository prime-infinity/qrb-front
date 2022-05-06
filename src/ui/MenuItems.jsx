//import MenuItemSlide from "../ui/MenuItemSlide";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenuItems({ item }) {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function CustomToggle({ eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <div className={`row `} onClick={decoratedOnClick}>
        <>
          <div className={`${isCurrentEventKey ? "yes" : "no"} col-4 ps-0`}>
            <img src="images/qbacon.jpg" className="img-fluid w-100" alt="" />
          </div>
          <div className="col-8 my-auto">
            <div className="row">
              <div className="col-9 ps-0 pb-1 pt-2">
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
      </div>
    );
  }

  return (
    <>
      <Accordion>
        <div className="row justify-content-center">
          <div className="col-11 menu-border mb-3">
            <CustomToggle eventKey="0" />

            <Accordion.Collapse eventKey="0">
              <div className={``}>
                <Slider {...settings} className="bg-secondary">
                  <div className="slide">
                    <div className="sl-table-group">
                      <div className="sl-table-wrap">
                        <div className="sl-table-header">
                          <h4>milk options</h4>
                        </div>
                        <div className="sl-table-table">
                          <table className="sl-table">
                            <tbody>
                              <tr>
                                <td>regular milk</td>
                                <td>free</td>
                              </tr>
                              <tr>
                                <td>coconut milk</td>
                                <td>free</td>
                              </tr>
                              <tr>
                                <td>soy milk</td>
                                <td>+$1</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="sl-table-wrap">
                        <div className="sl-table-header">
                          <h4>extras options</h4>
                        </div>
                        <div className="sl-table-table">
                          <table className="sl-table">
                            <tr>
                              <td>milk</td>
                              <td>free</td>
                            </tr>
                            <tr>
                              <td>sugar</td>
                              <td>free</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide">
                    <div className="sl-img">
                      <img
                        src="/ang/gallery001.jpg"
                        style={{ width: "100%" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="slide">
                    <div className="sl-img">
                      <img
                        src="/ang/gallery002.jpg"
                        style={{ width: "100%" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="slide">
                    <div className="sl-img">
                      <img
                        src="/ang/gallery003.jpg"
                        style={{ width: "100%" }}
                        alt=""
                      />
                    </div>
                  </div>
                </Slider>
              </div>
            </Accordion.Collapse>
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default MenuItems;
