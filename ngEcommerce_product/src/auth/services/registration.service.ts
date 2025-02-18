import * as angular from 'angular';

export class RegistrationService {
  static $inject = ['$q'];
  private $q: angular.IQService;

  constructor($q: angular.IQService) {
    this.$q = $q;
  }

  register(User: any): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(User);
      localStorage.setItem('users', JSON.stringify(users));
      deferred.resolve({ message: 'Registration successful' });
    } catch (error) {
      deferred.reject({ message: 'Registration failed', error: error });
    }
    return deferred.promise;
  }

  getUsers(): angular.IPromise<any> {
    const deferred = this.$q.defer();
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      deferred.resolve(users);
    } catch (error) {
      deferred.reject({ message: 'Failed to retrieve users', error: error });
    }
    return deferred.promise;
  }
}

angular.module('userRegistrationModule', []).service('RegistrationService', RegistrationService);