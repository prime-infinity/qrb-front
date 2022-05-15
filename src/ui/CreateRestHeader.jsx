import { useSelector } from "react-redux";

function CreateRestHeader() {
  const restCreationState = useSelector(
    (state) => state.createrest.creationState
  );
  return (
    <div className="container-fluid pt-3 big-bg-theme">
      <div className="row px-2 g-0 justify-content-between">
        <div className="col-2">
          <hr
            className={`${
              restCreationState > 0 ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              restCreationState >= 2 ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              restCreationState >= 3 ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              restCreationState >= 4 ? "slings" : null
            } border border-3`}
          />
        </div>
        <div className="col-2">
          <hr
            className={`${
              restCreationState >= 5 ? "slings" : null
            } border border-3`}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateRestHeader;
