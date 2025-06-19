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
    <div className="property-details" style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Back</button>
      <h2>{property.title || property.name}</h2>
      {property.imageUrl && <img src={property.imageUrl} alt="Property" style={{ width: '100%', borderRadius: '8px' }} />}
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p><strong>Pincode:</strong> {property.pincode}</p>
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Coordinates:</strong> {property.latitude || 'N/A'}, {property.longitude || 'N/A'}</p>
    </div>
  );
};

export default PropertyDetails;
