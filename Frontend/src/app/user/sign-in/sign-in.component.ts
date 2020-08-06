import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  notification;
  message = '';
  user;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private routeParam: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeParam.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        console.log(params.registered);
        this.message = 'Đăng ký thành công! Vui lòng đăng nhập';
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],

    }, {

    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmitLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user = this.userService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(
      tap(),
      map(({ data }) => data.signin)
    );
    this.user.subscribe(data => {
     // console.log(data);
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("auth_token", data.token);
      this.router.navigateByUrl('/');
    }, (err: any) => {
      console.log(err);
      this.showNotification();
    });
    

  }
  showNotification() {
    this.notification = { message: 'Email hoặc mật khẩu không đúng!' };
  }


}


