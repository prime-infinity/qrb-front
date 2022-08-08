import CustomToggle from "../helpers/CustomToggle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from "react-bootstrap/Accordion";
import useDynamicRefs from "use-dynamic-refs";

function ItemsBottom({ item, place, length }) {
  //eslint-disable-next-line
  const [getRef, setRef] = useDynamicRefs();

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div ref={setRef(item._id)} className="row px-0 justify-content-center">
      <div className={`col-11 menu-border ${place !== length - 1 && "mb-08"}`}>
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
              </Slider>
            </Accordion.Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsBottom;
