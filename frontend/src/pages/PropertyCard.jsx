import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onViewDetails }) => {
  return (
    <div className="property-card">
      <img
        src={property.imageUrl || '/default-property.jpg'}
        alt={property.title}
        className="property-image"
      />
      <h3 className="property-title">{property.title}</h3>
      <p className="property-address">{property.address}</p>
      <p className="property-pincode">Pincode: {property.pincode}</p>
      <button onClick={onViewDetails} className="view-details-btn">
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;
