import React from 'react';
import { motion } from 'framer-motion';
import './CustomerService.css';

const CustomerService = () => {
  return (
    <motion.div
      className="customer-service-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src="/favicon.ico"  // change to your image filename in public folder
        alt="Developer"
        className="profile-pic"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <h2 className="heading">Customer Service</h2>
      <h3 className="subheading">Developer Profile</h3>
      <p><strong>Developer:</strong> Namith</p>
      <p><strong>Email:</strong> namithnamith37@gmail.com</p>
      <p><strong>Contact:</strong> 8088457841</p>
    </motion.div>
  );
};

export default CustomerService;
