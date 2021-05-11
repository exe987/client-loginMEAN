import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user: FormGroup;
  data;
  errorLogin;
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authService.keepLog();
  }

  closeAlert() {
    setTimeout(() => {
      this.errorLogin = null;
    }, 2000);
  }

  signIn() {
    this.authService.signInUser(this.user.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home-private']);
      },
      (err) => {
        console.log(err);
        const { error } = err;
        this.errorLogin = error.msg;
        this.closeAlert();
      }
    );
  }
}
