
var RegistrationService = /** @class */ (function () {
    function RegistrationService($q) {
        this.$q = $q;
    }
    RegistrationService.prototype.register = function (User) {
        var deferred = this.$q.defer();
        try {
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(User);
            localStorage.setItem('users', JSON.stringify(users));
            deferred.resolve({ message: 'Registration successful' });
        }
        catch (error) {
            deferred.reject({ message: 'Registration failed', error: error });
        }
        return deferred.promise;
    };
    RegistrationService.prototype.getUsers = function () {
        var deferred = this.$q.defer();
        try {
            var users = JSON.parse(localStorage.getItem('users') || '[]');
            deferred.resolve(users);
        }
        catch (error) {
            deferred.reject({ message: 'Failed to retrieve users', error: error });
        }
        return deferred.promise;
    };
    RegistrationService.$inject = ['$q'];
    return RegistrationService;
}());

angular.module('userRegistrationModule', []).service('RegistrationService', RegistrationService);
