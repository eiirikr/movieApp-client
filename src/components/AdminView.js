import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import UpdateProduct from "./UpdateProduct";
import ArchiveProduct from "./ArchiveProduct";
import { useNavigate } from "react-router-dom";

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
          <td>
            <UpdateProduct product={product} fetchData={fetchData} />{" "}
            <ArchiveProduct
              product={product}
              isActive={product.isActive}
              fetchData={fetchData}
            />
          </td>
        </tr>
      );
    });

    setProducts(productsArr);
  }, [productsData, fetchData]);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-center my-4"> Admin Dashboard</h1>
      <div className="d-flex justify-content-center my-3 gap-1">
        <Button variant="primary" onClick={() => navigate("/addProduct")}>
          Add New Product
        </Button>
        <Button variant="success" onClick={() => navigate("/order-history")}>
          Show User Orders
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center bg-dark text-white">
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{products}</tbody>
      </Table>
    </>
  );
}
