import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Wrapper() {
  const rest = useSelector((state) => state.rest.rest);
  //console.log(rest)
  let navigate = useNavigate();

  const toAbout = () => {
    //navigate(`${rest.name}/about`);
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
    <>
      <video className="videoBg" autoPlay loop playsInline muted>
        <source src={`/videos/vdd.mp4`} type="video/mp4" />
      </video>
      <div className="bg-wrapper">
        <div className="row justify-content-center justify-content-md-start">
          <div className="col-11 col-md-6 text-white">
            <div className="px-3">
              <span className="sp-title" style={{ fontSize: "40px" }}>
                {/*rest.name*/ "yogurstory"}
              </span>{" "}
              <ul className="sp-details ps-0 pt-4 mb-0">
                <li>
                  <h6>honolulu</h6>
                </li>
                <li>
                  <h6>since 2010</h6>
                </li>
              </ul>
              {/*<div className="row pt-2">
                <div className="col-3 ">
                  {rest?.location && stripTease(rest.location)}
                </div>
                <div className="col-1 ">|</div>
                <div className="col-4 ">{"since " + rest.year}</div>
              </div>{" "}*/}
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
                <Link to={`/${rest.name}/menu`}>
                  <button className="btn btn-solid w-100 bg-white">menu</button>{" "}
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
