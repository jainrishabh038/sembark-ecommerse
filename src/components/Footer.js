import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';

function Footer() {
  const store = useContext(StoreContext);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#eee',
        padding: '10px',
        borderTop: '1px solid #ccc',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        zIndex: 1000,
      }}
    >
      <div>Items: {store.totalItems}</div>
      <div>Total: ₹ {store.totalPrice.toFixed(2)}</div>
      <Link
        to='/cart'
        style={{
          background: '#007bff',
          color: 'white',
          padding: '6px 12px',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        View Cart
      </Link>
    </div>
  );
}

export default observer(Footer);
