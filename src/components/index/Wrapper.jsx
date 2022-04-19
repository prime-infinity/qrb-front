import { useNavigate } from "react-router-dom";

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
              <span className="h1 font-weight-bold">Yogurstory</span> <br />
              <br />
              <span>local’s favorite brunch restaurant</span> <br />
              <br />
              <div className="row">
                <div className="col-3">honolulu</div>
                <div className="col-1">|</div>
                <div className="col-4">since 2014</div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={toAbout}
                    className="btn py-3 bg-them w-100 text-white"
                  >
                    info
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn py-3 bg-dark w-100 bg-white">
                    menu
                  </button>
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
