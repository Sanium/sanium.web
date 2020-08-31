import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { Store } from '@ngrx/store';
import { getAdverts, setIsDarkTheme } from '../../store/advert.actions';
import { Router } from '@angular/router';
import { AdvertState } from 'src/app/models/AdvertState';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit{

  advertList$: Observable<Advertisement[]>;
  metaSub: Subscription;
  routeSub: Subscription;
  isAscendingOrder: boolean;
  isDarkTheme: boolean;

  currentPage: number;
  totalItems: number;
  itemsPerPage: number;

  constructor(
    private store: Store<{store: AdvertState}>,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') === 'true');
    this.setTheme();
    
    this.advertList$ = this.store.select(state => state.store.adverts);
    const queryParams = new URLSearchParams(location.search);
    this.currentPage = +queryParams.get('page');
    if(!this.currentPage) {
      this.router.navigate(['adverts'], {queryParams: {page: 1}});
    } 

    this.store.select(state => state.store.selectedFilters).subscribe(
      filters => {
        if(filters.activated) this.store.dispatch(getAdverts({filters: filters})); //dispatch with filters
        else this.store.dispatch(getAdverts({page: this.currentPage})); // Dispatch with page
      }
    );

    this.store.select(state => state.store.meta).subscribe(
      meta => {
        this.currentPage = meta.current_page;
        this.totalItems = meta.total;
        this.itemsPerPage = meta.per_page;
      }
    )
    
  }

  setTheme(){
    localStorage.setItem('isDarkTheme', (this.isDarkTheme).toString());
    this.store.dispatch(setIsDarkTheme({isDarkTheme: this.isDarkTheme}));
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

  switchPage(event){
    this.store.dispatch(getAdverts({page: event}));
    this.router.navigate(['adverts'], {queryParams: {page: event}});
  }

}
