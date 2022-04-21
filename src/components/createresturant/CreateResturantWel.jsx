import { useState } from "react";
import DoneCreatRest from "../../ui/DoneCreatRest";

function CreateResturantWel() {
  const [done, setDone] = useState(false);

  const next = () => {
    setDone(true);
  };
  return done ? (
    <DoneCreatRest />
  ) : (
    <div className="container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-10">
          <span className="fw-bold h2">welcome screen</span>

          <div className="row">
            <div
              className="col-6 offset-3 text-center border my-5"
              style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  style={{ width: "30px" }}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </div>
          </div>

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
            the content you upload here will be shown on your profile page.you
            can add photos of the fool or ambience.
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateResturantWel;
