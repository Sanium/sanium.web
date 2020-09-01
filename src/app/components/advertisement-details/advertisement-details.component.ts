import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../../models/Advertisement';
import { AdvertState } from 'src/app/models/AdvertState';
import { Store } from '@ngrx/store';
import { getSingleAdvert } from '../../store/advert.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit, OnDestroy {
 
  advert: Advertisement;
  currentPage: number;
  isDarkTheme: boolean;

  visitedSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{store: AdvertState}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') == 'true');
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    
    //Get details of selected adverts - if not found in store then fetch
    this.visitedSub = this.store.select(state => state.store.visitedAdverts[id]).subscribe(
      advert => advert? this.advert = advert : this.store.dispatch(getSingleAdvert({id: id}))
    );

    // Get current page and unsubscribe - navigation purposes
    this.store.select(state => state.store.meta.current_page).subscribe(
      state => this.currentPage = state
    ).unsubscribe();
  }

  ngOnDestroy(): void {
    this.visitedSub.unsubscribe();
  }

  goBack(): void {
    console.log(this.currentPage);
    this.router.navigate(['adverts'], {queryParams: {page: this.currentPage}});
  }
}
