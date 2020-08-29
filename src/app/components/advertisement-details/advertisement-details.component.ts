import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Advertisement } from '../../models/Advertisement';
import { Location } from '@angular/common';



@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit {
 
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
      });
  }

  

  goBack(): void {
    this.router.navigate(['adverts'], { queryParams: {page: this.dataService.currentPage}});
  }
}
