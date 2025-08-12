import React from 'react';
import { FaCreditCard, FaShieldAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <h1>
          <FaCreditCard style={{ marginRight: '15px', color: '#ffd700' }} />
          Credit Card Fraud Detection
          <FaShieldAlt style={{ marginLeft: '15px', color: '#ffd700' }} />
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
