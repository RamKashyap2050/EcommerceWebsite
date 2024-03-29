import React from "react";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { FaHeart, FaTicketAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { Edit, Delete, ShoppingBasket } from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DoneOutline, ShoppingCart } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Alert } from "react-bootstrap";
import Spinner from "../components/Spinner";
import OverlayedImage from "../components/HomeImage";
const UserHomePage = () => {
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("UserData"));
  const userID = user?._id;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    try {
      const [productsResponse, cartItemsResponse, wishlistItemsResponse] =
        await Promise.all([
          axios.get("/Admin/getProducts"),
          axios.get(`/Users/getcart/${userID}`),
          axios.get(`/Users/getwishlist/${userID}`), // New wishlist API URL
        ]);

      console.log("Products Data:", productsResponse.data);
      console.log("Cart Items:", cartItemsResponse.data);
      console.log("Wishlist Items:", wishlistItemsResponse.data);

      const updatedData = productsResponse.data.map((product) => {
        const addedToCart = cartItemsResponse.data.some(
          (item) => item.product?._id === product?._id
        );
        const addedToWishlist = wishlistItemsResponse.data.some(
          (item) => item.product?._id === product?._id
        );
        return { ...product, addedToCart, addedToWishlist };
      });

      setData(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleClick = (productId) => {
    const url = `/Users/addtowishlist`;

    const payload = {
      user: user._id,
      product: productId,
    };
    console.log(payload);
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setShow(error.response.data.message);
        } else {
          setShow("An error occurred while adding to the wishlist.");
        }
      });
  };

  const AddToCart = (product) => {
    const url = `/Users/addtocart`;

    const payload = {
      user: user._id,
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

  return (
    <div>
      <div></div>
      <div>
        <UserHeader></UserHeader>
        <OverlayedImage />
        <div className="p-3">
          {show && <Alert>{show}</Alert>}
          {isLoading ? (
            <Spinner />
          ) : (
            <Grid container spacing={4}>
              {data.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card className="p-4">
                    <div className="carousel-container" key={product.id}>
                      <div
                        id={`carousel-${product.id}-${index}`}
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <div className="carousel-inner">
                          {product.images.map((image, imageIndex) => (
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
                          href={`#carousel-${product.id}-${index}`}
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
                          href={`#carousel-${product.id}-${index}`}
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
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {product.product_name}
                      </Typography>
                      <Typography color="textSecondary">
                        {product.product_description}
                      </Typography>

                      <Typography
                        variant="h6"
                        component="h6"
                        style={{ fontWeight: "bolder" }}
                      >
                        {product.product_price}$
                      </Typography>
                    </CardContent>

                    <CardActions style={{ display: "flex" }}>
                      {product.stock_number <= 0 ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ width: "50%" }}
                          disabled
                        >
                          Out of Stock
                        </Button>
                      ) : (
                        <>
                          {product.addedToCart ? (
                            <Button
                              startIcon={<DoneOutline />}
                              style={{ width: "60%" }}
                              variant="contained"
                              color="success"
                            >
                              Added
                            </Button>
                          ) : (
                            <Button
                              startIcon={<ShoppingCart />}
                              variant="contained"
                              color="primary"
                              style={{ width: "60%" }}
                              onClick={() => AddToCart(product._id)}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </>
                      )}
                      <Button
                        startIcon={
                          product.addedToWishlist ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )
                        }
                        variant="outlined"
                        color=""
                        style={{ width: "40%" }}
                        onClick={() => handleClick(product._id)}
                        disabled={product.addedToWishlist}
                      >
                        <>{product.addedToWishlist ? "Added" : "Wishlist"}</>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserHomePage;
