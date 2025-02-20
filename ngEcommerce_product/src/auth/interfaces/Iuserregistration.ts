import * as angular from 'angular';
export interface IUserRegistrationScope extends angular.IScope {
  registrationData: {
    name: string;
    email: string;
    role: string;
    password: string;
    emailAuth: boolean;
  };
  onSubmit: (form: angular.IFormController) => void;
  getUsers: () => void;
  users: any[];
}