import { makeAutoObservable } from 'mobx';

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
    const saved = sessionStorage.getItem('cart_data');
    if (saved) this.items = JSON.parse(saved);
  }

  addItem(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }
  increaseQty(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.qty += 1;
    this.save();
  }

  decreaseQty(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) this.removeItem(id);
      this.save();
    }
  }

  get totalItems() {
    return this.items.reduce((t, i) => t + i.qty, 0);
  }

  get totalPrice() {
    return this.items.reduce((t, i) => t + i.price * i.qty, 0);
  }

  save() {
    sessionStorage.setItem('cart_data', JSON.stringify(this.items));
  }

  getQty(id) {
    const item = this.items.find((i) => i.id === id);
    return item ? item.qty : 0;
  }
}

export const cartStore = new CartStore();
