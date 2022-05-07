function LoginFirst({ firstPending, disableButton, procedToSecond }) {
  const login = () => {
    //after login, proceed to second stage
    procedToSecond();
  };

  return (
    <>
      <div className="col-12 mt-5 mb-5">
        <button
          disabled={disableButton || firstPending}
          onClick={login}
          className="btn py-3 w-100 bg-them text-white q-font-weight-bold"
        >
          {firstPending && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {!firstPending && <span>continue</span>}
        </button>
      </div>

      <div className="col-8 offset-2 mt-5 text-center">
        <hr />
        <span>or continue with</span>

        <div className="row justify-content-center mt-5">
          <div
            className="col-2 border box-shadow"
            style={{ position: "relative" }}
          >
            <div className="">
              <img src="icons/google.png" className="to-center" alt="" />
            </div>
          </div>
          <div
            className="col-8 border fs-14 border-dark py-2 text-white"
            style={{ backgroundColor: "#4285f4" }}
          >
            Log in with Google
          </div>

          {/**facebook icon */}
          <div className="col-12 mt-4">
            <img src="icons/facebooksign.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFirst;
