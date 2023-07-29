import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import QS from "../QS.jpg";

const ManageCategories = () => {
  const [category, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get(`/Admin/getcategories`).then((response) => {
      console.log(response.data);
      setCategoryData(response.data);
    });
  }, []);

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
      {category.map((index, key) => (
        <div className="p-4">
          <Card key={key}>
            <CardContent>
              {index.image ? (
                <img
                  src={convertImageBufferToBase64(index.image.data)}
                  className="product-image"
                />
              ) : (
                <img src={QS} className="cardofcart" />
              )}
              <Typography variant="h5" component="h2">
                {index.category_name}
              </Typography>
              <Typography component="h5">
                {index.category_description}
              </Typography>
            </CardContent>
            <br />
          </Card>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default ManageCategories;
