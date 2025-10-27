import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./components/Home'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Footer = lazy(() => import('./components/Footer'));
const CartPage = lazy(() => import('./components/CartPage'));
const Navbar = lazy(() => import('./components/NavBar'));

function App() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 60, paddingBottom: 70 }}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              padding: '50px',
              fontSize: '18px',
              color: '#555',
            }}
          >
            Loading...
          </div>
        }
      >
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id/details' element={<ProductDetail />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
