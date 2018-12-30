import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class GeolocationService {

    coordinates: any;

    constructor() { }

    getCurrentLocation(): Observable<Position> {

        return Observable.create(
            (observer) => {
                navigator.geolocation.watchPosition((pos: Position) => {
                    observer.next(pos);
                }),
                    () => console.log('Posicion no disponible'),
                    {
                        enableHighAccuracy: true
                    };
            });

    }

    getInitPosition(): Observable<Position> {
        return new Observable((observer) => {
            navigator.geolocation.getCurrentPosition((pos: Position) => {
                console.log("Tu posicion actual es .....", pos)
                observer.next(pos);
            }),
                () => console.log("Hubo un error en la geolocalizacion");
        })
    }

}