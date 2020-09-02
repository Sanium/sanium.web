import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../../models/Advertisement';
import { StoreState } from 'src/app/models/StoreState';
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
  isDarkThemeSub:Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{store: StoreState}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    
    //Get details of selected advert - if not found in store then fetch
    this.visitedSub = this.store.select(state => state.store.visitedAdverts[id]).subscribe(
      advert => advert? this.advert = advert : this.store.dispatch(getSingleAdvert({id: id}))
    );
    
    this.isDarkThemeSub = this.store.select(state => state.store.isDarkTheme).subscribe(
      isDarkTheme => this.isDarkTheme = isDarkTheme
    );

    // Get current page from store and unsubscribe - navigation purposes
    this.store.select(state => state.store.meta.current_page).subscribe(
      state => this.currentPage = state
    ).unsubscribe();
  }

  ngOnDestroy(): void {
    this.visitedSub.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['adverts'], {queryParams: {page: this.currentPage}});
  }
}
