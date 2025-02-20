import * as angular from 'angular';
import { RegistrationService } from '../services/registration.service';
import { IUserRegistrationScope } from '../interfaces/Iuserregistration';


export class UserRegistrationController {
  static $inject = ['$scope', 'RegistrationService','$window'];

  constructor(private $scope: IUserRegistrationScope, private RegistrationService: RegistrationService,private $window: angular.IWindowService) {
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

  onSubmit(form: angular.IFormController) {
    if (form.$valid) {
      this.RegistrationService.register(this.$scope.registrationData)
        .then(response => {
          console.log('Registration successful', response);
          document.getElementById('validation-message-register')!.innerText = 'Registration successful!';
          this.$window.location.href  = '#!/Auth';

          this.getUsers();
        })
        .catch(error => {
          console.error('Registration failed', error);
          document.getElementById('validation-message-register')!.innerText = 'Registration failed!';
        });
    }
  }

  getUsers() {
    this.RegistrationService.getUsers()
      .then(users => {
        console.log('Users retrieved successfully', users);
        this.$scope.users = users;
      })
      .catch(error => {
        console.error('Failed to retrieve users', error);
      });
  }
}

angular.module('userRegistrationModule', []).controller('UserRegistrationController', UserRegistrationController);