import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Advertisement } from '../../models/advertisement';
import { Location } from '@angular/common';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit {

  id: number;
  advert: Advertisement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getSingleAdvert(this.id).subscribe( (data) => {this.advert = data['data']; console.log(data);console.log(this.advert)});
  }

  goBack(): void {
    this.location.back();
  }
}
