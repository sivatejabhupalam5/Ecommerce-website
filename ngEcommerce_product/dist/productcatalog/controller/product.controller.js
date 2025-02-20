var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ProductController = /** @class */ (function () {
    function ProductController($scope, productService) {
        var _this = this;
        this.$scope = $scope;
        this.productService = productService;
        this.products = [];
        this.$scope.newProduct = { id: 0, name: '', price: 0, image: '', quantity: 1 };
        this.productService.getProducts()
            .then(function (products) {
            _this.products = products;
            _this.$scope.products = _this.products;
        })
            .catch(function (error) {
            console.error('Failed to load products', error);
        });
        this.$scope.addToCart = this.addToCart.bind(this);
        this.$scope.increaseQuantity = this.increaseQuantity.bind(this);
        this.$scope.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.$scope.addProduct = this.addProduct.bind(this);
    }
    ProductController.prototype.addToCart = function (product) {
        this.productService.addToCart(product)
            .then(function (response) {
            console.log('Product added to cart:', response);
        })
            .catch(function (error) {
            console.error('Failed to add product to cart', error);
        });
    };
    ProductController.prototype.increaseQuantity = function (product) {
        product.quantity++;
    };
    ProductController.prototype.decreaseQuantity = function (product) {
        if (product.quantity > 1) {
            product.quantity--;
        }
    };
    // Updated addProduct function with image handling
    ProductController.prototype.addProduct = function () {
        var _this = this;
        var newProduct = __assign({}, this.$scope.newProduct);
        // Check if an image is selected
        if (newProduct.image && newProduct.image instanceof File) {
            // Create FormData object to send product data and image file
            var formData = new FormData();
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
                .then(function (response) {
                _this.products.push(newProduct);
                _this.$scope.products = _this.products;
                console.log('Product added successfully:', response);
                document.getElementById('validation-message').innerText = 'Product added successfully!';
            })
                .catch(function (error) {
                console.error('Failed to add product', error);
                document.getElementById('validation-message').innerText = 'Failed to add product!';
            });
        }
        else {
            // If no image file is selected, proceed with the normal request without the image
            this.productService.addProduct(newProduct)
                .then(function (response) {
                _this.products.push(newProduct);
                _this.$scope.products = _this.products;
                console.log('Product added successfully:', response);
                document.getElementById('validation-message').innerText = 'Product added successfully!';
            })
                .catch(function (error) {
                console.error('Failed to add product', error);
                document.getElementById('validation-message').innerText = 'Failed to add product!';
            });
        }
    };
    ProductController.$inject = ['$scope', 'ProductService'];
    return ProductController;
}());

angular.module('productModule', []).controller('ProductController', ProductController);
