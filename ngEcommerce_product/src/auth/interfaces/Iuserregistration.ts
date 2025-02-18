import angular from "angular";

export interface IUserRegistrationScope extends angular.IScope {
    onSubmit: (form: angular.IFormController) => void;
  }