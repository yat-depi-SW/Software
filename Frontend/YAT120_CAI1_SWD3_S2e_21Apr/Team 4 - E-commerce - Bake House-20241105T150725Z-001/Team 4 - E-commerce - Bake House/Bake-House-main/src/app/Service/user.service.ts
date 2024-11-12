import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'; 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      name: 'Basmala Ayman',
      email: 'basmala.ayman@gmail.com',
      password: 'basmala123',
      phone: '01007521470',
    },
    {
      name: 'Aya Shams',
      email: 'aya.shams@gmail.com',
      password: 'aya123',
      phone: '01149593077',
    },
    {
      name: 'Farida Mahmoud',
      email: 'farida.mahmoud@gmail.com',
      password: 'farida123',
      phone: '010044995999',
    },
  ];

  constructor() {
    // التأكد من وجود localStorage لتخزين الرسائل
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([]));
    }

    // التأكد من وجود localStorage لتخزين المستخدمين
    if (!localStorage.getItem('allUsers')) {
      localStorage.setItem('allUsers', JSON.stringify(this.users));
    }
  }

  // Method to get the list of users
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('allUsers') || '[]');
  }

  // Method to send a message and store it in localStorage
  sendMessage(name: string, email: string, message: string): void {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({ name, email, message, timestamp: new Date() });
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  // Method to add a user
  pushUser(user: User): void {
    const allUsers = this.getUsers(); // الحصول على المستخدمين من localStorage
    allUsers.push(user); // إضافة المستخدم الجديد
    localStorage.setItem('allUsers', JSON.stringify(allUsers)); // تحديث localStorage
  }
}
