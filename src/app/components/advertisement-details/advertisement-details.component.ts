import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Advertisement } from '../../models/advertisement';
import { Location } from '@angular/common';
import * as L from 'leaflet';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getSingleAdvert(this.id)
    .subscribe( (data) => {
      this.advert = data['data'];
      this.initMap();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 52.84135, 17.71124 ],
      zoom: 16
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

     tiles.addTo(this.map);

     this.provider.search({query: "Polna 3 Żnin"}).then(
       (res) => console.log(res)
     );
    }

  goBack(): void {
    this.location.back();
  }
}
