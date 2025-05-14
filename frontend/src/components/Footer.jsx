import React, { useEffect, useState } from 'react';
import './Footer.css';

const developers = [
  { name: "Namit Sharma", role: "Full Stack Developer", contact: "9876543210" },
  { name: "Priya Verma", role: "UI/UX Designer", contact: "9871234560" },
  { name: "Rahul Jain", role: "Backend Engineer", contact: "9988776655" }
];

const Footer = () => {
  const [currentDev, setCurrentDev] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDev((prev) => (prev + 1) % developers.length);
    }, 10000); // update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const dev = developers[currentDev];

  return (
    <footer className="footer">
      <div className="footer-section animate-slide-left">
        <h3>Contact Us</h3>
        <ul>
          <li>Phone: 123-456-7890</li>
          <li>Email: support@realestate.com</li>
          <li>Address: 123 Main Street, City</li>
        </ul>
      </div>

      <div className="footer-section animate-slide-right">
        <h3>Most Demanded Areas</h3>
        <ul>
          <li>Mumbai - 400001</li>
          <li>Bangalore - 560001</li>
          <li>Delhi - 110001</li>
        </ul>
      </div>

      <div className="footer-section dev-section floating-dev">
        <h3>Developer Profile</h3>
        <ul>
          <li><strong>Name:</strong> {dev.name}</li>
          <li><strong>Role:</strong> {dev.role}</li>
          <li><strong>Contact:</strong> {dev.contact}</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
