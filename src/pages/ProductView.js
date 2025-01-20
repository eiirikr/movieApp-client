import { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";
import { Link } from "react-router-dom";

export default function ProductView() {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  function addToCart() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        subtotal: price * quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Item added to cart successfully") {
          notyf.success("Added to Cart.");
        } else if (data.message === "Cart updated successfully") {
          notyf.success("Item added to cart successfully");
        } else {
          notyf.error("Internal Server Error.");
        }
      });
  }

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  return (
    <>
      <Container className="mt-5 mx-auto" style={{ width: "700px" }}>
        <Row>
          <Col>
            <Card>
              <CardHeader className="text-white bg-dark text-center fs-5">
                {name}
              </CardHeader>
              <Card.Body>
                <Card.Text>{description}</Card.Text>
                <Card.Text>
                  <span>Price:</span>{" "}
                  <span className="text-warning fs-5 fw-semibold">
                    ₱{price}
                  </span>
                </Card.Text>
                <InputGroup className="mt-4 mb-2" style={{ width: "120px" }}>
                  <Button className="btn-dark" onClick={decreaseQuantity}>
                    -
                  </Button>
                  <FormControl value={quantity} readOnly />
                  <Button className="btn-dark" onClick={increaseQuantity}>
                    +
                  </Button>
                </InputGroup>
              </Card.Body>
              <CardFooter className="bg-gray d-flex justify-content-between">
                {user.id !== null ? (
                  <Button
                    variant="primary"
                    block="true"
                    onClick={() => addToCart()}
                    style={{ width: "120px" }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Link className="btn btn-danger btn-block w-auto" to="/login">
                    Log in to Add
                  </Link>
                )}
                <Button
                  variant="primary"
                  onClick={() => navigate("/cart")}
                  style={{ width: "120px" }}
                >
                  View Cart
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <p className="text-center fw-semibold fs-6 mt-3">
        <Link to="/products" className="text-primary">
          Back to Catalog
        </Link>
      </p>
    </>
  );
}
