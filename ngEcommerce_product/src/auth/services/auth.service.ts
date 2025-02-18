import * as angular from 'angular';

export class AuthService {
  static $inject = ['$q', '$window'];
  private $q: angular.IQService;
  private $window: angular.IWindowService;

  constructor($q: angular.IQService, $window: angular.IWindowService) {
    this.$q = $q;
    this.$window = $window;
  }

  validateUser(user: any): angular.IPromise<any> {
    const deferred = this.$q.defer();

    // Mocking a backend call with a timeout
    setTimeout(() => {
      // Retrieve registered users from local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const validUser = users.find((cred: any) => {
        return cred.email === user.email && cred.password === user.password;
      });

      if (validUser) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', validUser.role);
        deferred.resolve({ message: 'Login successful' });
      } else {
        localStorage.setItem('isAuthenticated', 'false');
        deferred.reject({ message: 'Invalid credentials' });
      }
    }, 1000);

    return deferred.promise;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  logout(): void {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userRole');
   
  }
}

angular.module('authModule', []).service('AuthService', AuthService);