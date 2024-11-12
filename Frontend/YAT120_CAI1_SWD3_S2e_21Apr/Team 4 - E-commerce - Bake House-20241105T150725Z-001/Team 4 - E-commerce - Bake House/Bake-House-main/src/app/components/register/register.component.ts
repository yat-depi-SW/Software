import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../Service/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('allUsers')) {
      this.users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    }

    // Check password and rePassword in real-time
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('rePassword')?.updateValueAndValidity();
    });

    this.registerForm.get('rePassword')?.valueChanges.subscribe(() => {
      this.registerForm.get('rePassword')?.updateValueAndValidity();
    });
  }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

   
    return password === rePassword ? null : { mismatch: true };
  }

  hide = signal(true);
  
  clickEvent() {
    this.hide.set(!this.hide());
  }

  toLogIn(): void {
    this.router.navigate(['/login']);
  }

  handleForm(): void {
    const newUser: User = this.registerForm.value;

    const isExistingUser = this.users.some(
      (user: User) => user.email === newUser.email
    );

    if (isExistingUser) {
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
      return;
    }

   
    this.userService.pushUser(newUser);
    localStorage.setItem('allUsers', JSON.stringify(this.userService.getUsers()));
    this.router.navigate(['/login']);
  }
}
