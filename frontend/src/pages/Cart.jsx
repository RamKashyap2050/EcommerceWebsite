import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Buffer } from "buffer";
import NotFoundPage from "../components/404";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import NoProducts from "../components/NoProducts";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaTrash } from "react-icons/fa";
const Cart = () => {
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const userID = userData?._id;
  const [loading, setIsLoading] = useState(true);
  let [cartItems, setCartItems] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/Users/getcart/${userID}`);
        console.log("Data:", response.data);
        setCartItems(response.data);
        // Initialize the quantity map with default quantity of 1 for each item
        const initialQuantityMap = {};
        response.data.forEach((item) => {
          initialQuantityMap[item._id] = 1;
        });
        setQuantityMap(initialQuantityMap);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userID]);

  const increaseQuantity = (itemId) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: prevQuantityMap[itemId] + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    setQuantityMap((prevQuantityMap) => {
      const updatedQuantity = prevQuantityMap[itemId] - 1;
      // Ensure the quantity doesn't go below 1
      const newQuantity = updatedQuantity < 1 ? 1 : updatedQuantity;
      return {
        ...prevQuantityMap,
        [itemId]: newQuantity,
      };
    });
  };
  const handleCheckout = async () => {
    try {
      const checkoutData = {
        userID: userData._id,
        cartItems: cartItems.map((item) => ({
          productID: item.product._id,
          quantity: quantityMap[item._id],
        })),
        subtotal: calculateSubtotal(),
      };
      console.log(checkoutData);

      const response = await axios.post(`/Users/checkout`, checkoutData);

      // Handle the response from the server as needed
      console.log("Checkout response:", response.data);

      // Navigate to a success or confirmation page
      navigate("/checkout-success");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle any error conditions, display error message, etc.
    }
  };

  const calculateProductTotal = (item) => {
    return item.product.product_price * quantityMap[item._id];
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((subtotal, item) => {
      return subtotal + calculateProductTotal(item);
    }, 0);
  };

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };
  const removeItem = (itemID) => {
    axios
      .delete(`/Users/removecart/${itemID}`)
      .then((response) => {
        console.log("Item removed successfully");
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== itemID)
        );
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <div>
      <UserHeader />
      <div></div>
      {userData ? (
        cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cardofcart mb-4">
                <div className="carousel-container" key={item.id}>
                  <div
                    id={`carousel-${item.id}-${index}`}
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {item.product.images.map((image, imageIndex) => (
                        <div
                          className={`carousel-item ${
                            imageIndex === 0 ? "active" : ""
                          }`}
                          key={imageIndex}
                        >
                          <img
                            src={convertImageBufferToBase64(image)}
                            alt={`Product Image ${imageIndex + 1}`}
                            className="product-image"
                          />
                        </div>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href={`#carousel-${cartItems.id}-${index}`}
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href={`#carousel-${cartItems.id}-${index}`}
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <h5>{item.product.product_name}</h5>
                <p>Price: ${item.product.product_price}</p>
                <p>Quantity: </p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => increaseQuantity(item._id)}
                    style={{ width: "10%", marginRight: "1rem" }}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    style={{ width: "80%", marginRight: "1rem" }}
                  >
                    {quantityMap[item._id]}
                  </Button>
                  {quantityMap[item._id] <= 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => removeItem(item._id)}
                      style={{ width: "10%" }}
                    >
                      <FaTrash />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => decreaseQuantity(item._id)}
                      style={{ width: "10%" }}
                    >
                      -
                    </Button>
                  )}
                </div>
                <hr />
                <p style={{ fontWeight: "700" }}>
                  Product Total: ${calculateProductTotal(item)}
                </p>
              </div>
            ))}
            <div className="container">
              <div className="form-group">
                <label htmlFor="shippingAddress">Shipping Address</label>
                <select id="shippingAddress" className="form-control" required>
                  <option value="">Please Select an Address</option>
                  {userData.saved_address.map((address, index) => (
                    <option key={index} value={index}>
                      {`${address.building}, ${address.streetName}, ${address.city}, ${address.province}, ${address.postalCode}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="container">
              <a href="/editprofile">
                {" "}
                <span>Want to add a new Address?</span>
              </a>
            </div>

            <div style={{ margin: "auto", textAlign: "center" }}>
              <h5 style={{ fontWeight: "700" }}>
                Subtotal: ${calculateSubtotal()}
              </h5>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <> {loading ? <Spinner /> : <NoProducts />}</>
        )
      ) : (
        <> {loading ? <Spinner /> : <NotFoundPage />}</>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
