import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { Store } from '@ngrx/store';
import { getAdverts } from '../../store/advert.actions';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private store: Store<{store: AdvertState}>,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(params => {
      if(!params['page'] ){
        this.router.navigate(['adverts'], {queryParams: {page: 1}});
      }
      else {
        this.store.dispatch(getAdverts({page: params['page']}));
      }
    });

    this.advertList$ = this.store.select(state => state.store.adverts);
    /* 
    this.metaSub = this.store.select(state => state.store.meta).subscribe(
      data =>  {
        this.router.navigate(['adverts'], {queryParams: {page: data.current_page}})
      }
    )
    */
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') === 'true');

  }

  switchTheme() {
    if (this.isDarkTheme) {
      localStorage.setItem('isDarkTheme', 'false');
    }
    else {
      localStorage.setItem('isDarkTheme', 'true');
    }
    this.isDarkTheme = !this.isDarkTheme;
  }

}
