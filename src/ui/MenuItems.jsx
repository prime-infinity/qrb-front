function MenuItems({ index }) {
  return (
    <div className="col-11 border border-dark mb-3">
      <div className="row">
        <div className="col-4 ps-0">
          <img src="images/qbacon.jpg" className="img-fluid w-100" alt="" />
        </div>
        <div className="col-8 my-auto">
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
      </div>
    </div>
  );
}

export default MenuItems;
