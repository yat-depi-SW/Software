import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  submitted = false;
  message: string | null = null;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

  // Getter for easy access to form fields
  get f() {
    return this.forgetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // Stop here if the form is invalid
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    //check if this email is found
    let existUser = this.users.find(user => user.email === this.forgetPasswordForm.value.email);
    if (existUser) {
      // Simulate sending the email
      this.message = `Reset code is sent to ${this.forgetPasswordForm.value.email}`;
    } else {
      this.message = `Invalid Email!! This email "${this.forgetPasswordForm.value.email}" is not found!!`;
    }

    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }

    this.forgetPasswordForm.reset();
    this.submitted = false;
  }
}
