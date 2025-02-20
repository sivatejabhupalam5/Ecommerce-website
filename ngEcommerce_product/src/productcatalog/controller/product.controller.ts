import * as angular from 'angular';
import { IProduct } from '../interfaces/IProduct';
import { IProductScope } from '../interfaces/IProductscope';
import { ProductService } from '../services/product.service';
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

  // Updated addProduct function with image handling
  addProduct() {
    const newProduct = { ...this.$scope.newProduct };

    // Check if an image is selected
    if (newProduct.image && newProduct.image instanceof File) {
      // Create FormData object to send product data and image file
      const formData = new FormData();
      
      // Append the product data (excluding the image URL)
      formData.append('product', JSON.stringify({
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
      }));

      // Append the image file
      formData.append('image', newProduct.image);

      // Call product service to add the product
      this.productService.addProduct(formData)
        .then(response => {
          this.products.push(newProduct);
          this.$scope.products = this.products;
          console.log('Product added successfully:', response);
          document.getElementById('validation-message')!.innerText = 'Product added successfully!';
        })
        .catch(error => {
          console.error('Failed to add product', error);
          document.getElementById('validation-message')!.innerText = 'Failed to add product!';
        });

    } else {
      // If no image file is selected, proceed with the normal request without the image
      this.productService.addProduct(newProduct)
        .then(response => {
          this.products.push(newProduct);
          this.$scope.products = this.products;
          console.log('Product added successfully:', response);
          document.getElementById('validation-message')!.innerText = 'Product added successfully!';
        })
        .catch(error => {
          console.error('Failed to add product', error);
          document.getElementById('validation-message')!.innerText = 'Failed to add product!';
        });
    }
  }
}

angular.module('productModule', []).controller('ProductController', ProductController);
