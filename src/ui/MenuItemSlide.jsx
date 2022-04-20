import Carousel from "react-bootstrap/Carousel";

function MenuItemSlide() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/qbacon.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <div className="container-fluid pt-3 pb-2">
          <div className="row pb-5 mb-5">
            <div className="col-12">
              <span className="fw-bold ">milk options</span>
              <div className="row ps-2 pt-2">
                <div className="col-10">regular milk</div>
                <div className="col-2 pb-2">free</div>
                <div className="col-10">coconut milk</div>
                <div className="col-2 pb-2">free</div>
                <div className="col-10">soy milk</div>
                <div className="col-2 pb-2 mb-4">+$1</div>
              </div>

              <span className="fw-bold">extras</span>
              <div className="row ps-2">
                <div className="col-10"> milk</div>
                <div className="col-2 pb-2">free</div>
                <div className="col-10">sugar </div>
                <div className="col-2 pb-2">free</div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default MenuItemSlide;
