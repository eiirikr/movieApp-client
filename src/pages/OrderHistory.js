import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import UserOrderHistory from "../components/UserOrderHistory";
import AdminOrderHistory from "../components/AdminOrderHistory";

const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      const endpoint = user.isAdmin
        ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`
        : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setOrdersLoading(false); // Done fetching orders
      }
    };

    fetchOrders();
  }, [user]);

  // Fetch Product Names
  useEffect(() => {
    const fetchProductNames = async () => {
      const productMap = {};

      for (let order of orders) {
        for (let item of order.productsOrdered) {
          const productId = item.productId;
          if (!productMap[productId]) {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
              );
              if (response.ok) {
                const productData = await response.json();
                productMap[productId] = productData.name;
              }
            } catch (error) {
              console.error(
                `Error fetching product name for ${productId}:`,
                error
              );
            }
          }
        }
      }

      setProducts(productMap);
      setProductsLoading(false); // Done fetching product names
    };

    if (orders.length > 0) {
      fetchProductNames();
    }
  }, [orders]);

  if (ordersLoading || productsLoading) {
    return <p>Loading your orders...</p>;
  }

  if (!orders || orders.length === 0) {
    return <p>Almost there...</p>;
  }

  return user.isAdmin ? (
    <AdminOrderHistory
      orders={orders}
      products={products}
      isLoading={ordersLoading || productsLoading}
    />
  ) : (
    <UserOrderHistory orders={orders} products={products} />
  );
};

export default OrderHistory;
