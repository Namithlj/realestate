import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();  // pincode
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByPincode = async () => {
      try {
        const url = id === 'all'
          ? 'https://realestate-b.vercel.app/api/properties'
          : `https://realestate-b.vercel.app/api/properties?q=${id}`;

        const res = await axios.get(url);
        setProperties(res.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchByPincode();
  }, [id]);

  if (loading) return <p>Loading properties...</p>;
  if (properties.length === 0) return <p>No properties found for pincode {id}</p>;

  return (
    <div className="property-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      {/* <h2>Properties for Pincode: {id}</h2> */}
      {properties.map((property) => (
        <div key={property._id} className="property-card">
          <h3>{property.name}</h3>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>Address / Pincode:</strong> {property.pincode}</p>
          <p><strong>Property Type:</strong> {property.propertyType}</p>
          <p><strong>Phone:</strong> {property.phone}</p>
          <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
