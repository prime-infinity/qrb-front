function MenuItems({ index }) {
  return (
    <div className="col-11 border border-dark mb-3">
      <div className="row">
        <div className="col-2 ps-0">
          <img src="images/qkala.jpg" className="img-fluid" alt="" />
        </div>
        <div className="col-4 ps-0 my-auto">goolbi goo-e</div>
        <div className="col-4 text-end my-auto"></div>
        <div className="col-2 text-end my-auto">${8.49}</div>
      </div>
    </div>
  );
}

export default MenuItems;
