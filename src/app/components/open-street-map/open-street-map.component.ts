import { Component, OnChanges, Input } from '@angular/core';
import { Advertisement } from 'src/app/models/Advertisement';
import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-open-street-map',
  templateUrl: './open-street-map.component.html',
  styleUrls: ['./open-street-map.component.scss']
})
export class OpenStreetMapComponent implements OnChanges {
  @Input() advert: Advertisement;
  private map;
  private provider = new OpenStreetMapProvider();

  constructor() { }

  ngOnChanges(): void {
    if(this.advert?.street && this.advert?.city) {this.setMapLocation(`${this.advert.street} ${this.advert.city}`);}
  }

  setMapLocation(location: string): void {
    this.provider.search({ query: location }).then(
      (result) => {
        this.initMap(+result[0].x, +result[0].y)
        this.setPointer(+result[0].x, +result[0].y)
      }
    );
  }

  setPointer(x: number, y: number) {
    L.marker([y, x]).addTo(this.map)
      .bindPopup(`${this.advert.street}, ${this.advert.city}`)
      .openPopup();
  }
  initMap(x: number, y: number): void {
    this.map = L.map('map', {
      center: [y, x], // TODO: change to args
      zoom: 16
    });
    const tiles = L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
