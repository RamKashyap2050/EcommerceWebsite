import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import AdminNavbar from "../components/AdminNavbar";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form submission logic here

    // Reset the form
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setStockNumber("");
    setFile1(null);
    setFile2(null);
    setFile3(null);
  };
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // other form fields and state variables

  useEffect(() => {
    // Fetch categories from API
    axios
      .get("https://api.example.com/categories")
      .then((response) => {
        // Update categories state with fetched data
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <AdminNavbar /><br />
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Add a Product
        </Typography>
        <form onSubmit={handleSubmit}>
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
                accept="image/*"
                onChange={(e) => setFile1(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile2(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                accept="image/*"
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
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
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
    </>
  );
};

export default AddProduct;
