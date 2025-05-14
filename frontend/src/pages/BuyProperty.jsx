import React, { useState } from 'react';
import axios from 'axios';
import './BuyProperty.css';

const BuyProperty = () => {
  const [buyerDetails, setBuyerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    propertyType: 'buy',
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails({ ...buyerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://realestate-b.vercel.app/api/properties/buy', buyerDetails);
      alert('Purchase Request Sent!');
      const response = await axios.get(`https://realestate-b.vercel.app/api/properties/search?pincode=${buyerDetails.pincode}`);
      setProperties(response.data);
    } catch (error) {
      alert('Error in Purchase or Fetching Properties');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-property-container">
      <h2>Buy or Rent Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={buyerDetails.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="email" name="email" value={buyerDetails.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="text" name="phone" value={buyerDetails.phone} onChange={handleInputChange} placeholder="Phone Number" required />
        <input type="text" name="pincode" value={buyerDetails.pincode} onChange={handleInputChange} placeholder="Pincode" required />
        <select name="propertyType" value={buyerDetails.propertyType} onChange={handleInputChange}>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading properties...</p>}

      {properties.length > 0 && (
        <div className="property-list">
          <h3>Available Properties</h3>
          <div className="property-cards">
            {properties.map((property) => (
              <div key={property._id} className="property-card">
                <h4>{property.name}</h4>
                <p>{property.description}</p>
                <p><strong>Price:</strong> {property.price}</p>
                <p><strong>Location:</strong> {property.pincode}</p>
                <p><strong>Contact:</strong> {property.phone}</p>
                <p><strong>Property Type:</strong> {property.propertyType}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyProperty;
