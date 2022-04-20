function Overlay({ closeOverlay, width }) {
  return (
    <div
      className="overlay"
      style={{ width: width }}
      onClick={closeOverlay}
    ></div>
  );
}

export default Overlay;
