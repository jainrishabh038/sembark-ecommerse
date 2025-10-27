import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { StoreContext } from '../context/StoreContext';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api';

function Home() {
  const store = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      sessionStorage.setItem('last_products', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCategory(cat) {
    setSelectedCategory(cat);
    try {
      setLoading(true);
      if (!cat) {
        const all = await fetchProducts();
        setProducts(all);
        sessionStorage.setItem('last_products', JSON.stringify(all));
      } else {
        const data = await fetchProductsByCategory(cat);
        setProducts(data);
        sessionStorage.setItem('last_products', JSON.stringify(data));
      }
      setSort('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleSort(value) {
    setSort(value);
    const copy = [...products];
    if (value === 'low') copy.sort((a, b) => a.price - b.price);
    else if (value === 'high') copy.sort((a, b) => b.price - a.price);
    setProducts(copy);
  }

  return (
    <div style={{ padding: 16, marginTop: 10 }}>
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>Products</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        <select
          value={selectedCategory}
          onChange={(e) => handleCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 6, minWidth: 150 }}
        >
          <option value=''>All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          style={{ padding: 8, borderRadius: 6, minWidth: 150 }}
        >
          <option value=''>Sort</option>
          <option value='low'>Price: Low to High</option>
          <option value='high'>Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 0',
            fontSize: 18,
            color: '#555',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: '4px solid #ccc',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              margin: '0 auto 10px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          Loading products...
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {products.map((p) => {
            const qty = store.getQty(p.id);
            return (
              <div
                key={p.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: 10,
                  padding: 14,
                  background: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 340,
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Link
                  to={`/product/${p.id}/details`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%',
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: '100%',
                      height: 160,
                      objectFit: 'contain',
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      height: 38,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: '18px',
                    }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontWeight: 500, marginTop: 6 }}>₹ {p.price}</div>
                </Link>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <button
                    onClick={() => store.decreaseQty(p.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      background: '#f6f6f6',
                      fontWeight: 700,
                    }}
                  >
                    −
                  </button>
                  <div
                    style={{
                      minWidth: 24,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {qty}
                  </div>
                  <button
                    onClick={() => store.addItem(p)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      background: '#f6f6f6',
                      fontWeight: 700,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(Home);
