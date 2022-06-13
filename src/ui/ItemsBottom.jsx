import CustomToggle from "../helpers/CustomToggle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from "react-bootstrap/Accordion";

function ItemsBottom({ item, place, length }) {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="row px-0 justify-content-center">
      <div
        id={place}
        className={`col-11 menu-border ${place !== length - 1 && "mb-08"}`}
      >
        <CustomToggle eventKey={item.name} item={item} />

        <div className="row">
          <div className="col-12 p-0 bottom-acc">
            <Accordion.Collapse eventKey={item.name}>
              <Slider {...settings}>
                {item &&
                  item.files.map((file, index) => (
                    <div className="slide" key={index}>
                      <div className="sl-img">
                        <img src={file} style={{ width: "100%" }} alt="" />
                      </div>
                    </div>
                  ))}

                {/*<div className="slide">
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
                </div>*/}
              </Slider>
            </Accordion.Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsBottom;
