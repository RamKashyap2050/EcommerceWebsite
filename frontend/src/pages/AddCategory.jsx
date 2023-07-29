import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, makeStyles, Container } from "@material-ui/core";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "0 auto",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  fileInput: {
    display: "none",
  },
}));

const AddCategory = () => {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [image, setCategoryPhoto] = useState(null); // State to store the selected photo file
  const [show, setShow] = useState(false);
  const [alertresponse, setAlertresponse] = useState("");
  const AdminData = localStorage.getItem("AdminData");
  console.log(AdminData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!AdminData) {
      navigate("/loginadmin");
    }
  }, [AdminData, navigate]);

  const handlePhotoChange = (e) => {
    // This function will be called when a photo is selected
    const file = e.target.files[0];
    setCategoryPhoto(file);
    console.log(image)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = new FormData(); // Use FormData to send files
    categoryData.append("category_name", categoryName);
    categoryData.append("category_description", categoryDescription);
    categoryData.append("image", image);
    console.log(image)
    console.log(categoryData)
    axios
      .post("http://localhost:3030/Admin/newcategory", categoryData)
      .then((response) => {
        console.log("Category submission successful!");
        console.log("Response:", response.data);
        setShow(true);
        setAlertresponse("Posted Successfully");
        setCategoryDescription("");
        setCategoryName("");
        setCategoryPhoto(null); // Clear the selected photo file after successful submission
      })
      .catch((error) => {
        console.error("Category submission failed.");
        console.error("Error:", error);
        setShow(true);
        setAlertresponse("Error in posting Data");
      });
  };

  return (
    <div>
      <AdminNavbar />
      <br />
      <br />
      <Container maxWidth="sm">
        {show && (
          <Alert variant="success" className="w-50 mx-auto">
            {alertresponse}
          </Alert>
        )}
        <h3
          style={{
            marginTop: "2rem",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          Add a Category
        </h3>
        <form className={classes.formContainer} onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className={classes.textField}
          />
          <TextField
            label="Category Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            required
            className={classes.textField}
          />
          {/* File input button */}
          <input
            className={classes.fileInput}
            id="image"
            type="file"
            onChange={handlePhotoChange}
          />
          <label htmlFor="image">
            <Button variant="contained" component="span">
              Upload Category Photo
            </Button>
          </label>
          {/* Display the selected file name (optional) */}
          {image && <span>{image.name}</span>}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
          >
            Add Category
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default AddCategory;
