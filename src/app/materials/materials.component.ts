import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-materials',
  standalone: true, // Si tu componente es standalone
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
})
export class MaterialsComponent implements OnInit {
  materials: any[] = [];
  errorMessage: string = '';

  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (error) => {
        console.error('Error al cargar materiales:', error);
        if (error.status === 401) {
          this.errorMessage = 'No estás autorizado para ver estos datos. Por favor, inicia sesión.';
        } else {
          this.errorMessage = 'Ocurrió un error al cargar los materiales. Intenta nuevamente.';
        }
      },
    });
  }
}
