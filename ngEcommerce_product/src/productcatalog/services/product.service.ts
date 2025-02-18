import * as angular from 'angular';

export class ProductService {
  static $inject = ['$q'];
  private $q: angular.IQService;

  constructor($q: angular.IQService) {
    this.$q = $q;
    this.initializeProducts();
  }

  private initializeProducts() {
    const products = [
      { id: 1, name: 'lily', price: 100, image: './imagetemplates/rose.webp', quantity: 1 },
      { id: 2, name: 'rose', price: 200, image: './imagetemplates/rose.webp', quantity: 1 },
      { id: 3, name: 'jasmine', price: 300, image: './imagetemplates/jasmins.webp', quantity: 1 }
      // Add more products as needed
    ];

    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products));
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  getProducts(): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      deferred.resolve(products);
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }

  addProduct(product: any): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      deferred.resolve({ message: 'Product added successfully' });
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }

  addToCart(product: any): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find((item: any) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      deferred.resolve({ message: 'Product added to cart' });
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }

  getCart(): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      deferred.resolve(cart);
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }

  removeFromCart(productId: number): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart = cart.filter((item: any) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      deferred.resolve({ message: 'Product removed from cart' });
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }

  updateCart(cart: any[]): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      deferred.resolve({ message: 'Cart updated' });
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  }
}

angular.module('productModule', []).service('ProductService', ProductService);