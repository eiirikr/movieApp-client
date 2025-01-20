import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

const Cart = () => {
  const [cart, setCart] = useState({
    cartItems: [],
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const notyf = new Notyf();
  const navigate = useNavigate();

  // Function to fetch product details
  const fetchProductName = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
      );
      const data = await response.json();
      if (data && data.name) {
        return data.name;
      }
      return "Product  Name not Found";
    } catch (error) {
      console.error(`Error fetching product name for ID ${productId}:`, error);
      return "Product Name not Found";
    }
  };

  // Fetch cart data and enrich it with product names
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (data.cart && data.cart.cartItems) {
          // Enrich cart items with product names
          const enrichedCartItems = await Promise.all(
            data.cart.cartItems.map(async (item) => {
              const productName = await fetchProductName(item.productId);
              return { ...item, productName };
            })
          );

          setCart({ ...data.cart, cartItems: enrichedCartItems });
        } else {
          setCart({ cartItems: [], totalPrice: 0 });
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([{ cartItems: [], totalPrice: 0 }]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId, newQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.updatedCart) {
          const updatedCartItems = data.updatedCart.cartItems.map(
            (updatedItem) => {
              const existingItem = cart.cartItems.find(
                (item) => item.productId === updatedItem.productId
              );

              return {
                ...updatedItem,
                productName:
                  existingItem?.productName || "Product Name not Found",
              };
            }
          );
          setCart({ ...data.updatedCart, cartItems: updatedCartItems });
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const removeFromCart = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.updatedCart) {
          const updatedCartItems = data.updatedCart.cartItems.map(
            (updatedItem) => {
              const existingItem = cart.cartItems.find(
                (item) => item.productId === updatedItem.productId
              );

              return {
                ...updatedItem,
                productName:
                  existingItem?.productName || "Product Name not Found",
              };
            }
          );
          const updatedTotalPrice = updatedCartItems.reduce(
            (total, item) => total + item.subtotal,
            0
          );

          setCart({
            cartItems: updatedCartItems,
            totalPrice: updatedTotalPrice,
          });
          notyf.success("Item removed from cart!");
        } else {
          console.error(data.message || "Failed to remove item from cart");
        }
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const clearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.cart) {
          setCart({ cartItems: [], totalPrice: 0 });
          notyf.success("Cart cleared successfully!");
        } else {
          notyf.error(data.message || "Failed to clear the cart");
        }
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        notyf.error("An error occurred while clearing the cart.");
      });
  };

  const checkout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/orders/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        notyf.success("Checkout successful! Redirecting to order history...");
        navigate("/order-history");
      } else {
        const errorData = await response.json();
        notyf.error(errorData.error || "Checkout failed.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      notyf.error("An error occurred during checkout.");
    }
  };

  if (loading) {
    return <h2>Loading your cart...</h2>;
  }

  if (cart.length === 0) {
    return <h2>Your cart is empty!</h2>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-2 mb-5">Your Shopping Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-white bg-dark">Name</th>
            <th className="text-white bg-dark">Price</th>
            <th className="text-white bg-dark">Quantity</th>
            <th className="text-white bg-dark">Subtotal</th>
            <th className="text-white bg-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.productName}</td>
              <td>₱{(item.subtotal / item.quantity).toFixed(2)}</td>
              <td>
                <InputGroup style={{ width: "130px" }}>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <FormControl value={item.quantity} readOnly />
                  <Button
                    variant="secondary"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </td>
              <td>₱{item.subtotal.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan="3"
              style={{ textAlign: "left", borderRight: "none" }}
              className="bg-light"
            >
              <Button variant="success" onClick={checkout}>
                Checkout
              </Button>
            </td>
            <td
              colSpan="2"
              style={{
                textAlign: "right",
                fontWeight: "bold",
                borderLeft: "none",
              }}
              className="bg-light"
            >
              Total: ₱{cart.totalPrice.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </Table>
      <div>
        <Button variant="danger" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      <p className="text-center fw-semibold fs-6">
        <Link to="/products" className="text-primary">
          Back to Catalog
        </Link>
      </p>
    </div>
  );
};

export default Cart;
