import * as angular from 'angular';
import { AuthService } from '../services/auth.service';
import { IAuthScope } from '../interfaces/IAuthscope';


export class AuthController {
  static $inject = ['$scope', 'AuthService', '$window'];

  constructor(private $scope: IAuthScope, private AuthService: AuthService, private $window: angular.IWindowService) {
    this.$scope.user = { email: '', password: '' };
    this.$scope.onValidate = this.onValidate.bind(this);
  }

  onValidate() {
    if (this.$scope.loginForm.$valid) {
      this.AuthService.validateUser(this.$scope.user)
        .then(() => {
          // Handle successful login
          document.getElementById('validation-message')!.innerText = 'Login successful!';
          this.$window.location.href = '#!/productcatalog'; // Navigate to the product list page
        })
        .catch(() => {
          // Handle login error
          document.getElementById('validation-message')!.innerText = 'Invalid credentials!';
        });
    } else {
      document.getElementById('validation-message')!.innerText = 'Please fill in all required fields.';
    }
  }
}

angular.module('authModule', []).controller('AuthController', AuthController);