import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`https://realestate-b.vercel.app/api/properties/${id}`)
      .then(res => setProperty(res.data));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Pincode: {property.pincode}</p>
    </div>
  );
};

export default PropertyDetails;
