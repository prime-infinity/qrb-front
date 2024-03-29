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

  const [formData, setFrom] = useState({
    id: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    summary: "",
    hours: "",
    ig: "",
    fb: "",
    ylp: "",
  });

  useEffect(() => {
    if (rest !== null) {
      setFrom({
        id: rest._id || "",
        phone: rest.phone || "",
        email: rest.email || "",
        website: rest.website || "",
        address: rest.address || "",
        summary: rest.summary || "",
        hours: rest.hours || "",
        ig: rest.insta || "",
        fb: rest.facebook || "",
        ylp: rest.yelp || "",
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
    setTimeout(() => {
      setIsUpdated(false);
    }, 2000);
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
            placeholder={formData.phone ? formData.phone : "phone"}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.email}
            onChange={(e) => setFrom({ ...formData, email: e.target.value })}
            type="text"
            placeholder={formData.email ? formData.email : "email"}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.website}
            onChange={(e) => setFrom({ ...formData, website: e.target.value })}
            type="text"
            placeholder={formData.website ? formData.website : "website"}
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.address}
            onChange={(e) => setFrom({ ...formData, address: e.target.value })}
            placeholder={formData.address ? formData.address : "address"}
            type="text"
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.hours}
            onChange={(e) => setFrom({ ...formData, hours: e.target.value })}
            placeholder={formData.hours ? formData.hours : "hours"}
            type="text"
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.ig}
            onChange={(e) => setFrom({ ...formData, ig: e.target.value })}
            placeholder={formData.ig ? formData.ig : "instagram"}
            type="text"
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.fb}
            onChange={(e) => setFrom({ ...formData, fb: e.target.value })}
            placeholder={formData.fb ? formData.fb : "facebook"}
            type="text"
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <input
            value={formData.ylp}
            onChange={(e) => setFrom({ ...formData, ylp: e.target.value })}
            placeholder={formData.ylp ? formData.ylp : "yelp"}
            type="text"
            className="my-4 fs-14 big-bg-theme form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />
          <textarea
            rows={3}
            style={{ border: "0px", borderBottom: "1px solid black" }}
            value={formData.summary}
            onChange={(e) =>
              setFrom({ ...formData, summary: e.target.value.toLowerCase() })
            }
            className="my-4 fs-14 form-control text-center big-bg-theme"
            type="text"
            placeholder={`${
              rest?.summary
                ? rest?.summary
                : "enter short summary for your business"
            }`}
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
