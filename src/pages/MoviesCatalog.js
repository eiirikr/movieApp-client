import { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "../context/UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
import { Notyf } from "notyf";

export default function MoviesCatalog() {
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const notyf = new Notyf();
    setLoading(true);
    const fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/movies/all`
        : `${process.env.REACT_APP_API_BASE_URL}/movies/active`;

    const fetchOptions =
      user.isAdmin === true
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {};

    fetch(fetchUrl, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        notyf.error("Error fetching movies:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  return user.isAdmin === true ? (
    <AdminView moviesData={movies} fetchData={fetchData} />
  ) : (
    <UserView moviesData={movies} fetchData={fetchData} loading={loading} />
  );
}
