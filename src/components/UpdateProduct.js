import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Notyf } from "notyf";

export default function UpdateProduct({ product, fetchData }) {
  const notyf = new Notyf();

  const [productId] = useState(product._id);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const [showUpdate, setShowUpdate] = useState(false);

  const openUpdate = () => {
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setShowUpdate(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  const updateProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success === true) {
          notyf.success("Successfully Updated");
          closeUpdate();
          fetchData();
        } else {
          notyf.error("Something went wrong");
          closeUpdate();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openUpdate()}>
        {" "}
        Update{" "}
      </Button>

      {/*Update Modal*/}
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Form onSubmit={(e) => updateProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdate}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
