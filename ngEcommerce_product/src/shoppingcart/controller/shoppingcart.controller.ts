import angular from 'angular';
import { ProductService } from '../../productcatalog/services/product.service';
import { AuthService } from '../../auth/services/auth.service';
import { ICartItem } from '../interfaces/ICartItem';
import { IShoppingCartScope } from '../interfaces/IShoppingCartScope';

export class ShoppingCartController {
  static $inject = ['$scope', 'ProductService', 'AuthService', '$location'];

  constructor(private $scope: IShoppingCartScope, private productService: ProductService, private AuthService: AuthService, private $location: angular.ILocationService) {
    this.$scope.cart = [];
    this.$scope.total = 0;
    this.$scope.totalquantity = 0;

    this.$scope.addToCart = this.addToCart.bind(this);
    this.$scope.removeFromCart = this.removeFromCart.bind(this);
    this.$scope.increaseQuantity = this.increaseQuantity.bind(this);
    this.$scope.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.$scope.clearCart = this.clearCart.bind(this);
    this.$scope.calculateTotal = this.calculateTotal.bind(this);
    this.$scope.logout = this.logout.bind(this);

    this.loadCart();
  }

  private loadCart() {
    this.productService.getCart()
      .then(cart => {
        this.$scope.cart = cart;
        this.calculateTotal();
      })
      .catch(error => {
        console.error('Failed to load cart', error);
      });
  }

  addToCart(product: ICartItem) {
    this.productService.addToCart(product)
      .then(response => {
        this.$scope.cart.push(product);
        this.calculateTotal();
        console.log('Product added to cart:', response);
      })
      .catch(error => {
        console.error('Failed to add product to cart', error);
      });
  }

  removeFromCart(product: ICartItem) {
    const index = this.$scope.cart.map(item => item.id).indexOf(product.id);
    if (index !== -1) {
      this.$scope.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
      this.calculateTotal();
    }
  }

  increaseQuantity(product: ICartItem) {
    product.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
    this.calculateTotal();
  }

  decreaseQuantity(product: ICartItem) {
    if (product.quantity > 1) {
      product.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
      this.calculateTotal();
    }
  }

  clearCart() {
    this.$scope.cart = [];
    localStorage.removeItem('cart');
    this.calculateTotal();
  }

  calculateTotal() {
    this.$scope.total = this.$scope.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.$scope.totalquantity = this.$scope.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  logout() {
    var output=this.AuthService.logout().then(() => {
      this.$location.path('#!/auth');
    });
  }
}

angular.module('shoppingCartModule', []).controller('ShoppingCartController', ShoppingCartController);