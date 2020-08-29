import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../../models/Advertisement';
import { AdvertState } from 'src/app/models/AdvertState';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { getSingleAdvert } from '../../store/advert.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit {
 
  advert: Advertisement;
  advertSub: Subscription;
  mapLocation: string;
  isDarkTheme: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{store: AdvertState}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') == 'true');
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.advertSub = this.store.select(state => state.store.visitedAdverts[id]).subscribe(
      advert => advert? this.advert = advert : this.store.dispatch(getSingleAdvert({id: id}))
    )    
  }

  goBack(): void {
    this.router.navigate(['adverts']);
  }
}
