import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule , RouterModule]
})
export class AppComponent {
  title = "Bienvenue sur la page d'inscription";
  message: { type: 'error'|'success'; text: string } | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      firstName: ['',],
      lastName: ['',],
      birthDate: ['',],
      password: ['',]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.message = { type: 'error', text: 'Veuillez remplir tous les champs.' };
      return;
    }
    const payload = {
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      birthDate: this.form.value.birthDate!,
      password: this.form.value.password!
    };
    this.api.register(payload).subscribe({
      next: (res) => this.message = { type: 'success', text: res?.message || 'Inscription réussie.' },
      error: (err) => this.message = { type: 'error', text: err?.error?.message || 'Erreur lors de l\'inscription.' }
    });
  }
}
