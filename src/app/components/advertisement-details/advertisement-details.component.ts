import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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
  actionUrl: string;
  fileInput: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getSingleAdvert(this.id)
    .subscribe( (data) => {
      this.advert = data['data'];
      this.actionUrl = `http://localhost/offers/${this.id}/contact`;
      console.log(`${this.advert.street} ${this.advert.city}`)
      //this.initMap(51.8400, 20.4243);
      //this.setPointer(51.8400, 20.4243);
      this.setMapLocation(`${this.advert.street} ${this.advert.city}`);
    });
  }

  private setMapLocation(location: string): void{
    this.provider.search({query: location}).then(
      (result) => {
        console.log(result);
        this.initMap(+result[0].x, +result[0].y)
        this.setPointer(+result[0].x, +result[0].y)
      }
    );
  }

  private setPointer(x: number, y:number){
    L.marker([ y, x ]).addTo(this.map)
    .bindPopup(`${this.advert.street}, ${this.advert.city}`)
    .openPopup();
  }
  private initMap(x: number, y: number): void {
    console.log("Setting map: " + x +" " + y);
    this.map = L.map('map', {
      center: [ y, x ], // TODO: change to args
      zoom: 16
    });
    const tiles = L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

     tiles.addTo(this.map);
    }

  onSubmit() {
    this.router.navigate([`/`]);
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    this.fileInput = file.name;
  }

  goBack(): void {
    this.location.back();
  }
}
