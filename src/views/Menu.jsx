import MenuCatButtons from "../ui/MenuCatButtons";
import MenuItems from "../ui/MenuItems";

function Menu() {
  const btt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
  const chevNxt = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        <div className="col-12">
          {/** head button part */}
          <div
            className="row flex-nowrap scroll-div"
            style={{ overflowX: "scroll" }}
          >
            <div className="col-5">
              <button className="btn bg-them w-100 text-white q-font-weight-bold">
                drinks
                {btt}
              </button>
            </div>
            <div className="col-5">
              <button className="btn bg-them w-100 text-white q-font-weight-bold">
                stews
                {btt}
              </button>
            </div>

            {[1, 2, 3, 4].map((index) => (
              <MenuCatButtons key={index} index={index} />
            ))}
          </div>

          {/** menu part */}
          <div className="row  mt-4">
            {/** the menuss */}
            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>drinks</span>
              </div>
              <div className="row justify-content-center">
                <div className="col-11 border border-dark mb-3">
                  <div className="row">
                    <div className="col-2 ps-0">
                      <img
                        src="images/qbacon.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-4 ps-0 my-auto">kalbi tang</div>
                    <div className="col-4 text-end my-auto">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon me-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>sold out</span>
                    </div>
                    <div className="col-2 text-end my-auto">${8.49}</div>
                  </div>
                </div>

                <div className="col-11 border border-dark">
                  <div className="row">
                    <div className="col-2 ps-0">
                      <img
                        src="images/qkala.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-4 ps-0 my-auto">goolbi goo-e</div>
                    <div className="col-4 text-end my-auto"></div>
                    <div className="col-2 text-end my-auto">${8.49}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>stews</span>
              </div>
              <div className="row justify-content-center">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <MenuItems key={index} index={index} />
                ))}
              </div>
            </div>

            <div className="col-12 mb-4">
              {/** the category */}
              <div className="col-6 ps-1 text-start">
                <span>menu</span>
                <span>{chevNxt}</span>
                <span>category 3</span>
              </div>
              <div className="row justify-content-center">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <MenuItems key={index} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
