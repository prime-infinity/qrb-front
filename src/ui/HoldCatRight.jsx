function HoldCatRight() {
  return (
    <div className=" cat-right ">
      <>
        <div
          style={{ justifyContent: "space-between" }}
          className="cat-head d-flex"
        >
          {isEditn() ? (
            <input
              onChange={setName}
              value={editnMen.name}
              style={{ width: "65%" }}
              type="text"
              placeholder="name"
              autoFocus
              className="cat-name-input big-bg-theme fs-14 ps-2"
            />
          ) : (
            <h4
              onClick={strEdit}
              className="text-secondary text-decoration-underline"
              style={{ marginBottom: "5px" }}
            >
              {editnMen?.name?.length > 0 && editnMen?.isSet
                ? editnMen.name
                : "name"}
            </h4>
          )}
          {isEditn() ? (
            <input
              onChange={setPrice}
              value={editnMen.price}
              style={{ width: "25%" }}
              type="number"
              placeholder="price($)"
              className="cat-name-input big-bg-theme fs-14 ps-2"
            />
          ) : (
            <span
              onClick={strEdit}
              className="price text-secondary text-decoration-underline"
            >
              {editnMen?.price?.length > 0 && editnMen?.isSet
                ? "$" + editnMen.price
                : "$price"}
            </span>
          )}
        </div>
        {isEditn() ? (
          <textarea
            onChange={setDesc}
            value={editnMen.description}
            style={{ marginTop: "3%" }}
            type="text"
            placeholder="description"
            className="cat-name-input big-bg-theme fs-14 ps-2"
          />
        ) : (
          <p
            onClick={strEdit}
            className="text-secondary text-decoration-underline"
          >
            {editnMen?.description?.length > 0 && editnMen?.isSet
              ? editnMen.description
              : "description"}
          </p>
        )}
      </>
    </div>
  );
}
