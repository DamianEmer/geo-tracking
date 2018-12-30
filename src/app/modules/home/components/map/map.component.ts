import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { GeolocationService } from '../../services/geolocation.service';
import { takeWhile, timeInterval, timeout } from 'rxjs/operators';
import { } from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /**
   * Otra forma de implementar el mapa
   */
  // Referencia al contenedor del mapa
  @ViewChild('containerMap') containerMap: ElementRef;

  /**
   * 
   */

  lat: number;//=  18.849625;
  lng: number;//= -97.1054692; 

  info: any = {
    distance: 0,
    time: 0
  }

  origin: any = {
    lat: 0,//18.849625,
    lng: 0,//-97.1054692
  }

  destination: any = {
    lat: 18.8485086,
    lng: -97.1045946
  }

  constructor(private geoService: GeolocationService) { }

  getData(): void {

    console.log("Iniciar recorrido");
    const service = new google.maps.DistanceMatrixService;

    this.geoService.getCurrentLocation()
      .pipe(
        takeWhile((val) => this.info.distance == 0),
        timeout(10000))
      .subscribe(
        (pos: Position) => {
          console.log("Calculos: ", pos);
          this.origin.lat = pos.coords.latitude;
          this.origin.lng = pos.coords.longitude;

          service.getDistanceMatrix({
            origins: [this.origin],
            destinations: [this.destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false

          }, (response, status) => {
            if (status !== google.maps.DistanceMatrixStatus.OK)
              console.log("Ocurrio un error!");
            else {
              //console.log("Distancia: ", response.rows[0].elements[0].distance.text);
              this.info.distance = response.rows[0].elements[0].distance.text;
              //console.log("Tiempo en llegar: ", response.rows[0].elements[0].duration.text);
              this.info.duration = response.rows[0].elements[0].duration.text;
            }
          });
        }
      )
  }

  ngOnInit() {

    


    this.geoService.getInitPosition().subscribe((pos: Position) => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.origin.lat = pos.coords.latitude;
      this.origin.lng = pos.coords.longitude;
    })
  }

  changeRoute(): void {

    const waypts = [{
      location: 'El Bosque, Córdoba Veracruz',
      stopover: true
    }]

    const service = new google.maps.DirectionsService;
    service.route({
      origin: "Los Álamos, Veracruz",
      destination: "Crucero Nacional, Córdoba Veracruz",
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },(response, status)=>{
      if(status === google.maps.DirectionsStatus.OK){
        let route = response.routes[0];
        console.log("Trazo de nueva ruta: ", route);
      }else{
        console.log("Ocurrio un error en el trazo de la nueva ruta");
      }
    })
  }

}
