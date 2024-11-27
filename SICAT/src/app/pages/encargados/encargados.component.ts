import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { EncargadosService } from "../../services/encargados.service";
import { CommonModule } from "@angular/common";
import { HorarioFormatter } from "../../common/horario-formatter";
import { AddEncargadoComponent } from "../../components/add-encargado/add-encargado.component";
import { AddUserComponent } from "../../components/add-user/add-user.component";
import { AddUserHorarioComponent } from "../../components/add-user-horario/add-user-horario.component";
import { UpNavBarComponent } from "../../components/up-nav-bar/up-nav-bar.component";
import { ContentNavBarComponent } from "../../components/content-nav-bar/content-nav-bar.component";
import { ContentNavBarService } from "../../services/content-nav-bar.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "encargados",
  standalone: true,
  imports: [
    CommonModule,
    AddEncargadoComponent,
    AddUserComponent,
    AddUserHorarioComponent,
    UpNavBarComponent,
    ContentNavBarComponent,
    FormsModule,
  ],
  templateUrl: "./encargados.component.html",
  styleUrl: "./encargados.component.scss",
})
export class EncargadosComponent implements OnInit {
  encargados: any[] = [];
  selectedEncargado: any = null;
  errorMessage: string = "";
  showAddEncargado: boolean = false;
  showAddUser: boolean = false;

  openAddHorario: boolean = false;

  openComponents = {
    addEncargado: false,
    addUser: false,
    viewEncargados: true,
  };

  @ViewChild("navBarContent") navBarContent!: TemplateRef<any>;

  constructor(
    private encargadosService: EncargadosService,
    private contentNavBarService: ContentNavBarService
  ) {}

  ngOnInit(): void {
    this.getAllEncargados();
  }

  ngAfterViewInit() {
    this.contentNavBarService.setContent(this.navBarContent);
  }

  ngOnDestroy() {
    this.contentNavBarService.clearContent();
  }

  openComponent(component: keyof typeof this.openComponents) {
    Object.keys(this.openComponents).forEach(key => {
      if (key !== component) {
        this.openComponents[key as keyof typeof this.openComponents] = false;
      }
      //TODO:Hardcoding :)
      this.openComponents[component] = true;
    });
  }

  desformatearHorario(horario: string): string {
    return HorarioFormatter.convertirACadenaLegible(horario);
  }

  getAllEncargados(): void {
    this.encargadosService.getAllEncargados().subscribe({
      next: data => {
        this.encargados = data;
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err.message;
        this.encargados = [];
      },
    });
  }

  // Mostrar detalles del encargado en el modal
  showDetails(encargado: any): void {
    this.selectedEncargado = encargado;
  }

  // Cerrar el modal
  closeDetails(): void {
    this.selectedEncargado = null;
  }

  deleteEncargado(encargadoId: number, event: Event): void {
    event.stopPropagation(); // Prevenir que se active el evento de click en el row
    if (confirm("¿Estás seguro de que deseas eliminar este encargado?")) {
      this.encargadosService.deleteHorario(encargadoId).subscribe({
        next: response => {
          console.log("Encargado eliminado:", response);
          this.getAllEncargados(); // Actualizar la lista
        },
        error: err => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
