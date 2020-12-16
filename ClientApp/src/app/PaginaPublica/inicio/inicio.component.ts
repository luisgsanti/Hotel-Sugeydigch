import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente} from '../../Clases/cliente'
import { Login } from '../../Clases/login'
import { ClienteService } from '../../Services/cliente.service'
import { LoginService } from '../../Services/login.service'

import { ContactenosInicioComponent} from '../contactenos-inicio/contactenos-inicio.component'
import { HabitacionesInicioComponent} from '../habitaciones-inicio/habitaciones-inicio.component'
import { LoginInicioComponent} from '../login-inicio/login-inicio.component'
import { ServiciosInicioComponent} from '../servicios-inicio/servicios-inicio.component'
import { identifierModuleUrl, ParsedEvent } from '@angular/compiler';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private clienteservice: ClienteService, 
    private loginServce: LoginService,
    ){}
  
  cliente: Cliente;
  login: Login;
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      //genero: ['', Validators.required],
      fechaNacimiento:  ['', Validators.required], 
      correo: ['', Validators.email],
      telefono:  [''],

      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
    
    this.login = new Login();
    this.cliente = new Cliente();
  }

  id: Number;

  add() {

    this.id = parseInt(this.cliente.identificacion)
    
      if(this.id < 9999 || this.id>99999999999){
        alert("LA IDENTIFICACION INGRESADA DEBE TENER ENTRE 5 Y 11 CARACTERES");
      }else{
        if(this.login.usuario.length > 10 || this.login.usuario.length < 4){
          alert("EL NOMBRE DE USUARIO DEBE TENER ENTRE 4 Y 10 CARACTERES")
        }else{
          if(this.login.clave.length<4){
            alert("LA CONTRASEÑA DEBE TENER MINIMO 4 CARACTERES");
          }else{
            this.clienteservice.add(this.cliente).subscribe();

            this.login.identificacion=this.cliente.identificacion;
            this.login.rol="CLIENTE";
        
            this.loginServce.addLogin(this.login).subscribe();
        
            this.onReset();
          }
        }
      }
    
    
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.add();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  
  
  openLogin(){
    this.modalService.open(LoginInicioComponent, { centered: true });
  }

  openServicios(){
    this.modalService.open(ServiciosInicioComponent, { size: 'xl' });
  }

  openHabitaciones(){
    this.modalService.open(HabitacionesInicioComponent, { size: 'xl' });
  }

  openContactenos(){
    this.modalService.open(ContactenosInicioComponent, { size: 'lg' });
  }

}
