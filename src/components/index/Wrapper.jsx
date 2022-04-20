import { Link, useNavigate } from "react-router-dom";

function Wrapper() {
  let navigate = useNavigate();

  const toAbout = () => {
    navigate("/about");
  };

  return (
    <>
      <div className="wrapper">
        <div className="container-fluid wrapper-down">
          <div className="row justify-content-center justify-content-md-start wr-sec">
            <div className="col-11 col-md-6 text-white">
              <span className="h1 q-font-weight-bold">yogurstory</span> <br />
              <br />
              <span className="q-font-weight-bold">
                local’s favorite brunch restaurant
              </span>{" "}
              <br />
              <br />
              <div className="row">
                <div className="col-3 q-font-weight-bold">honolulu</div>
                <div className="col-1 q-font-weight-bold">|</div>
                <div className="col-4 q-font-weight-bold">since 2014</div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={toAbout}
                    className="btn py-3 bg-them w-100 text-white q-font-weight-bold"
                  >
                    info
                  </button>
                </div>
                <div className="col-6">
                  <Link to="/menu">
                    <button className="btn py-3 bg-dark w-100 bg-white q-font-weight-bold">
                      menu
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wrapper;
