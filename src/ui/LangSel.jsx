import IndiLangsSel from "./IndivLangsSel";

function LangSel() {
  return (
    <div
      className="custom-modal big-bg-theme"
      style={{
        top: "15%",
        height: "60vh",
        width: "60%",
        left: "20%",
        overflowY: "scroll",
        border: "3px solid black",
      }}
    >
      <div className="container-fluid  px-3">
        <div className="row py-5">
          <div className="col-12">
            <div className="row">
              {/** indi */}
              <IndiLangsSel lang={"english"} />
              <IndiLangsSel lang={"japanese"} />
              {/** end of indi */}
            </div>

            <div className="addBtnLang py-2 text-center">
              <button className="btn " style={{ color: "white" }}>
                <span className="fw-bold fs-16">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LangSel;
