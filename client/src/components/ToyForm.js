import React, { useState } from "react";

function ToyForm({ onAddToy }) {
 
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // fetch returns a Promise, we must await it
    const response = await fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // response.json() returns a Promise, we must await it
    const data = await response.json();
    if (response.ok) {
      console.log("Toy created:", data);
    } else {
      setFormData(data.errors);
    }
  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
       
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
        
      </form>
    </div>
  );
}

export default ToyForm;
