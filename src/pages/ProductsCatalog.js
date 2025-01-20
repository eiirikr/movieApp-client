import { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "../context/UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
import { Notyf } from "notyf";

export default function ProductsCatalog() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const notyf = new Notyf();
    setLoading(true);
    const fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

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
        setProducts(data);
      })
      .catch((err) => {
        notyf.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  return user.isAdmin === true ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} fetchData={fetchData} loading={loading} />
  );
}
