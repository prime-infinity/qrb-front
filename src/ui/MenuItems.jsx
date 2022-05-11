import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext /*, useState */ } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

function MenuItems({ item }) {
  const viewMode = useSelector((state) => state.menu.view);
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function CustomToggle({ eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    //const [sldOpen, setSldOpe] = useState(null);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    /*const decoratedOnClick = useAccordionButton(eventKey, (e) => {
      console.log("sometinbg",e);
      callback && callback(eventKey);
    });*/

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
                  condimentum. Arcu ornare se parturient felis vel eget
                  adipiscing felis erat condimentum.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Accordion>
        <div className="row justify-content-center">
          <div className="col-11 menu-border mb-3">
            <CustomToggle eventKey="0" />

            <div className="row">
              <div className="col-12 p-0 bottom-acc">
                <Accordion.Collapse eventKey="0">
                  <Slider {...settings}>
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
                    <div className="slide">
                      <div className="sl-table-group">
                        <div className="sl-table-wrap">
                          <div className="sl-table-header">
                            <h4>options</h4>
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
                          <div className="sl-table-table">
                            <table className="sl-table">
                              <tbody>
                                <tr>
                                  <td>milk</td>
                                  <td>free</td>
                                </tr>
                                <tr>
                                  <td>sugar</td>
                                  <td>free</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </Accordion.Collapse>
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default MenuItems;
