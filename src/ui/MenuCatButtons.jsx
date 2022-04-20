function MenuCatButtons({ index }) {
  return (
    <div className="col-5">
      <button className="btn bg-them w-100 text-white q-font-weight-bold">
        category {index}
      </button>
    </div>
  );
}

export default MenuCatButtons;
