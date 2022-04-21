import { useLocation } from "react-router-dom";

function CreateRestHeader() {
  const location = useLocation();
  return (
    <div className="container-fluid pt-3">
      <div className="row g-0 justify-content-between">
        <div className="col-2">
          <hr
            className={`${
              location.pathname === "/create-resturant/name" ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              location.pathname === "/create-resturant/location"
                ? "slings"
                : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              location.pathname === "/create-resturant/year" ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              location.pathname === "/create-resturant/description"
                ? "slings"
                : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              location.pathname === "/create-resturant/welcome"
                ? "slings"
                : null
            } border border-3`}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateRestHeader;
