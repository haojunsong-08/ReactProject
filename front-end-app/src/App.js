import React from 'react';

function App() {
  // Static array of customers
  const customers = [
    { id: 1, name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj' },
    { id: 2, name: 'Katie Kates', email: 'katiek@abc.com', password: 'katiek' },
    { id: 3, name: 'Glen Glenns', email: 'gleng@abc.com', password: 'gleng' }
  ];

  // Function stubs for buttons
  const handleSave = () => {
    console.log('Save button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
  };

  return (
    <div className="App" style={{ padding: '20px', border: '1px solid black', width: '300px', margin: '20px auto' }}>
      {/* Customer List */}
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer Form */}
      <h2>Update</h2>
      <form>
        <div>
          <label>
            Name: 
            <input type="text" name="name" defaultValue={customers[0].name} />
          </label>
        </div>
        <div>
          <label>
            Email: 
            <input type="email" name="email" defaultValue={customers[0].email} />
          </label>
        </div>
        <div>
          <label>
            Pass: 
            <input type="password" name="password" defaultValue={customers[0].password} />
          </label>
        </div>
        <div>
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default App;
