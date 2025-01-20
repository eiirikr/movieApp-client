import { useContext } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="custom-navbar navbar">
      <Container>
        <Navbar.Brand>Zuitt Tech Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to="/products" exact="true">
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to="/addProduct" exact="true">
                    Add Product
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/products" exact="true">
                    Products
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" exact="true">
                    Cart
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/order-history" exact="true">
                    All Orders
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">
                  Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
