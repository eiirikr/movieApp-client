import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserOrderHistory({ orders, products }) {
  // Sort orders by the most recent order (descending order of `orderedOn`)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderedOn) - new Date(a.orderedOn)
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Order History</h1>
      {sortedOrders.map((order, index) => (
        <Table bordered hover responsive key={order._id}>
          <thead>
            <tr>
              <th
                style={{ borderRight: "none" }}
                className="text-white bg-dark"
              >
                Order#{index + 1} - Purchased on{" "}
                {new Date(order.orderedOn).toLocaleDateString()}
              </th>
              <th
                style={{ borderLeft: "none", textAlign: "right" }}
                className="text-white bg-dark"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Render the products for this order */}
              <td colSpan="2">
                <ul className="list-unstyled">
                  {order.productsOrdered.map((product) => (
                    <li key={product.productId} className="no">
                      <strong>
                        {products[product.productId] || "Loading..."}
                      </strong>
                      <br />
                      <p className="text-primary">
                        Quantity: {product.quantity}
                        <br />
                        Subtotal: ${product.subtotal.toFixed(2)}
                      </p>
                      <hr />
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ borderRight: "none" }} className="bg-secondary"></td>
              <td
                style={{
                  borderLeft: "none",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#a2ff90",
                }}
                className="bg-secondary fs-5"
              >
                ${order.totalPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>
      ))}
    </div>
  );
}
