function LoginFirst({ procedToSecond }) {
  const login = () => {
    //after login, proceed to second stage
    procedToSecond();
  };

  return (
    <>
      <div className="col-12 mt-5 mb-5">
        <button
          onClick={login}
          className="btn py-3 w-100 bg-them text-white q-font-weight-bold"
        >
          continue
        </button>
      </div>

      <div className="col-8 offset-2 mt-5 text-center">
        <hr />
        <span>or continue with</span>

        <div className="row justify-content-center mt-5">
          <div className="col-2 border border-dark py-2">G</div>
          <div
            className="col-8 border border-dark py-2 text-white fw-bold"
            style={{ backgroundColor: "#5290f4" }}
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
