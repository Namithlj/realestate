import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProperty.css'; // Make sure to create this CSS file

const AddProperty = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    name: '',
    description: '',
    price: '',
    pincode: '',
    propertyType: '',
    phone: '',
  });

  const [properties, setProperties] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://realestate-b.vercel.app/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('https://realestate-b.vercel.app/api/properties/add', propertyDetails); // Corrected URL
      alert('Property Added Successfully!');
      setPropertyDetails({
        name: '',
        description: '',
        price: '',
        pincode: '',
        propertyType: '',
        phone: '',
      });
      fetchProperties(); // refresh list
    } catch (error) {
      alert('Error Adding Property');
      console.error(error);
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add New Property</h2>
      <form className="property-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={propertyDetails.name}
          onChange={handleInputChange}
          placeholder="Property Name"
          required
        />
        <textarea
          name="description"
          value={propertyDetails.description}
          onChange={handleInputChange}
          placeholder="Property Description"
          required
        />
        <input
          type="number"
          name="price"
          value={propertyDetails.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="pincode"
          value={propertyDetails.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
          required
        />
        <input
          type="text"
          name="propertyType"
          value={propertyDetails.propertyType}
          onChange={handleInputChange}
          placeholder="Property Type"
          required
        />
        <input
          type="tel"
          name="phone"
          value={propertyDetails.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3 className="existing-title">Previously Added Properties</h3>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h4>{property.name}</h4>
            <p><strong>Type:</strong> {property.propertyType}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>Price:</strong> ₹{property.price}</p>
            <p><strong>Pincode:</strong> {property.pincode}</p>
            <p><strong>Phone:</strong> {property.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProperty;
