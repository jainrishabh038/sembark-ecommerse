import { createContext } from 'react';
import { cartStore } from '../stores/CartStore';

export const StoreContext = createContext(cartStore);
