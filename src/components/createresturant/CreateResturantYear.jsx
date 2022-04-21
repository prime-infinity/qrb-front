import { useNavigate } from "react-router-dom";
function CreateResturantYear() {
  let navigate = useNavigate();
  const next = () => {
    navigate("/create-resturant/description");
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-10">
          <span className="fw-bold h2">established since</span>
          <input
            type="text"
            placeholder="year"
            className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />

          <button
            onClick={next}
            className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantYear;
