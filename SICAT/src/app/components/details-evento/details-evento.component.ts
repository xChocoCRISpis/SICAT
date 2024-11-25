import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService } from '../../pages/eventos/eventos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'details-evento',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details-evento.component.html',
  styleUrls: ['./details-evento.component.scss'],
})
export class DetailsEventoComponent implements OnInit {
  @Input() id_evento!: number; // ID del evento que será recibido
  @Output() closeModal = new EventEmitter<void>(); // Emite el cierre de la modal

  evento: any = null;
  loading: boolean = false;
  error: string | null = null;

  private eventosService = inject(EventosService);

  ngOnInit() {
    this.loadEventoDetails();
  }

  loadEventoDetails() {
    if (!this.id_evento) {
      this.error = 'ID del evento no proporcionado.';
      return;
    }

    this.loading = true;
    this.eventosService.getEventoById(this.id_evento).subscribe({
      next: (response) => {
        this.evento = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los detalles del evento:', err);
        this.error = 'No se pudieron cargar los detalles del evento.';
        this.loading = false;
      },
    });
  }

  cerrarModal() {
    this.closeModal.emit();
  }
}

