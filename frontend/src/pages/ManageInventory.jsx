import React, { useEffect, useState } from "react";
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
import { Edit, Delete } from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";

const ManageInventory = () => {
  const [data, setData] = useState([]);
  const adminDataString = localStorage.getItem("AdminData");
  const adminData = adminDataString ? JSON.parse(adminDataString) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminData) {
      navigate("/loginadmin");
    }
  }, [adminData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/Admin/getProducts"
        );
        console.log("Data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    // Handle edit functionality for the given productId
    console.log("Edit product:", productId);
  };

  const handleDelete = (productId) => {
    // Handle delete functionality for the given productId
    console.log("Delete product:", productId);
  };

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-3">
        <Grid container spacing={4}>
          {data.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {product.product_name}
                  </Typography>
                  <Typography color="textSecondary">
                    {product.product_description}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Stock Number: {product.stock_number}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price: {product.product_price}
                  </Typography>
                </CardContent>
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
                <CardActions>
                  <Button
                    startIcon={<Edit />}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<Delete />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default ManageInventory;
