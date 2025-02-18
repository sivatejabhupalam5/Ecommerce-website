
var AuthService = /** @class */ (function () {
    function AuthService($q, $window) {
        this.$q = $q;
        this.$window = $window;
    }
    AuthService.prototype.validateUser = function (user) {
        var deferred = this.$q.defer();
        // Mocking a backend call with a timeout
        setTimeout(function () {
            // Retrieve registered users from local storage
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            var validUser = users.find(function (cred) {
                return cred.email === user.email && cred.password === user.password;
            });
            if (validUser) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userRole', validUser.role);
                deferred.resolve({ message: 'Login successful' });
            }
            else {
                localStorage.setItem('isAuthenticated', 'false');
                deferred.reject({ message: 'Invalid credentials' });
            }
        }, 1000);
        return deferred.promise;
    };
    AuthService.prototype.isAuthenticated = function () {
        return localStorage.getItem('isAuthenticated') === 'true';
    };
    AuthService.prototype.isAdmin = function () {
        return localStorage.getItem('userRole') === 'admin';
    };
    AuthService.prototype.logout = function () {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('userRole');
    };
    AuthService.$inject = ['$q', '$window'];
    return AuthService;
}());

angular.module('authModule', []).service('AuthService', AuthService);
