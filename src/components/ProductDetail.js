import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { observer } from 'mobx-react';

function ProductDetail() {
  const { id } = useParams();
  const store = React.useContext(StoreContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('last_products');
    if (raw) {
      const list = JSON.parse(raw);
      const found = list.find((p) => String(p.id) === String(id));
      if (found) setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: 16 }}>
        <Link to='/'>← Back to Home</Link>
        <div style={{ marginTop: 20 }}>
          <p>Product data not available. Please go back to the Home page and open the product from the list.</p>
          <Link to='/'>Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
        <img src={product.image} alt={product.title} style={{ width: 300, height: 300, objectFit: 'contain' }} />
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p style={{ fontWeight: 700, fontSize: 18 }}>₹ {product.price}</p>
          <p>{product.description}</p>
          <button
            onClick={() => store.addItem(product)}
            style={{ padding: '10px 14px', borderRadius: 6, cursor: 'pointer' }}
          >
            Add to My Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(ProductDetail);
