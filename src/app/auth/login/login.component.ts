import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyecta el AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      // Llama al servicio de autenticación
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // Guarda el token recibido en el localStorage
          localStorage.setItem('accessToken', response.token);
          // Navega a la página de materiales
          this.router.navigate(['/materials']);
        },
        error: (error) => {
          // Muestra un mensaje de error si la autenticación falla
          this.errorMessage = 'Usuario o contraseña incorrectos.';
          console.error('Error en el login:', error);
        },
      });
    }
  }
}
