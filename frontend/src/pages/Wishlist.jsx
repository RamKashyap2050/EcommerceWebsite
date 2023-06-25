import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import NotFoundPage from "../components/404";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { Button } from "@material-ui/core";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import axios from "axios";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const AddToCart = (product) => {
    const url = "http://localhost:3030/Users/addtocart";

    const payload = {
      user: userData._id,
      product: product,
    };
    console.log(payload);
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response.data);
        navigate("/usercart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userData) {
      const fetchWishlistData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/Users/getwishlist/${userData._id}`
          );
          console.log(response.data);
          setWishlistData(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchWishlistData();
    }
  }, []);

  // ...
  const handleRemoveWishlist = (product) => {
    console.log(product);
    const url = `http://localhost:3030/Users/removewishlist/${userData._id}/${product.product._id}`;

    axios
      .delete(url)
      .then((response) => {
        console.log(response.data);

        // Assuming the response indicates the successful removal of the wishlist item
        if (response.data.message === "Wishlist item removed") {
          // Filter out the removed product from the wishlistData state
          const updatedWishlist = wishlistData.filter(
            (item) => item._id !== product._id
          );
          setWishlistData(updatedWishlist);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(wishlistData);
  }, [wishlistData]);

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };
  return (
    <div>
      <UserHeader />
      {userData ? (
        <div>
          {/* Display wishlist data here */}
          {wishlistData ? (
            <div>
              {wishlistData.map((item, index) => (
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
                        href={`#carousel-${wishlistData.id}-${index}`}
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
                        href={`#carousel-${wishlistData.id}-${index}`}
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
                  {item.product.stock_number <= 0 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ width: "75%", marginRight: "1rem" }}
                      disabled
                    >
                      Out of Stock
                    </Button>
                  ) : (
                    <Button
                      startIcon={<ShoppingCart />}
                      variant="contained"
                      color="primary"
                      style={{ width: "75%", marginRight: "1rem" }}
                      onClick={() => AddToCart(item.product._id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color=""
                    style={{ width: "20%" }}
                    onClick={() => handleRemoveWishlist(item)}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading wishlist...</p>
          )}
        </div>
      ) : (
        <NotFoundPage />
      )}
      <Footer />
    </div>
  );
};

export default Wishlist;
