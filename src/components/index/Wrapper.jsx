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
  const wrapImage = () => {
    if (rest.welcomescreen) {
      return { backgroundImage: `url(${rest.welcomescreen})` };
    } else {
      return { backgroundColor: "#979191" };
    }
  };

  const stripTease = (e) => {
    return e.slice(0, 9).concat("...");
  };

  return (
    <>
      <video className="videoBg " autoPlay loop muted>
        <source src={`/videos/vdd.mp4`} type="video/mp4" />
      </video>
      <div className="bg-wrapper">
        <div className="row justify-content-center justify-content-md-start">
          <div className="col-11 col-md-6 text-white">
            <div className="px-3">
              <span className="q-font-weight-bold" style={{ fontSize: "32px" }}>
                {rest.name}
              </span>{" "}
              <div className="row pt-2">
                <div className="col-3 q-font-weight-bold">
                  {rest?.location && stripTease(rest.location)}
                </div>
                <div className="col-1 q-font-weight-bold">|</div>
                <div className="col-4 q-font-weight-bold">
                  {"since " + rest.year}
                </div>
              </div>{" "}
              <div className="row pt-2">
                <div className="col-12">
                  <span className="fw-bold fs-14">{rest.description}</span>
                </div>
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-6 ps-3 pe-bt">
                <button
                  onClick={toAbout}
                  className="btn py-bt bg-them w-100 text-white fw-bold"
                >
                  info
                </button>
              </div>
              <div className="col-6 pe-3 ps-bt">
                <Link to="/menu">
                  <button className="btn py-bt bg-dark w-100 bg-white fw-bold">
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
