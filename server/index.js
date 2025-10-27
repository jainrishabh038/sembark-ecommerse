const express = require('express');
const got = require('got');
const path = require('path');
const app = express();

const API_BASE = 'https://fakestoreapi.com';

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await got(`${API_BASE}/products`, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/categories', async (req, res) => {
  try {
    const response = await got(`${API_BASE}/products/categories`, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/category/:category', async (req, res) => {
  try {
    const category = encodeURIComponent(req.params.category);
    const response = await got(`${API_BASE}/products/category/${category}`, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const response = await got(`${API_BASE}/products/${req.params.id}`, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
