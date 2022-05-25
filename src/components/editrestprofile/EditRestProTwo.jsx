import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRest } from "../../redux/slices/restSlice";
import { editRestProTwo } from "../../helpers/web";

function EditRestProTwo() {
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const authState = useSelector((state) => state.auth.auth);
  const [pending, setPending] = useState(false);
  const [error, setErrors] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [formData, setFrom] = useState({});

  useEffect(() => {
    if (rest !== null) {
      setFrom({
        id: rest._id,
        phone: rest.phone,
        email: rest.email,
        website: rest.website,
        address: rest.address,
      });
    }
  }, [rest]);

  const errorDiv = <small className="text-danger">{error}</small>;

  const handleErrors = (e) => {
    setPending(false);
    e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
  };

  const handleSuccess = (e) => {
    setIsUpdated(true);
    setPending(false);
    dispatch(setRest(e));
  };

  const update = () => {
    setPending(true);
    setErrors(null);
    editRestProTwo(formData, authState.token)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleErrors(err);
      });
  };

  return (
    <div className="col-12">
      <div className="row mx-1">
        <div className="col-12">
          <input
            value={formData.phone}
            onChange={(e) => setFrom({ ...formData, phone: e.target.value })}
            type="text"
            id="add-phone"
            placeholder={formData.phone ? formData.phone : "phone number"}
            className="my-4 fs-14 text-secondary big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.email}
            onChange={(e) => setFrom({ ...formData, email: e.target.value })}
            type="text"
            id="add-email"
            placeholder={formData.email ? formData.email : "email"}
            className="my-4 fs-14 text-secondary big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.website}
            onChange={(e) => setFrom({ ...formData, website: e.target.value })}
            type="text"
            id="add-web"
            placeholder={formData.website ? formData.website : "website"}
            className="my-4 fs-14 text-secondary big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.address}
            onChange={(e) => setFrom({ ...formData, address: e.target.value })}
            placeholder={formData.address ? formData.address : "address"}
            type="text"
            id="add-addrr"
            className="my-4 fs-14 text-secondary big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />

          <div className="row text-center">
            <div className="col-12">{error ? errorDiv : null}</div>
          </div>

          {isUpdated ? (
            <button
              className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
              type="button"
            >
              {" "}
              Updated
            </button>
          ) : (
            <button
              onClick={update}
              disabled={pending}
              className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
            >
              {pending && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {!pending && <span>update</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default EditRestProTwo;
