import { useSelector } from "react-redux";
import "animate.css";

function Overlay({ closeOverlay, width }) {
  const mMenu = useSelector((state) => state.menu.menu);
  const menuFade = useSelector((state) => state.menu.menuFade);
  return (
    <div
      className={`${
        mMenu
          ? "animate__animated animate__fadeIn"
          : "animate__animated animate__fadeOut"
      } overlay`}
      style={{
        width: width,
        zIndex: "2",
        display: menuFade ? "block" : "none",
      }}
      onClick={closeOverlay}
    ></div>
  );
}

export default Overlay;
