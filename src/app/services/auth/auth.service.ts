import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signInUser(user) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    Swal.fire({
      title: 'Do you want to sign out?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return this.http.get<any>(this.URL + '/signin');
  }

  keepLog() {
    const token = this.getToken();
    if (token) {
      this.getUser();
      this.router.navigate(['/home-private']);
    }
  }
}
