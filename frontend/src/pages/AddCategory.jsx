import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import AdminNavbar from "../components/AdminNavbar";

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
}));

const AddCategory = () => {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform category submission logic here
    // For example, send the category data to an API or update state
    console.log("Category Name:", categoryName);
    console.log("Category Description:", categoryDescription);
  };

  return (
    <div>
      <AdminNavbar />
      <h3
        style={{ marginTop: "2rem", textAlign: "center", marginBottom: "4rem" }}
      >
        Add a Category
      </h3>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
