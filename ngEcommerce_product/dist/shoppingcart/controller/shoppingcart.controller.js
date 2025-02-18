
var ShoppingCartController = /** @class */ (function () {
    function ShoppingCartController($scope, productService, AuthService, $location) {
        this.$scope = $scope;
        this.productService = productService;
        this.AuthService = AuthService;
        this.$location = $location;
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
    ShoppingCartController.prototype.loadCart = function () {
        var _this = this;
        this.productService.getCart()
            .then(function (cart) {
            _this.$scope.cart = cart;
            _this.calculateTotal();
        })
            .catch(function (error) {
            console.error('Failed to load cart', error);
        });
    };
    ShoppingCartController.prototype.addToCart = function (product) {
        var _this = this;
        this.productService.addToCart(product)
            .then(function (response) {
            _this.$scope.cart.push(product);
            _this.calculateTotal();
            console.log('Product added to cart:', response);
        })
            .catch(function (error) {
            console.error('Failed to add product to cart', error);
        });
    };
    ShoppingCartController.prototype.removeFromCart = function (product) {
        var index = this.$scope.cart.map(function (item) { return item.id; }).indexOf(product.id);
        if (index !== -1) {
            this.$scope.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
            this.calculateTotal();
        }
    };
    ShoppingCartController.prototype.increaseQuantity = function (product) {
        product.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
        this.calculateTotal();
    };
    ShoppingCartController.prototype.decreaseQuantity = function (product) {
        if (product.quantity > 1) {
            product.quantity--;
            localStorage.setItem('cart', JSON.stringify(this.$scope.cart));
            this.calculateTotal();
        }
    };
    ShoppingCartController.prototype.clearCart = function () {
        this.$scope.cart = [];
        localStorage.removeItem('cart');
        this.calculateTotal();
    };
    ShoppingCartController.prototype.calculateTotal = function () {
        this.$scope.total = this.$scope.cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
        this.$scope.totalquantity = this.$scope.cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    };
    ShoppingCartController.prototype.logout = function () {
        var _this = this;
        var output = this.AuthService.logout().then(function () {
            _this.$location.path('#!/auth');
        });
    };
    ShoppingCartController.$inject = ['$scope', 'ProductService', 'AuthService', '$location'];
    return ShoppingCartController;
}());

angular.module('shoppingCartModule', []).controller('ShoppingCartController', ShoppingCartController);
