import Carousel from "react-bootstrap/Carousel";

function MenuItemSlide() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/qbacon.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Nesciunt, veritatis.
              </p>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default MenuItemSlide;
