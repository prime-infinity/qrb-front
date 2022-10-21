import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Wrapper() {
  const rest = useSelector((state) => state.rest.rest);
  //console.log(rest)
  let navigate = useNavigate();

  const toAbout = () => {
    navigate(`/${rest.url}/about`);
  };

  // eslint-disable-next-line
  const wrapImage = () => {
    if (rest.welcomescreen) {
      return { backgroundImage: `url(${rest.welcomescreen})` };
    } else {
      return { backgroundColor: "#979191" };
    }
  };

  // eslint-disable-next-line
  const stripTease = (e) => {
    return e.slice(0, 9).concat("...");
  };

  return (
    <div>
      <video className="videoBg" autoPlay loop playsInline muted>
        <source src={rest.welcomescreen} type="video/mp4" />
      </video>
      <div className="bottom-ovelay"></div>
      <div
        className="bg-wrapper"
        style={{
          backgroundColor: !rest.welcomescreen && "#979191",
          height: !rest.welcomescreen && "100vh",
          bottom: !rest.welcomescreen && "0",
          paddingTop: !rest.welcomescreen && "70vh",
        }}
      >
        <div className="row justify-content-center justify-content-md-start">
          <div className="col-11 col-md-6 text-white">
            <div className="px-3">
              <span className="sp-title" style={{ fontSize: "40px" }}>
                {rest.name}
              </span>{" "}
              <ul className="sp-details ps-0 pt-4 mb-0">
                <li>
                  <h6>{rest.location}ddd</h6>
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
                  className="btn btn-solid w-100 bg-them text-white "
                >
                  info
                </button>
              </div>
              <div className="col-6 pe-3 ps-bt">
                <Link to={`/${rest.url}/menu`}>
                  <button className="btn btn-solid w-100 bg-white">menu</button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
