import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../models/advertisement';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit {

  filters: {};
  advertList: Advertisement[];
  selectedFilters: { salaryMin: number, salaryMax: number, technology?: string, exp?: string, city?: string } = {salaryMin: 0, salaryMax: 20000 };
  nextPage: string;
  showDropdown: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if(this.dataService.getStaticAdverts() === undefined) {
      this.dataService.getAdvertsFromServer().subscribe(
        (x) => {
          this.advertList = x['data'];
          this.dataService.setAdverts(x['data']);
          this.dataService.setFilters(x['filters']);
          if(this.filters === undefined) this.filters = x['filters'];

          if (x['links'].next) this.dataService.getNextPage(x['links'].next).subscribe(  // Pagination fix
            (x) => {
              this.dataService.updateAdverts(x['data']);
              this.advertList = this.dataService.getStaticAdverts();
            }
          );
        }
      );
    }
    else {
      this.filters = this.dataService.getFilters();
      this.advertList = this.dataService.getStaticAdverts();
    }
  }

  filterAdverts(): void {
    this.dataService.getFilteredAdverts(this.selectedFilters).subscribe(
      (x) => {
        this.advertList = x['data'];
        this.dataService.setAdverts(x['data']);
        if (x['links'].next) this.dataService.getNextPage(x['links'].next).subscribe( // Pagination fix
          (x) => {
            this.dataService.updateAdverts(x['data']);
            this.advertList = this.dataService.getStaticAdverts();
          }
        );
      }
    );
  }

  selectTechOption(option: string): void{
    if (this.selectedFilters.technology === option) this.selectedFilters.technology = "";
    else this.selectedFilters.technology = option;
  }

  selectExpOption(option: string): void{
    if (this.selectedFilters.exp === option) this.selectedFilters.exp = "";
    else this.selectedFilters.exp = option;
  }

  log(){
    console.log(this.selectedFilters);
  }

}
