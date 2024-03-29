function IndiLangsSel({ lang }) {
  return (
    <div className="co1-11 pb-2">
      <div className="row">
        <div className="col-2">
          {lang === "english" ? (
            <img src="icons/eng.png" alt="" />
          ) : (
            <img src="icons/jap.png" alt="" />
          )}
        </div>
        <div className="col-5">
          <span className="fs-12">{lang}</span>
        </div>
        <div className="col-3 offset-2 text-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "18px", verticalAlign: "sub" }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default IndiLangsSel;
