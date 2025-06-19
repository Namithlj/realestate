import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [pincode, setPincode] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all properties
  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://realestate-b.vercel.app/api/properties');
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching all properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch by pincode
  const fetchPropertiesByPincode = async (code) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://realestate-b.vercel.app/api/properties/search?pincode=${encodeURIComponent(code)}`
      );
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching properties by pincode:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all on initial load
  useEffect(() => {
    fetchAllProperties();
  }, []);

  // Handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedPincode = pincode.trim();

    if (trimmedPincode === '') {
      await fetchAllProperties();
    } else {
      await fetchPropertiesByPincode(trimmedPincode);
    }
  };

  // Reset to all
  const handleReset = () => {
    setPincode('');
    fetchAllProperties();
  };

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="page-container">
      <main className="content-wrap">
        <h1 className="title">Search Properties by Pincode</h1>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode"
            style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
          <button
            type="button"
            onClick={handleReset}
            style={{ padding: '8px 16px', marginLeft: '10px' }}
          >
            Reset
          </button>
        </form>

        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length === 0 ? (
          <p>No properties found{pincode ? ` for pincode ${pincode}` : ''}.</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onViewDetails={() => handleViewDetails(property._id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
