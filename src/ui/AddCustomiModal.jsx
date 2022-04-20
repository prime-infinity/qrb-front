function AddCustomiModal() {
  return (
    <div className="custom-modal border border-dark">
      <div className="container-fluid px-3">
        <div className="row py-3">
          <div className="col-12">
            <span className="fw-bold mb-3">customizations</span>
          </div>
          <div className="col-12 mt-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="add new"
                className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
              />
              <div
                className="input-group-prepend"
                style={{ position: "relative" }}
              >
                <div
                  className="input-group-text pe-0 border-0 bg-white"
                  style={{ position: "absolute", right: "0" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "20px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 mb-2">
            <span className="">saved customizations</span>
          </div>
          {/**saved customi */}
          <div className="col-12">
            <div className="row">
              {/**one cusomiztion */}
              <div className="col-12 border-bottom pb-2 mb-3">
                <div className="row">
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div className="col-6">quantity</div>
                  <div className="col-3"></div>
                  <div className="col-2 text-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-12 border-bottom pb-2 mb-3">
                <div className="row">
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div className="col-6">sause options</div>
                  <div className="col-3"></div>
                  <div className="col-2 text-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-12 border-bottom pb-2 mb-3">
                <div className="row">
                  <div className="col-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div className="col-6">milk option</div>
                  <div className="col-3"></div>
                  <div className="col-2 text-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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

export default AddCustomiModal;
