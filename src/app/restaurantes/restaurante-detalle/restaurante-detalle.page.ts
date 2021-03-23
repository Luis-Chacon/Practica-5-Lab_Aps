import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-restaurante-detalle',
  templateUrl: './restaurante-detalle.page.html',
  styleUrls: ['./restaurante-detalle.page.scss'],
})

export class RestauranteDetallePage implements OnInit {

  restaurante:Restaurante;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restauranteService: RestauranteService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(pMap => {
      const param: string = 'restauranteId';
      if(!pMap.has(param)){
        return;
      }
      const restauranteId: number = +pMap.get(param);
      this.restaurante = this.restauranteService.getRestaurante(restauranteId);
    });
  }

  onDeleteRest(){
    this.alertCtrl.create({
      header: 'Estas segur?',
      message: 'Realmente quieres eliminar este restaurante?',
      buttons: [
        {text: 'Cancelar', role: 'cancel'},
        {text: 'Confirmar', handler: () => {
          this.restauranteService.deleteRestaurante(this.restaurante.id);
          this.router.navigate(['/restaurantes']);
        }}
      ]
    }).then(alert => {
      alert.present();
    });
  }

}
