import { useState } from "react";
import { deleteMenuItemBack } from "../helpers/web";
import { useSelector, useDispatch } from "react-redux";
import { setRest } from "../redux/slices/restSlice";

function WarnModal({ close, details }) {
  const dispatch = useDispatch();
  const [isRemoving, setIsRem] = useState(false);
  const [removed, setRemoved] = useState(false);
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);

  const prep = () => {
    setIsRem(true);
  };

  const success = (e) => {
    dispatch(setRest(e));
    setRemoved(true);
    setTimeout(() => {
      close();
    }, 1500);
  };

  const failed = () => {
    setIsRem(false);
  };

  const deleteMainCat = (e) => {
    prep();
    deleteMenuItemBack({ data: e, restId: rest._id }, authState.token)
      .then((res) => {
        success(res);
      })
      .catch((err) => {
        failed();
        console.log(err);
      });
  };

  const remove = (e) => {
    deleteMainCat(e);
  };

  return (
    <div
      className="custom-modal "
      style={{ height: "fit-content", border: "2px solid black" }}
    >
      <div className="container-fluid px-3">
        <div className="row py-4">
          <div className="col-12 text-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100px" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>{" "}
            <br />
            <span className="fs-18 fw-bold">caution</span>{" "}
            <div className="pt-3">
              <span className=" fs-14  text-secondary">
                do you wish to delete{" "}
                <span className="fw-bold">{details.name}</span> permanently?
              </span>
            </div>
            <div className="row justify-content-end pt-4">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    {removed ? (
                      <button
                        className="btn  btn-success btn-solid w-100 "
                        type="button"
                      >
                        removed
                      </button>
                    ) : (
                      <button
                        onClick={() => remove(details)}
                        disabled={isRemoving}
                        className="btn border btn-solid w-100 bg-white"
                      >
                        {isRemoving && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {!isRemoving && <span>proceed</span>}
                      </button>
                    )}
                  </div>
                  <div className="col-6">
                    <button
                      onClick={close}
                      className="btn btn-solid w-100 bg-them text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WarnModal;
