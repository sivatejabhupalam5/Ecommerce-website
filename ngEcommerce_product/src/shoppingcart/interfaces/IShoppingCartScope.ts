import * as angular from 'angular';
import { ICartItem } from './ICartItem';
export interface IShoppingCartScope extends angular.IScope {
  cart: ICartItem[];
  total: number;
  totalquantity: number;
  addToCart: (product: ICartItem) => void;
  removeFromCart: (product: ICartItem) => void;
  increaseQuantity: (product: ICartItem) => void;
  decreaseQuantity: (product: ICartItem) => void;
  clearCart: () => void;
  calculateTotal: () => void;
  logout: () => void;
}