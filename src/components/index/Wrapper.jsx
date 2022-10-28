import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

  const [ani, setAni] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAni(true);
    }, 10);
  }, []);

  return (
    <div>
      {rest?.welcomescreen?.type === 1 && (
        <video className="videoBg" autoPlay loop playsInline muted>
          <source src={rest.welcomescreen.source} type="video/mp4" />
        </video>
      )}
      {rest?.welcomescreen?.type === 0 && (
        <img
          style={{
            height: true && "100vh",
            top: true && "0",
            transform: ani ? "scale(1)" : "scale(1.5)",
          }}
          className="videoBg d-ani-5"
          src={rest.welcomescreen.source}
          alt=""
        />
      )}
      {rest?.welcomescreen?.type === 2 && (
        <div
          style={{
            height: true && "100vh",
            top: true && "0",
            transform: ani ? "scale(1)" : "scale(1.5)",
            backgroundColor: rest.welcomescreen.source,
          }}
          className="videoBg d-ani-5"
        />
      )}
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
