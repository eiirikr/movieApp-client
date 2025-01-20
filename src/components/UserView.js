import { Row, Col, Container, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function UserView({ productsData, fetchData, loading }) {
  return (
    <>
      <h1 className="text-center mt-3 mb-4">Our Products</h1>
      <Container>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading products, please wait...</p>
          </div>
        ) : productsData.length > 0 ? (
          <Row className="g-3 min-vh-75">
            {productsData.map((product) => (
              <Col key={product?._id} className="d-flex">
                <ProductCard productProp={product} fetchData={fetchData} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </Container>
    </>
  );
}
