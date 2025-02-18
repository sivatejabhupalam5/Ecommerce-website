import * as angular from 'angular';
export interface IAuthScope extends angular.IScope {
    user: any;
    onValidate: () => void;
    loginForm: any;
}