
var UserRegistrationController = /** @class */ (function () {
    function UserRegistrationController($scope, RegistrationService, $window) {
        this.$scope = $scope;
        this.RegistrationService = RegistrationService;
        this.$window = $window;
        this.$scope.registrationData = {
            name: '',
            email: '',
            role: '',
            password: '',
            emailAuth: false
        };
        this.$scope.onSubmit = this.onSubmit.bind(this);
        this.$scope.getUsers = this.getUsers.bind(this);
        // Initialize by getting the users
        this.getUsers();
    }
    UserRegistrationController.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.$valid) {
            this.RegistrationService.register(this.$scope.registrationData)
                .then(function (response) {
                console.log('Registration successful', response);
                _this.$window.location.href = '#!/Auth';
                _this.getUsers();
            })
                .catch(function (error) {
                console.error('Registration failed', error);
            });
        }
    };
    UserRegistrationController.prototype.getUsers = function () {
        var _this = this;
        this.RegistrationService.getUsers()
            .then(function (users) {
            console.log('Users retrieved successfully', users);
            _this.$scope.users = users;
        })
            .catch(function (error) {
            console.error('Failed to retrieve users', error);
        });
    };
    UserRegistrationController.$inject = ['$scope', 'RegistrationService', '$window'];
    return UserRegistrationController;
}());

angular.module('userRegistrationModule', []).controller('UserRegistrationController', UserRegistrationController);
