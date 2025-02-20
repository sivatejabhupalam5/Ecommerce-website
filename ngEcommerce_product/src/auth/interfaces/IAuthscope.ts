import * as angular from 'angular';
export interface IAuthScope extends angular.IScope {
  user: {
    email: string;
    password: string;
  };
  onValidate: () => void;
  loginForm: angular.IFormController;
}