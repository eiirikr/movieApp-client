import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data;
  return (
    <Row className="text-center mb-5 banner-container">
      <Col>
        <h1 style={{ fontSize: "64px", fontWeight: "bold" }}>{title}</h1>
        <p style={{ fontSize: "24px", fontStyle: "italic" }}>{content}</p>
        <Link to={destination}>
          <Button variant="primary">{buttonLabel}</Button>
        </Link>
      </Col>
    </Row>
  );
}
