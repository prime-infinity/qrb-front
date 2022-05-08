import "animate.css";
function PureOverlay({ closeOverlay, width, redrng }) {
  return (
    <div
      className={`${
        redrng
          ? "animate__animated animate__slideInUp"
          : "animate__animated animate__slideOutDown"
      } overlay`}
      style={{ width: width, left: "0" }}
      onClick={closeOverlay}
    ></div>
  );
}

export default PureOverlay;
