function RedirModal({ close, link }) {
  const redirect = (link) => {
    window.open(`//${link}`, "_blank");
    //console.log(link);
  };
  return (
    <div
      className="custom-modal "
      style={{ height: "fit-content", border: "2px solid black" }}
    >
      <div className="container-fluid px-3">
        <div className="row py-4">
          <div className="col-12">
            <span className="fs-18 fw-bold">
              do you want to open this link?
            </span>{" "}
            <br />
            <div className="pt-3">
              <span className=" fs-14 text-decoration-underline text-secondary">
                {link}
              </span>
            </div>
            <div className="row justify-content-end pt-5">
              <div className="col-3"></div>
              <div className="col-9">
                <div className="row">
                  <div className="col-6">
                    <button
                      onClick={() => redirect(link)}
                      className="btn btn-solid w-100 bg-white"
                    >
                      yes
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={close}
                      className="btn btn-solid w-100 bg-them text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedirModal;
