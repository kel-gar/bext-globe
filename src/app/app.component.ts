import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcNotification, ActionType } from 'angular-cesium';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent {
//   title = 'bext-globe';
// }


export class AppComponent implements OnInit {
  planes$: Observable<AcNotification>;
  
  constructor(private planesService: PlanesService) {
  }

  ngOnInit() {
    this.planes$ = this.planesService.getPlanes().pipe(
      map(plane => ({
        id: plane.id,
        actionType: ActionType.ADD_UPDATE,
        entity: plane,
      }))
    );
  }

  getColor(plane) {
    if (plane.name.startsWith('Boeing')) {
      return Cesium.Color.Green;
    } else {
      return Cesium.Color.White;
    }
  }
}

// Example mock service

@Injectable({
  providedIn: 'root'
})

export class PlanesService {
  private planes = [
    {
      id: '1',
      position: Cesium.Cartesian3.fromDegrees(30, 30),
      name: 'Airbus a320',
      image: 'https://cdn3.iconfinder.com/data/icons/airport-collection/100/23-512.png'
    },
    {
      id: '2',
      position: Cesium.Cartesian3.fromDegrees(31, 31),
      name: 'Boeing 777',
      image: 'https://cdn1.iconfinder.com/data/icons/fly-airbus-and-aeroplane/154/fly-air-plane-airbus-aeroplane-512.png'
    }
  ];

  getPlanes() {
    // Or get it from a real updating data source
    return Observable.from(this.planes);
  }
}