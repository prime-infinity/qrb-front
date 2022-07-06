import AddCategory from "../components/adds/AddCategory";

function AddCartModal({ close }) {
  return (
    <div
      className="custom-modal"
      style={{ top: "5%", height: "fit-content", border: "2px solid black" }}
    >
      <div className="container-fluid big-bg-theme px-3">
        <div className="row py-5">
          <AddCategory />
        </div>
      </div>
    </div>
  );
}
export default AddCartModal;
