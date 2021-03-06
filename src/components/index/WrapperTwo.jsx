import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Wrapper() {
  const rest = useSelector((state) => state.rest.rest);
  //console.log(rest)
  let navigate = useNavigate();

  const toAbout = () => {
    navigate("/about");
  };

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
      <div className="wrapper" style={wrapImage()}>
        <div className="container-fluid wrapper-down">
          <div className="row justify-content-center justify-content-md-start wr-sec">
            <div className="col-11 col-md-6 text-white">
              <span className="h1 q-font-weight-bold">{rest.name}</span> <br />
              <br />
              <div className="row">
                <div className="col-3 q-font-weight-bold">
                  {rest?.location && stripTease(rest.location)}
                </div>
                <div className="col-1 q-font-weight-bold">|</div>
                <div className="col-4 q-font-weight-bold">{rest.year}</div>
              </div>{" "}
              <br />
              <div className="row">
                <div className="col-12">
                  <span className="fw-bold fs-14">{rest.description}</span>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6 ps-0 pe-bt">
                  <button
                    onClick={toAbout}
                    className="btn py-bt bg-them w-100 text-white fw-bold"
                  >
                    info
                  </button>
                </div>
                <div className="col-6 pe-0 ps-bt">
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
      </div>
    </>
  );
}

export default Wrapper;
