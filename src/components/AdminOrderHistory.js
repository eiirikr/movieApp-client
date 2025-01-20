import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrderHistory({ orders, products, isLoading }) {
  // Group orders by user
  const users = [...new Set(orders.map((order) => order.userId))];

  // Sort users by the most recent order date
  const sortedUsers = users.sort((a, b) => {
    const latestOrderA = Math.max(
      ...orders
        .filter((order) => order.userId === a)
        .map((order) => new Date(order.orderedOn).getTime())
    );
    const latestOrderB = Math.max(
      ...orders
        .filter((order) => order.userId === b)
        .map((order) => new Date(order.orderedOn).getTime())
    );
    return latestOrderB - latestOrderA;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center">Order History</h1>
      {sortedUsers.map((userId) => {
        // Filter orders for the current user
        const userOrders = orders.filter((order) => order.userId === userId);

        // Sort orders for the user by the most recent order
        const sortedUserOrders = userOrders.sort(
          (a, b) => new Date(b.orderedOn) - new Date(a.orderedOn)
        );

        return (
          <div key={userId} className="mt-5">
            <h3>User: {userId}</h3>
            {sortedUserOrders.map((order, index) => (
              <Table striped bordered hover responsive key={order._id}>
                <thead>
                  <tr className="text-white bg-dark">
                    <th colSpan="2">Order #{index + 1}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Purchased On:</strong>
                    </td>
                    <td>{new Date(order.orderedOn).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total:</strong>
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6>Products Ordered:</h6>
                      <ul className="list-unstyled">
                        {order.productsOrdered.map((product) => (
                          <li key={product.productId}>
                            <strong>Product Name:</strong>{" "}
                            {isLoading
                              ? "Loading..."
                              : products.hasOwnProperty(product.productId)
                              ? products[product.productId]
                              : "Product not found"}
                            <div>
                              <strong>Quantity:</strong> {product.quantity}
                            </div>
                            <div>
                              <strong>Subtotal:</strong> $
                              {product.subtotal.toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </div>
        );
      })}
    </div>
  );
}
