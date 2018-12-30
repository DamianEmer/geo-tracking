import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { GeolocationService } from '../../services/geolocation.service';

const COMMON_DECLARATIONS = [
    MapComponent
]

const COMMON_IMPORTS = [
    CommonModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI'
    }),
    AgmDirectionModule, 
]

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    providers: [GeolocationService],
    exports: COMMON_DECLARATIONS 
})

export class MapModule {

}