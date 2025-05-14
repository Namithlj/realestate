import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pincode, setPincode] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Proxy mock data
  const mockProperties = [
    {
      _id: '1',
      name: 'Cozy Mountain Cabin',
      description: 'A peaceful cabin with scenic mountain views.',
      price: 250000,
    },
    {
      _id: '2',
      name: 'Spacious Beach House',
      description: 'A luxurious house right on the beach.',
      price: 750000,
    },
    {
      _id: '3',
      name: 'Urban Studio Apartment',
      description: 'A modern studio in the heart of the city.',
      price: 200000,
    },
  ];

  // Fetch properties from backend (initial or with search)
  const fetchProperties = async (pin = '') => {
    try {
      const url = pin ? `https://realestate-b.vercel.app/api/properties?pincode=${pin}` : `https://realestate-b.vercel.app/api/properties`;
      const res = await axios.get(url);
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    setSearchTriggered(true);
    fetchProperties(pincode);
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Pincode..."
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="properties-list">
          {(properties.length > 0 ? properties : (!searchTriggered ? mockProperties : [])).map((property) => (
            <div key={property._id} className="property-card">
              <h2 className="property-name">{property.name}</h2>
              <p className="property-description">{property.description}</p>
              <p className="property-price">${property.price.toLocaleString()}</p>
              <button className="property-button">View Details</button>
            </div>
          ))}
          {searchTriggered && properties.length === 0 && (
            <p className="no-results">No properties found for this pincode.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
