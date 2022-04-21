import { useNavigate } from "react-router-dom";
function CreateResturantDesc() {
  let navigate = useNavigate();
  const next = () => {
    navigate("/create-resturant/welcome");
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-10">
          <span className="fw-bold h2">brief definition</span>
          <input
            type="text"
            placeholder="e.g something"
            className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
          />

          <button
            onClick={next}
            className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
          >
            next
          </button>

          <button
            onClick={next}
            className="btn py-3 my-3 w-100 text-decoration-underline q-font-weight-bold"
          >
            skip
          </button>
        </div>
        <div className="col-11" style={{ position: "absolute", bottom: "3%" }}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon me-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span>
            provide a short description about your business, what you do, what
            you are known for
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantDesc;
