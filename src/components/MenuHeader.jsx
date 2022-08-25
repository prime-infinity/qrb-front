function MenuHeader() {
  return (
    <>
      <div className="row ">
        <div className="col-12">
          {!searchBar && (
            <div
              id="sticky"
              className="row mx-1 pb-3 g-0 flex-nowrap scroll-div sticky"
              style={{
                overflowX: "scroll",
                borderBottom: "1px solid black",
              }}
            >
              {" "}
              {authState && authState?._id === rest.user && (
                <div className={`pe-3`} style={{ width: "max-content" }}>
                  <button
                    onClick={toAddCat}
                    className="btn fs-14 bg-them text-white cat-button"
                  >
                    <span style={{ display: "flex" }}>
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
              {rest.categories?.length < 1 && (
                <div className="pe-3" style={{ width: "max-content" }}>
                  <button className="btn fs-14 cat-button">
                    <span className="cat-btn-txt">no categories</span>
                  </button>
                </div>
              )}
              {/* the actual buttons */}
              {rest.categories?.map(
                (cat, index) =>
                  cat.sub.length > 0 && (
                    <span
                      className={`${
                        rest.categories[rest.categories.length - 1]._id ===
                          cat._id && "mr-100"
                      } d-flex`}
                      key={cat._id}
                      style={{
                        minWidth: "min-content",
                        maxWidth: "max-content",
                      }}
                    >
                      <Link
                        to={cat.sub[0]._id + "main_menu_span"}
                        spy={true}
                        smooth={true}
                        duration={1000}
                        offset={-100}
                        onSetActive={() =>
                          scrollToMainCategory(cat._id, cat.name)
                        }
                      >
                        <div className="pe-3">
                          <button
                            ref={setRef(cat._id + "main_button_span")}
                            onClick={() =>
                              showMenuBut({
                                mId: cat._id,
                                fSubCat: cat.sub[0],
                              })
                            }
                            className="btn fs-14 bg-them text-white cat-button"
                          >
                            <span className="cat-btn-txt">{cat.name}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`cat-btn-arr ${
                                subBut === cat._id
                                  ? "rotate-icon"
                                  : "counter-rotate-icon"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </Link>
                      <div
                        id={cat._id + "main"}
                        ref={setRef(cat._id + "sub_span")}
                        className={`scroll-div ${
                          subBut === cat._id ? "d-flex" : "d-none"
                        } `}
                        style={{
                          overflowX: "scroll",
                          maxWidth: "220px",
                        }}
                      >
                        {cat.sub.map(
                          (dat, ind) =>
                            dat.menu.length > 0 && (
                              <span
                                className={` ${
                                  ind === cat.sub.length - 1 && "pe-lg"
                                } mx-2 my-auto fs-14  min-width-maxcon`}
                                key={dat._id}
                              >
                                <Link
                                  to={dat._id + "main_menu_span"}
                                  spy={true}
                                  smooth={true}
                                  duration={1000}
                                  offset={-100}
                                  onSetActive={() =>
                                    scrollToSubCategory(
                                      dat._id,
                                      dat.name,
                                      cat._id
                                    )
                                  }
                                >
                                  <span ref={setRef(dat._id + "sub_button")}>
                                    {dat.name}
                                  </span>
                                </Link>
                              </span>
                            )
                        )}
                      </div>
                    </span>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MenuHeader;
