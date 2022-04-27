import { useState } from "react";
import EditRestProOne from "../components/editrestprofile/EditRestProOne";
import EditRestProTwo from "../components/editrestprofile/EditRestProTwo";
import EditRestProThr from "../components/editrestprofile/EditRestProThr";

function EditResturantProfile() {
  const [actionState, setState] = useState(0);

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        {/**state buttons */}
        <div className="col-12">
          <div className="row mx-2">
            <div
              onClick={() => setState(0)}
              className={`${
                actionState === 0 ? "bor-btm-black" : ""
              } col-4 text-center pb-1 border-bottom`}
            >
              <span>active</span>
            </div>
            <div
              onClick={() => setState(1)}
              className={`${
                actionState === 1 ? "bor-btm-black" : ""
              } col-4 text-center pb-1 border-bottom`}
            >
              <span>inactive</span>
            </div>
            <div
              onClick={() => setState(2)}
              className={`${
                actionState === 2 ? "bor-btm-black" : ""
              } col-4 text-center pb-1 border-bottom`}
            >
              <span>deleted</span>
            </div>
          </div>
        </div>
        {/**state buttons */}

        {actionState === 0 ? (
          <EditRestProOne />
        ) : actionState === 1 ? (
          <EditRestProTwo />
        ) : actionState === 2 ? (
          <EditRestProThr />
        ) : null}
      </div>
    </div>
  );
}
export default EditResturantProfile;
