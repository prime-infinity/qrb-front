function LoginFirst({ firstPending, disableButton, procedToSecond }) {
  const login = () => {
    //after login, proceed to second stage
    procedToSecond();
  };

  return (
    <>
      <div className="col-12 mt-4 mb-5">
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
    </>
  );
}

export default LoginFirst;
