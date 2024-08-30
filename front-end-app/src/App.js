import React, { useState } from 'react'; // No need for useEffect anymore
import './App.css'; // Importing the CSS styles for the App component
import { CustomerList } from './CustomerList.js'; // Importing the CustomerList component
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm.js'; // Importing the CustomerAddUpdateForm component

export function App() {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" }; // Default empty customer object
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj' },
    { id: 2, name: 'Katie Kates', email: 'katiek@abc.com', password: 'katiek' },
    { id: 3, name: 'Glen Glenns', email: 'gleng@abc.com', password: 'gleng' }
  ]); // State for the list of customers initialized with a static array
  const [formObject, setFormObject] = useState(blankCustomer); // State for the form input object
  let mode = (formObject.id >= 0) ? 'Update' : 'Add'; // Determine whether the form is in 'Add' or 'Update' mode

  // Fetching customers from an API is no longer needed

  const handleListClick = function (item) {
    if (formObject.id === item.id) {
      setFormObject(blankCustomer); // Deselect the customer if clicked again
    } else {
      setFormObject(item); // Select the clicked customer
    }
  }

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject }
    newFormObject[name] = value; // Update the form object with new input values
    setFormObject(newFormObject); // Set the updated form object in state
  }

  let onCancelClick = function () {
    setFormObject(blankCustomer); // Reset the form to a blank state
  }

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      setCustomers(customers.filter(customer => customer.id !== formObject.id)); // Remove the customer from the list
      setFormObject(blankCustomer); // Reset the form
    }
  }

  let onSaveClick = function () {
    if (mode === 'Add') {
      // Add a new customer with a unique id
      const newCustomer = { ...formObject, id: customers.length + 1 };
      setCustomers([...customers, newCustomer]);
    }
    if (mode === 'Update') {
      // Update the existing customer
      setCustomers(customers.map(customer => 
        customer.id === formObject.id ? formObject : customer
      ));
    }
    setFormObject(blankCustomer); // Reset the form after saving
  }

  let pvars = {
    mode: mode,
    handleInputChange: handleInputChange,
    formObject: formObject,
    onDeleteClick: onDeleteClick,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick
  }

  return (
    <div className="App">
      <div className="CustomerList">
        <CustomerList
          customers={customers}
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
