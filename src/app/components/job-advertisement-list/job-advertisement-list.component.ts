import { Component, OnInit, OnDestroy } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit, OnDestroy {

  private sub: any;
  filters: {};
  advertList: Advertisement[];
  selectedFilters: { salaryMin: number, salaryMax: number, technology?: string, exp?: string, city?: string } = { salaryMin: 0, salaryMax: 20000 };
  isAscendingOrder: boolean;
  isDarkTheme: boolean;
  currentPage: number;
  totalItems: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'];
      this.dataService.currenPage = this.currentPage;
      this.getPageFromServer(this.currentPage);
   });
    this.isAscendingOrder = this.dataService.isAscendingOrder;
    this.isDarkTheme = (localStorage.getItem('isDarkTheme') == 'true');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  filterAdverts(): void {
    this.dataService.getFilteredAdverts(this.selectedFilters).subscribe(
      (adverts) => {
        this.advertList = adverts['data'];
        this.dataService.setAdverts(adverts['data'], this.currentPage);
        this.totalItems = adverts['meta'].total;
        this.dataService.totalItems = this.totalItems;
        this.currentPage = 1;
      }
    );
  }

  selectTechOption(option: string): void {
    if (this.selectedFilters.technology === option) this.selectedFilters.technology = "";
    else this.selectedFilters.technology = option;
  }

  selectExpOption(option: string): void {
    if (this.selectedFilters.exp === option) this.selectedFilters.exp = "";
    else this.selectedFilters.exp = option;
  }

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
    this.dataService.isAscendingOrder = this.isAscendingOrder;
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

  switchPage(page: number){
    this.currentPage = page;
    this.dataService.currenPage = page;
    this.router.navigate(['advert-list'], { queryParams: {page: page}});
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
          this.filters = this.dataService.filters;
          this.dataService.totalItems = this.totalItems;
        }
      );
    }
    else {
      this.filters = this.dataService.getFilters();
      this.advertList = this.dataService.getStaticPage(page);
      this.totalItems = this.dataService.totalItems;
    }
  }
  log(){
    console.log(this.currentPage);
    console.log(this.dataService.advertList[this.currentPage]);
    console.log(this.advertList[0]);
  }
}
