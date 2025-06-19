import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import BuyProperty from './pages/BuyProperty';
import CustomerService from './pages/CustomerService';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './pages/PropertyDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/buy-property" element={<BuyProperty />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/property/:id" element={<PropertyDetails />} /> 
          </Routes>
        </div>

        <Footer/>
      </div>
    </Router>
  );
};

export default App;
