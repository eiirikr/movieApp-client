import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Notyf } from "notyf";
import { imagesData } from "../imagesData";
import { Link } from "react-router-dom";

export default function Home() {
  const data = {
    title: "Zuitt Tech Store",
    content: "Top Tech, Right Price, Every Time.",
    destination: "/products",
    buttonLabel: "Shop Now",
  };

  const [products, setProducts] = useState([]);
  const [images] = useState(imagesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const notyf = new Notyf();
    setLoading(true);

    // Fetch products (same as before)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        notyf.error("Error fetching data");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Banner data={data} />
      <Container className="my-5">
        <h1 className="text-center mb-4">Featured Products</h1>
        <Row className="g-4">
          {products.map((product) => (
            <Col md={4} sm={6} xs={12} key={product._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={images[product._id] || "https://via.placeholder.com/150"}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong>{" "}
                    <span
                      className="text-success"
                      style={{ fontWeight: "bold" }}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                  </Card.Text>
                  <div className="d-flex justify-content-center mt-auto">
                    <Link to="/products" style={{ textDecoration: "none" }}>
                      <Button variant="primary">Order Now</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
