export const fetchProducts = async () => {
  const res = await fetch('/api/products');
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch('/api/products/categories');
  return res.json();
};

export const fetchProductsByCategory = async (cat) => {
  const res = await fetch(`/api/products/category/${cat}`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`/api/products/${id}`);
  return res.json();
};
