import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.FormBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signupForm = this.FormBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private FormBuilder: FormBuilder, 
    private userService: UserService,
    private cookieService: CookieService
  ){}

  onSubmitLoginForm(): void {
    console.log('Dados do formulario de login', this.loginForm.value);
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authuser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('User_Info', response?.token);

            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err), 
      })
    }

  }

  onSubmitSignupForm(): void {
    console.log('Dados do formulario de criacao de conta', this.signupForm.value);
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if(response){
            alert('Usuario teste criado com sucesso!');
            this.signupForm.reset();
            this.loginCard = true;
          }
        },
        error: (err) => console.log(err),
      })
    }
  }
}
