
var AuthController = /** @class */ (function () {
    function AuthController($scope, AuthService, $window) {
        this.$scope = $scope;
        this.AuthService = AuthService;
        this.$window = $window;
        this.$scope.user = { email: '', password: '' };
        this.$scope.onValidate = this.onValidate.bind(this);
    }
    AuthController.prototype.onValidate = function () {
        var _this = this;
        if (this.$scope.loginForm.$valid) {
            this.AuthService.validateUser(this.$scope.user)
                .then(function () {
                // Handle successful login
                document.getElementById('validation-message').innerText = 'Login successful!';
                _this.$window.location.href = '#!/productcatalog'; // Navigate to the product list page
            })
                .catch(function () {
                // Handle login error
                document.getElementById('validation-message').innerText = 'Invalid credentials!';
            });
        }
        else {
            document.getElementById('validation-message').innerText = 'Please fill in all required fields.';
        }
    };
    AuthController.$inject = ['$scope', 'AuthService', '$window'];
    return AuthController;
}());

angular.module('authModule', []).controller('AuthController', AuthController);
