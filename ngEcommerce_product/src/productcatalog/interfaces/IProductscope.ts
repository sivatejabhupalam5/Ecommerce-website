import * as angular from 'angular';
import { IProduct } from './IProduct';
export interface IProductScope extends angular.IScope {
    products: IProduct[];
    newProduct: IProduct;
    addToCart: (product: IProduct) => void;
    increaseQuantity: (product: IProduct) => void;
    decreaseQuantity: (product: IProduct) => void;
    addProduct: () => void;
  }