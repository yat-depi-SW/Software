import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../Service/user.service'; 
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // Access the users array from the service
    if (localStorage.getItem('allUsers')) {
      this.users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    } else {
      this.users = this.userService.getUsers();
      localStorage.setItem('allUsers', JSON.stringify(this.users));
    }
  }

  hide = signal(true);
  clickEvent() {
    this.hide.set(!this.hide());
  }

  handleLogin(): void {
    const userData = this.loginForm.value;
    let currentUser: User = {
      name: '',
      email: '',
      password: '',
      phone: '',
    };

    const isExistUser = this.users.find((u) => {
      currentUser = u;
      return u.email === userData.email && u.password === userData.password;
    });

    if (isExistUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.router.navigate(['/user']);
    } else {
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
  goToForgetPassword() {
    this.router.navigate(['/forgetPassword']);
  }
}
