import { useState } from "react";
import EditRestProOne from "../components/editrestprofile/EditRestProOne";
import EditRestProTwo from "../components/editrestprofile/EditRestProTwo";

function EditResturantProfile() {
  const [actionState, setState] = useState(0);

  return (
    <div
      className="container-fluid pb-5 big-bg-theme"
      style={{ minHeight: "100vh", paddingTop: "3.5rem" }}
    >
      <div className="row pt-5">
        {/**state buttons */}
        <div className="col-12">
          <div className="row mx-2">
            <div
              onClick={() => setState(0)}
              className={`${
                actionState === 0 ? "bor-btm-black" : ""
              } col-6 text-center pb-1 border-bottom`}
            >
              <span className="fs-14 ">home page</span>
            </div>
            <div
              onClick={() => setState(1)}
              className={`${
                actionState === 1 ? "bor-btm-black" : ""
              } col-6 text-center pb-1 border-bottom`}
            >
              <span className="fs-14 ">info page</span>
            </div>
          </div>
        </div>
        {/**state buttons */}

        {actionState === 0 ? (
          <EditRestProOne />
        ) : actionState === 1 ? (
          <EditRestProTwo />
        ) : null}
      </div>
    </div>
  );
}
export default EditResturantProfile;
