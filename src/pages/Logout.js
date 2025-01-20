import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);

  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [setUser]);

  return <Navigate to="/" />;
}
