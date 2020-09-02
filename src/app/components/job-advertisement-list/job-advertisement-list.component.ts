import { Component, OnInit, OnDestroy } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { Store } from '@ngrx/store';
import { getAdverts} from '../../store/advert.actions';
import { Router } from '@angular/router';
import { StoreState } from 'src/app/models/StoreState';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit, OnDestroy{

  advertList$: Observable<Advertisement[]>;
  metaSub: Subscription;
  selectedFiltersSub: Subscription;
  isDarkThemeSub: Subscription;

  isDarkTheme: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;

  constructor(
    private store: Store<{store: StoreState}>,
    private router: Router
    ) { }

  ngOnInit(): void {
    const queryParams = new URLSearchParams(location.search);
    this.currentPage = +queryParams.get('page');
    if(!this.currentPage) {
      this.router.navigate(['adverts'], {queryParams: {page: 1}});
    } 

    this.startStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.selectedFiltersSub.unsubscribe();
    this.metaSub.unsubscribe();
    this.isDarkThemeSub.unsubscribe();
  }

  startStoreSubscriptions(){
    this.advertList$ = this.store.select(state => state.store.adverts);
    
    this.isDarkThemeSub = this.store.select(state => state.store.isDarkTheme).subscribe(
      isDarkTheme => this.isDarkTheme = isDarkTheme
    );

    this.selectedFiltersSub = this.store.select(state => state.store.selectedFilters).subscribe(
      filters => {
        if(filters.activated) this.store.dispatch(getAdverts({filters: filters})); 
        else this.store.dispatch(getAdverts({page: this.currentPage}));
      }
    );

    this.metaSub = this.store.select(state => state.store.meta).subscribe(
      meta => {
        this.currentPage = meta.current_page;
        this.totalItems = meta.total;
        this.itemsPerPage = meta.per_page;
      }
    )
  }

  switchPage(event){
    this.store.dispatch(getAdverts({page: event}));
    this.router.navigate(['adverts'], {queryParams: {page: event}});
  }

}
