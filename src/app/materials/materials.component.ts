import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
})
export class MaterialsComponent implements OnInit {
  // Propiedades generales
  materials: any[] = [];
  filteredMaterials: any[] = [];
  errorMessage: string = '';

  // Filtros
  filterType: string = '';
  filterDate: string = '';
  filterCity: string = '';

  // Gestión de materiales
  newMaterial: any = { name: '', type: '', city: '', purchaseDate: '', description: '' };
  selectedMaterial: any = null;

  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  // Cargar todos los materiales
  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
        this.filteredMaterials = data; // Inicializa los materiales filtrados
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  // Aplicar filtros a los materiales
  applyFilters() {
    this.filteredMaterials = this.materials.filter((material) => {
      const matchesType =
        this.filterType === '' ||
        material.tipo?.toLowerCase().includes(this.filterType.toLowerCase());
      const matchesDate =
        this.filterDate === '' || material.purchaseDate === this.filterDate;
      const matchesCity =
        this.filterCity === '' ||
        material.city?.toLowerCase().includes(this.filterCity.toLowerCase());
      return matchesType && matchesDate && matchesCity;
    });
  }

  // Crear un nuevo material
  createMaterial() {
    this.materialService.createMaterial(this.newMaterial).subscribe({
      next: () => {
        this.loadMaterials(); // Recargar lista
        this.newMaterial = { name: '', type: '', city: '', purchaseDate: '', description: '' }; // Limpiar formulario
        alert('Material creado exitosamente');
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  // Seleccionar un material para edición
  selectMaterial(material: any) {
    this.selectedMaterial = { ...material }; // Clonar material seleccionado
  }

  // Actualizar material seleccionado
  updateMaterial() {
    if (this.selectedMaterial) {
      this.materialService.updateMaterial(this.selectedMaterial.id, this.selectedMaterial).subscribe({
        next: () => {
          this.loadMaterials(); // Recargar lista
          this.selectedMaterial = null; // Limpiar selección
          alert('Material actualizado exitosamente');
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }

  // Manejo de errores
  handleError(error: any) {
    console.error('Error:', error);
    if (error.status === 401) {
      this.errorMessage = 'No estás autorizado para realizar esta acción. Por favor, inicia sesión.';
    } else if (error.status === 400) {
      this.errorMessage = 'Datos inválidos. Verifica la información proporcionada.';
    } else {
      this.errorMessage = 'Ocurrió un error. Intenta nuevamente más tarde.';
    }
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('accessToken'); // Elimina el token
    window.location.href = '/login'; // Redirige al login
  }

  showCreateModal: boolean = false;
showUpdateModal: boolean = false;

openCreateModal() {
  this.showCreateModal = true;
}

closeCreateModal() {
  this.showCreateModal = false;
}

openUpdateModal(material: any) {
  this.selectedMaterial = { ...material };
  this.showUpdateModal = true;
}

closeUpdateModal() {
  this.showUpdateModal = false;
}

}
