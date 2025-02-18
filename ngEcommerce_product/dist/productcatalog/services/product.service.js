
var ProductService = /** @class */ (function () {
    function ProductService($q) {
        this.$q = $q;
        this.initializeProducts();
    }
    ProductService.prototype.initializeProducts = function () {
        var products = [
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
    };
    ProductService.prototype.getProducts = function () {
        var deferred = this.$q.defer();
        try {
            var products = JSON.parse(localStorage.getItem('products') || '[]');
            deferred.resolve(products);
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.prototype.addProduct = function (product) {
        var deferred = this.$q.defer();
        try {
            var products = JSON.parse(localStorage.getItem('products') || '[]');
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
            deferred.resolve({ message: 'Product added successfully' });
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.prototype.addToCart = function (product) {
        var deferred = this.$q.defer();
        try {
            var cart = JSON.parse(localStorage.getItem('cart') || '[]');
            var existingProduct = cart.find(function (item) { return item.id === product.id; });
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            }
            else {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            deferred.resolve({ message: 'Product added to cart' });
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.prototype.getCart = function () {
        var deferred = this.$q.defer();
        try {
            var cart = JSON.parse(localStorage.getItem('cart') || '[]');
            deferred.resolve(cart);
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.prototype.removeFromCart = function (productId) {
        var deferred = this.$q.defer();
        try {
            var cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart = cart.filter(function (item) { return item.id !== productId; });
            localStorage.setItem('cart', JSON.stringify(cart));
            deferred.resolve({ message: 'Product removed from cart' });
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.prototype.updateCart = function (cart) {
        var deferred = this.$q.defer();
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            deferred.resolve({ message: 'Cart updated' });
        }
        catch (error) {
            deferred.reject(error);
        }
        return deferred.promise;
    };
    ProductService.$inject = ['$q'];
    return ProductService;
}());

angular.module('productModule', []).service('ProductService', ProductService);
