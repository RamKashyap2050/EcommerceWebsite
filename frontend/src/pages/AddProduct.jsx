import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

const AddProduct = () => {
  const AdminData = localStorage.getItem("AdminData");
  console.log(AdminData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!AdminData) {
      navigate("/loginadmin");
    }
  }, [AdminData, navigate]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  console.log(file1, file2, file3);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_description", productDescription);
    formData.append("product_price", productPrice);
    formData.append("stock_number", stockNumber);
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("CategoryID", selectedCategory);

    console.log(
      productName,
      productDescription,
      productPrice,
      stockNumber,
      file1,
      file2,
      file3,
      selectedCategory
    );

    try {
      const response = await axios.post(
        "http://localhost:3030/Admin/newproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to 'multipart/form-data'
          },
        }
      );

      console.log("Product submission successful!");
      console.log("Response:", response.data);

      // Reset the form
      // setProductName("");
      // setProductDescription("");
      // setProductPrice("");
      // setStockNumber("");
      // setFile1(null);
      // setFile2(null);
      // setFile3(null);
    } catch (error) {
      console.error("Product submission failed.");
      console.error("Error:", error);
    }
  };

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3030/Admin/getcategory")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <br />
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Add a Product
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Product Description"
            multiline
            rows={4}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Product Price"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Stock Number"
            type="number"
            value={stockNumber}
            onChange={(e) => setStockNumber(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                id="file1"
                name="file1"
                onChange={(e) => setFile1(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                id="file2"
                name="file2"
                onChange={(e) => setFile2(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                id="file3"
                name="file3"
                onChange={(e) => setFile3(e.target.files[0])}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">Select an Option</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Add Product
          </Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default AddProduct;
