
angular.module('onlineShopping', ['ngRoute', 'authModule', 'userRegistrationModule', 'productModule', 'shoppingcartmodule'])
    .service('AuthService', AuthService)
    .service('RegistrationService', RegistrationService)
    .service('ProductService', ProductService)
    .controller('ProductController', ProductController)
    .controller('AuthController', AuthController)
    .controller('UserRegistrationController', UserRegistrationController)
    .controller('ShoppingCartController', ShoppingCartController)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/auth', {
            templateUrl: 'views/login.html',
            controller: 'AuthController',
            controllerAs: 'authCtrl'
        })
            .when('/auth/registration', {
            templateUrl: 'views/registration.html',
            controller: 'UserRegistrationController',
            controllerAs: 'userRegistrationCtrl'
        })
            .when('/auth/registration/getusers', {
            templateUrl: 'views/getusers.html',
            controller: 'UserRegistrationController',
            controllerAs: 'userRegistrationCtrl',
            resolve: {
                auth: ['$q', 'AuthService', function ($q, AuthService) {
                        if (AuthService.isAuthenticated() && AuthService.isAdmin()) {
                            return $q.resolve();
                        }
                        else {
                            return $q.reject('Not Authorized');
                        }
                    }]
            }
        })
            .when('/productcatalog', {
            templateUrl: 'views/getproduct.html',
            controller: 'ProductController',
            controllerAs: 'productCtrl'
        })
            .when('/productcatalog/addproduct', {
            templateUrl: 'views/addProduct.html',
            controller: 'ProductController',
            controllerAs: 'productCtrl',
            resolve: {
                auth: ['$q', 'AuthService', function ($q, AuthService) {
                        if (AuthService.isAuthenticated() && AuthService.isAdmin()) {
                            return $q.resolve();
                        }
                        else {
                            return $q.reject('Not Authorized');
                        }
                    }]
            }
        })
            .when('/shoppingcart', {
            templateUrl: 'views/getcartdetails.html',
            controller: 'ShoppingCartController',
            controllerAs: 'shoppingCartCtrl'
        })
            .otherwise({
            redirectTo: '/auth'
        });
    }])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'Not Authorized') {
                $location.path('/auth');
            }
        });
    }]);
