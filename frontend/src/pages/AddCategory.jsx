import React, { useState, useEffect} from "react";
import axios from "axios";
import { TextField, Button, makeStyles } from "@material-ui/core";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import  Alert  from "react-bootstrap/Alert";
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
  const [show, setShow] = useState(false)
  const [alertresponse, setAlertresponse] = useState("");
  const AdminData = localStorage.getItem("AdminData")
  console.log(AdminData)
  const navigate = useNavigate()
  useEffect(() => {
      if (!AdminData) {
        navigate('/loginadmin');
      }
    }, [AdminData, navigate]);

    const handleSubmit = (e) => {
      e.preventDefault();
    
      const categoryData = {
        category_name: categoryName,
        category_description: categoryDescription,
      };
    
      axios.post('http://localhost:3030/Admin/newcategory', categoryData)
        .then((response) => {
          console.log('Category submission successful!');
          console.log('Response:', response.data);
          setShow(true)
          setAlertresponse("Posted Succesfully")
          setCategoryDescription("")
          setCategoryName("")
        })
        .catch((error) => {
          console.error('Category submission failed.');
          console.error('Error:', error);
          setShow(true)
          setAlertresponse("Error in posting Data")
        });
    };

  return (
    <div>
      <AdminNavbar /><br/><br/>
      {show && <Alert variant="success" className="w-50 mx-auto">{alertresponse}</Alert>}
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
