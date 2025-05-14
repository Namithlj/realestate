import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer'; // Assuming you have a Footer component
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data));
  }, []);

  return (
    <div className="page-container">
      <main className="content-wrap">
        <h1 className="title">Featured Properties</h1>
        <div className="property-grid">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
