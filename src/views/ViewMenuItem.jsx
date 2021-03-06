import { useState } from "react";
import AddCustomiModal from "../ui/AddCustomiModal";
import Overlay from "../ui/Overlay";
function ViewMenuItem() {
  const [active, setActive] = useState(true);
  const [isAddingCusto, setIsAdd] = useState(false);

  const addCustomiz = () => {
    setIsAdd(!isAddingCusto);
  };
  return (
    <>
      {" "}
      {isAddingCusto && (
        <>
          {" "}
          <AddCustomiModal />{" "}
          <Overlay closeOverlay={addCustomiz} width={`100%`} />
        </>
      )}
      <div className="container-fluid pt-5 px-3">
        <div className="row pt-5">
          <div className="col-12">
            {/** image selection */}
            <div className="row justify-content-center">
              <div className="col-11 mb-2">
                <div
                  className="row flex-nowrap scroll-div"
                  style={{ overflowX: "scroll" }}
                >
                  <div className="col-4 text-center py-4 border border-dark">
                    <div className="my-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "40px" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="my-auto"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="col-4">
                    <img
                      src="images/qkala.jpg"
                      className="img-fluid w-100 h-100"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="images/qkala.jpg"
                      className="img-fluid w-100 h-100"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src="images/qkala.jpg"
                      className="img-fluid w-100 h-100"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                add images of videos to display the item to your customer
              </div>
            </div>
            {/** end of image selection */}

            {/**active or not */}
            <div className="row mt-4">
              <div className="col-6">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  checked={active}
                  onChange={() => setActive(true)}
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  active
                </label>{" "}
                <br />
                <div className="ps-4">item will be available on the menu</div>
              </div>
              <div className="col-6">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  checked={!active}
                  onChange={() => setActive(false)}
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  inactive
                </label>{" "}
                <br />
                <div className="ps-4">item will be hidden from the menu</div>
              </div>
            </div>
            {/** end of active or not */}

            {/** input */}
            <div className="row mt-4">
              <div className="col-12">
                <input
                  type="text"
                  placeholder="name"
                  value={"kalua pig omlet"}
                  className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
              <div className="col-12 py-5">
                <input
                  type="text"
                  value={"$8.49"}
                  placeholder="price($)"
                  className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
              <div className="col-12">
                <textarea
                  type="text"
                  value={
                    "sadfsa oasdfias fa odiasdfs sifjasdi osdjfoa sdfosj asdfs asdfs sl kdfsl dfk"
                  }
                  placeholder="description"
                  className="form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
            </div>
            {/** end of input */}

            {/** choose cate */}
            <div className="row mt-5">
              <span className="fw-bold mb-3">choose category</span>
              <div className="col-6">
                <select className="form-select border border-dark">
                  <option defaultValue={null}>main:drinks</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-6">
                <select className="form-select border border-dark">
                  <option defaultValue={null}>sub category</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            {/** end of choose cate */}

            {/** custimization */}
            <div className="row mt-5">
              <span className="fw-bold mb-3">customizations</span>
              <div className="col-12" onClick={addCustomiz}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                add customization
              </div>
            </div>
            {/** end custimization */}

            {/**delete item */}
            <div className="row mt-5">
              <div className="col-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                delete item
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewMenuItem;
