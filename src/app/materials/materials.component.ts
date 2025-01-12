import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MaterialService } from './material.service';

@Component({
  standalone: true,
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
  imports: [CommonModule], 
})
export class MaterialsComponent {
  materials: any[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getMaterials().subscribe({
      next: (data: any[]) => {
        this.materials = data; // Ahora "data" tiene un tipo definido
      },
      error: (err: any) => {
        console.error('Error al cargar materiales:', err); // Ahora "err" tiene un tipo definido
      },
    });
  }
  
}
