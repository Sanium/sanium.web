import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { SelectedFilters } from 'src/app/models/SelectedFilters';
import { AdvertState } from 'src/app/models/AdvertState';
import { setFilters } from '../../store/advert.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filters$: Observable<Filters>;
  selectedFilters: SelectedFilters;
  selectedFiltersSub: Subscription;
  isDarkTheme: boolean;
  isDarkThemeSub: Subscription;

  constructor(private store: Store<{store: AdvertState}>) {}

  ngOnInit(): void {
    
    this.filters$ = this.store.select(state => state.store.filters);
    this.isDarkThemeSub = this.store.select(state => state.store.isDarkTheme).subscribe(
      isDarkTheme => this.isDarkTheme = isDarkTheme
    );

    this.selectedFiltersSub = this.store.select(state => state.store.selectedFilters).subscribe(
      filters => {
        this.selectedFilters = {...filters}
      }
    )
  }

  filterAdverts(): void {
    let filtersActivated: boolean = true;
    if(
      !this.selectedFilters.city &&
      !this.selectedFilters.exp &&
      !this.selectedFilters.technology &&
      !this.selectedFilters.salaryMin &&
      this.selectedFilters.salaryMax === 20000
      ) {
        filtersActivated = false;
      } 
    this.store.dispatch(setFilters({selectedFilters: this.selectedFilters, activated: filtersActivated}))
  }

  
  selectTechOption(option: string): void {
    if (this.selectedFilters.technology === option) this.selectedFilters.technology = undefined;
    else this.selectedFilters.technology = option;
  }

  selectExpOption(option: string): void {
    if (this.selectedFilters.exp === option) this.selectedFilters.exp = undefined;
    else this.selectedFilters.exp = option;
  }
  
}
