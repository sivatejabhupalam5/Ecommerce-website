import * as angular from 'angular';
import { ProductService } from '../services/product.service';

interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface IProductScope extends angular.IScope {
  products: IProduct[];
  newProduct: IProduct;
  addToCart: (product: IProduct) => void;
  increaseQuantity: (product: IProduct) => void;
  decreaseQuantity: (product: IProduct) => void;
  addProduct: () => void;
}

export class ProductController {
  static $inject = ['$scope', 'ProductService'];

  private products: IProduct[] = [];

  constructor(private $scope: IProductScope, private productService: ProductService) {
    this.$scope.newProduct = { id: 0, name: '', price: 0, image: '', quantity: 1 };
    this.productService.getProducts()
      .then(products => {
        this.products = products;
        this.$scope.products = this.products;
      })
      .catch(error => {
        console.error('Failed to load products', error);
      });

    this.$scope.addToCart = this.addToCart.bind(this);
    this.$scope.increaseQuantity = this.increaseQuantity.bind(this);
    this.$scope.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.$scope.addProduct = this.addProduct.bind(this);
  }

  addToCart(product: IProduct) {
    this.productService.addToCart(product)
      .then(response => {
        console.log('Product added to cart:', response);
      })
      .catch(error => {
        console.error('Failed to add product to cart', error);
      });
  }

  increaseQuantity(product: IProduct) {
    product.quantity++;
  }

  decreaseQuantity(product: IProduct) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addProduct() {
    const newProduct = { ...this.$scope.newProduct };
    this.productService.addProduct(newProduct)
      .then(response => {
        this.products.push(newProduct);
        this.$scope.products = this.products;
        console.log('Product added successfully:', response);
      })
      .catch(error => {
        console.error('Failed to add product', error);
      });
  }
}

angular.module('productModule', []).controller('ProductController', ProductController);