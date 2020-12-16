import { Component, OnInit } from '@angular/core';
import { HabitacionService} from '../../services/habitacion.service'
import { Habitacion } from '../../Clases/habitacion'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-gestionar-habitaciones',
  templateUrl: './gestionar-habitaciones.component.html',
  styleUrls: ['./gestionar-habitaciones.component.css']
})
export class GestionarHabitacionesComponent implements OnInit {

  habitaciones: Habitacion[];
  registerForm: FormGroup;
  habitacion: Habitacion;
  submitted = false;


  constructor(
    private habitacionservice: HabitacionService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.habitacion = new Habitacion();
    this.registerForm = this.formBuilder.group({
      tipoDeHabitacion: ['', Validators.required],
      precio: ['', Validators.required],
      numeroCamas:  ['', Validators.required], 
      numeroHabitacion: ['', Validators.required],
    });
    this.getAll();    
  }

  getAll() {
    this.habitacionservice.getAll().subscribe(habitaciones => this.habitaciones = habitaciones);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.add();
   
  }

  add() {
    if(this.habitacion.numeroHabitacion > 999 || this.habitacion.numeroHabitacion < 1){
      alert("EL NUMERO DE LA HABITACION DEBE ESTAR ENTRE 1 Y 999");
    }else{
      if(this.habitacion.numeroCamas > 5 ||this.habitacion.numeroCamas < 1){
        alert("EL NUMERO DE CAMAS DEBE ESTAR ENTRE 1 Y 5");
      }else{
        this.habitacion.estado="DISPONIBLE";
        this.habitacionservice.add(this.habitacion).subscribe();
        this.onReset();
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  get f() {
    return this.registerForm.controls;
  }

  delete(habitacion: Habitacion): void {
    this.habitacionservice.delete(habitacion)
    .subscribe(() => this.onReset());

    setTimeout(()=>{
      this.getAll();
    },1300)
  }

}
