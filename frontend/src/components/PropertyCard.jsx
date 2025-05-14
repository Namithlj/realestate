import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="card">
    <h3>{property.title}</h3>
    <p>{property.description}</p>
    <p>Pincode: {property.pincode}</p>
    <Link to={`/property/${property._id}`}>View Details</Link>
  </div>
);

export default PropertyCard;
