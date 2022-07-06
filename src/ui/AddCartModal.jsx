import AddCategory from "../components/adds/AddCategory";

function AddCartModal({ close }) {
  return (
    <div
      className="custom-modal"
      style={{
        top: "5%",
        height: "80vh",
        overflowY: "scroll",
        border: "2px solid black",
      }}
    >
      <div className="container-fluid big-bg-theme px-3">
        <div className="row py-5">
          <div className="col-12">
            <AddCategory />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddCartModal;
