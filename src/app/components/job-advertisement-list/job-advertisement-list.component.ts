import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { Store } from '@ngrx/store';
import { getAdverts } from '../../store/advert.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertState } from 'src/app/models/AdvertState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit{

  advertList$: Observable<Advertisement[]>;
  isAscendingOrder: boolean;
  isDarkTheme: boolean;
  currentPage: number;
  totalItems: number;

  constructor(
    private store: Store<{store: AdvertState}>,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.store.dispatch(getAdverts());
    this.advertList$ = this.store.select(state => state.store.adverts);
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') === 'true');

    /* 
    this.sub = this.route.queryParams.subscribe(params => {
      if(params["page"] === undefined) {
        this.currentPage = 1;
      }
      else {
      this.currentPage = +params['page'];
      }
      this.dataService.currentPage = this.currentPage;
      this.getPageFromServer(this.currentPage);
   });
    this.isAscendingOrder = this.dataService.isAscendingOrder;
    */
  }

  /* 
  sort() {
    this.advertList.sort( (a, b) => {
      if(!this.isAscendingOrder) {
        return a.salary_from - b.salary_from;
      }
      else {
        return b.salary_from - a.salary_from;
      }
    });
    this.isAscendingOrder = !this.isAscendingOrder;
  }
*/
  switchTheme() {
    if (this.isDarkTheme) {
      localStorage.setItem('isDarkTheme', 'false');
    }
    else {
      localStorage.setItem('isDarkTheme', 'true');
    }
    this.isDarkTheme = !this.isDarkTheme;
  }

  /* 
  switchPage(page: number){
    this.currentPage = page;
    this.dataService.currentPage = page;
    this.router.navigate(['advertst'], { queryParams: {page: page}});
  }

  getPageFromServer(page: number){
    if(this.dataService.getStaticPage(page) === undefined){
      this.dataService.getPage(page).subscribe(
        (adverts) => {
          this.advertList = adverts['data'];
          this.dataService.setAdverts(adverts['data'], this.currentPage);
          if (this.dataService.filters === undefined) {
            this.dataService.setFilters(adverts['filters']);
          }
          this.totalItems = adverts['meta'].total;
          this.dataService.totalItems = this.totalItems;
        }
      );
    }
    else {
      this.advertList = this.dataService.getStaticPage(page);
      this.totalItems = this.dataService.totalItems;
    }
  }
 */
}
