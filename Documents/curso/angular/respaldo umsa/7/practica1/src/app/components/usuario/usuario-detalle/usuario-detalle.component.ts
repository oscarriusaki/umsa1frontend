import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})

export class UsuarioDetalleComponent implements OnInit {

  constructor(private router:ActivatedRoute) { 

    this.router.params.subscribe(parametros => {
      console.log('Ruta padre');
      console.log(parametros);
    })
    this.router.parent?.params.subscribe(parametro => {
      console.log('Ruta Hija')
    })
  }

  ngOnInit(): void {
  }

}
