import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Advertisement } from '../../models/advertisement';
import { Location } from '@angular/common';

import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit {
  private map;
  private provider = new OpenStreetMapProvider();
  id: number;
  advert: Advertisement;
  mapLocation: string;
  isDarkTheme: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') == 'true');
    this.dataService.getSingleAdvert(this.id)
      .subscribe((data) => {
        this.advert = data['data'];
        this.setMapLocation(`${this.advert.street} ${this.advert.city}`);
      });
  }

  private setMapLocation(location: string): void {
    this.provider.search({ query: location }).then(
      (result) => {
        this.initMap(+result[0].x, +result[0].y)
        this.setPointer(+result[0].x, +result[0].y)
      }
    );
  }

  private setPointer(x: number, y: number) {
    L.marker([y, x]).addTo(this.map)
      .bindPopup(`${this.advert.street}, ${this.advert.city}`)
      .openPopup();
  }
  private initMap(x: number, y: number): void {
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

  goBack(): void {
    this.router.navigate(['advert-list'], { queryParams: {page: this.dataService.currenPage}});
  }
}
