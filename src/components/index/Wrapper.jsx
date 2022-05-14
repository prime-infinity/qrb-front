import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Wrapper() {
  const rest = useSelector((state) => state.rest.rest);
  //console.log(rest)
  let navigate = useNavigate();

  const toAbout = () => {
    navigate("/about");
  };

  // eslint-disable-next-line
  const stripTease = (e) => {
    return e.slice(0, 9).concat("...");
  };

  return (
    <>
      <video className="videoBg " autoPlay playsInline loop muted>
        <source src={`/videos/vdd.mp4`} type="video/mp4" />
      </video>
      <div className="bg-wrapper">
        <div className="row justify-content-center justify-content-md-start">
          <div className="col-11 col-md-6 text-white">
            <div className="px-3">
              <span className="sp-title" style={{ fontSize: "40px" }}>
                {rest.name}
              </span>{" "}
              <ul className="sp-details ps-0 pt-3 mb-0">
                <li>
                  <h6>{rest.location}</h6>
                </li>
                <li>
                  <h6>{rest.year}</h6>
                </li>
              </ul>
              <div className="row">
                <div className="col-12">
                  <span className="fs-14" style={{ fontWeight: "500" }}>
                    {rest.description}
                  </span>
                </div>
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-6 ps-3 pe-bt">
                <button
                  onClick={toAbout}
                  className="btn btn-solid w-100 bg-them text-white fw-bold"
                >
                  info
                </button>
              </div>
              <div className="col-6 pe-3 ps-bt">
                <Link to="/menu">
                  <button className="btn btn-solid w-100 bg-white fw-bold">
                    menu
                  </button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wrapper;
