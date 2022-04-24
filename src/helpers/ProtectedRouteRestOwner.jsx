import { Navigate } from "react-router-dom";

const ProtectedRouteRestOwner = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteRestOwner;
