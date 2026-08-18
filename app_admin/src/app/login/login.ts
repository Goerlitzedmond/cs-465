import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  credentials: any = {
    email: '',
    password: ''
  };
  error: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error: any) => {
        this.error = 'Invalid email or password';
        console.error('Login error:', error);
      }
    });
  }
}