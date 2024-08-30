import React, { useState, useEffect } from "react"; // Importing React hooks
import { getAll, post, put, deleteById } from "./restdb.js"; // Importing functions to interact with the backend
import "./App.css"; // Importing the CSS styles for the App component
import { CustomerList } from "./CustomerList.js"; // Importing the CustomerList component
import { CustomerAddUpdateForm } from "./CustomerAddUpdateForm.js"; // Importing the CustomerAddUpdateForm component

export function App() {
  let blankCustomer = { id: -1, name: "", email: "", password: "" }; // Default empty customer object
  const [customers, setCustomers] = useState([]); // State for the list of customers
  const [formObject, setFormObject] = useState(blankCustomer); // State for the form input object
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  let mode = formObject.id >= 0 ? "Update" : "Add"; // Determine whether the form is in 'Add' or 'Update' mode

  useEffect(() => {
    getCustomers(); // Fetch customers on component mount and when formObject changes
  }, [formObject]);

  const getCustomers = function () {
    getAll(setCustomers); // Fetch all customers from the server and update the state
  };

  const handleSearchChange = (e) => {
    e.targetvalue = setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleListClick = function (item) {
    if (formObject.id === item.id) {
      setFormObject(blankCustomer); // Deselect the customer if clicked again
    } else {
      setFormObject(item); // Select the clicked customer
    }
  };

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value; // Update the form object with new input values
    setFormObject(newFormObject); // Set the updated form object in state
  };

  let onCancelClick = function () {
    setFormObject(blankCustomer); // Reset the form to a blank state
  };

  let onDeleteClick = function () {
    let postopCallback = () => {
      setFormObject(blankCustomer);
    };
    if (formObject.id >= 0) {
      deleteById(formObject.id, postopCallback); // Delete the customer if one is selected
    } else {
      setFormObject(blankCustomer); // Otherwise, just reset the form
    }
  };

  let onSaveClick = function () {
    let postopCallback = () => {
      setFormObject(blankCustomer);
    };
    if (mode === "Add") {
      post(formObject, postopCallback); // Add a new customer
    }
    if (mode === "Update") {
      put(formObject, postopCallback); // Update the existing customer
    }
  };

  let pvars = {
    mode: mode,
    handleInputChange: handleInputChange,
    formObject: formObject,
    onDeleteClick: onDeleteClick,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick,
  };

  return (
    <div className="App">
      <div className="CustomerList">
        <input
          type="text"
          className="search-input"
          placeholder="Search User Name ..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <CustomerList
          customers={filteredCustomers}
          formObject={formObject}
          handleListClick={handleListClick}
        />
      </div>
      <div className="CustomerAddUpdateForm">
        <CustomerAddUpdateForm {...pvars} />
      </div>
    </div>
  );
}

export default App;
