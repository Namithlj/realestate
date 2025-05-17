import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://realestate-b.vercel.app/api/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details" style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        ← Back
      </button>

      <h2 style={{ marginBottom: '10px' }}>{property.title}</h2>

      {/* Display image if available */}
      {property.imageUrl && (
        <img
          src={property.imageUrl}
          alt={property.title}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
        />
      )}

      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Address:</strong> {property.address || 'N/A'}</p>
      <p><strong>Pincode:</strong> {property.pincode}</p>
      <p><strong>Price:</strong> {property.price ? `$${property.price}` : 'N/A'}</p>

      {/* Add any other fields as needed */}
    </div>
  );
};

export default PropertyDetails;
