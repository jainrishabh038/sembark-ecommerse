import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../context/StoreContext';
function CartPage() {
  const store = useContext(StoreContext);

  return (
    <div style={{ padding: 16, marginTop: 10 }}>
      <h2 style={{ marginTop: 10 }}>My Cart</h2>

      {store.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {store.items.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                padding: 10,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={item.image} alt={item.title} style={{ width: 70, height: 70, objectFit: 'contain' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  <div>Qty: {item.qty}</div>
                  <div>Price: ₹{item.price}</div>
                </div>
              </div>

              {/* 🆕 Remove Button */}
              <button
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
                onClick={() => store.removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontWeight: 'bold', marginTop: 20 }}>
        Total Items: {store.totalItems} <br />
        Total Value: ₹ {store.totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

export default observer(CartPage);
