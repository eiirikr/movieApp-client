import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { imagesData } from "../imagesData";
import { useState } from "react";

export default function MovieCard({ movieProp, fetchData }) {
  const { _id, name, description, price } = movieProp;
  const [images] = useState(imagesData);

  return (
    <Card className="d-flex flex-column h-100">
      <Card.Img
        variant="top"
        src={images[movieProp._id] || "https://via.placeholder.com/150"}
        alt={movieProp.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center text-primary">{name}</Card.Title>
        <Card.Text className="mt-4 mb-3">{description}</Card.Text>
        <div className="mt-auto">
          <Card.Text className="mb-2 mt-3 text-warning fs-5 fw-semibold">
            ₱{price}
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        <Link className="btn btn-primary mt-auto w-100" to={`/movies/${_id}`}>
          Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
