import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#fff' : '#eee',
    background: location.pathname === path ? '#007bff' : 'transparent',
    padding: '6px 12px',
    borderRadius: 6,
    transition: '0.2s',
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: '#333',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 3000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      <Link
        to='/'
        style={{
          fontWeight: 700,
          fontSize: 18,
          textDecoration: 'none',
          color: 'white',
        }}
      >
        🛍️ Sembark Store
      </Link>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to='/' style={linkStyle('/')}>
          Home
        </Link>
        <Link to='/cart' style={linkStyle('/cart')}>
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
