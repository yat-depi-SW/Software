import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  onSubmit() {
    const users = this.userService.getUsers();
    const loggedInUser = users.find((user: User) => user.email === this.email);

    if (loggedInUser) {
      this.userService.sendMessage(this.name, this.email, this.message);
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
      });
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      this.snackBar.open('Email is not registered or does not match.', 'Close', {
        duration: 3000,
      });
    }
  }
}
