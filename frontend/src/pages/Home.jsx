import React, { useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer'; // Assuming you have a Footer component
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [pincode, setPincode] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all properties initially
  React.useEffect(() => {
    fetchAllProperties();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (pincode.trim() === '') {
      fetchAllProperties();
      return;
    }

    try {
      setLoading(true);
      // Fetch filtered properties by pincode (make sure backend supports this API)
      const res = await axios.get(`http://localhost:5000/api/properties/search?pincode=${pincode.trim()}`);
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="page-container">
      <main className="content-wrap">
        <h1 className="title">Featured Properties</h1>

        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setPincode('');
              fetchAllProperties();
            }}
            style={{ padding: '8px 16px', fontSize: '16px', marginLeft: '10px' }}
          >
            Reset
          </button>
        </form>

        {loading && <p>Loading properties...</p>}

        {!loading && properties.length === 0 && <p>No properties found.</p>}

        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onViewDetails={() => handleViewDetails(property._id)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
