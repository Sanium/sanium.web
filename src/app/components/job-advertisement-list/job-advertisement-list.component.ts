import { Component, OnInit, HostListener } from '@angular/core';
import { Employer } from '../../models/employer';
import {Advertisement } from '../../models/advertisement';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit {

  filters: {};
  advertList: Advertisement[];


  salaryMin: number = 2000;
  salaryMax: number = 6000;
  selectedTechOption: string;
  selectedExpOption: string;
  city: string;
  nextPage: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if(this.dataService.getStaticAdverts() === undefined) {
    this.dataService.getAdverts().subscribe(
      (x) => {
      this.advertList = x['data'];
      this.dataService.setAdverts(x['data']);
      this.dataService.setFilters(x['filters']);
      if(this.filters === undefined) this.filters = x['filters'];
      if (x['links'].next) this.dataService.getNextPage(x['links'].next).subscribe(
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
    this.dataService.getFilteredAdverts({
      salaryMin: this.salaryMin,
      salaryMax: this.salaryMax,
      selectedTechOption: this.selectedTechOption,
      selectedExpOption: this.selectedExpOption,
      city: this.city
    }).subscribe(
      (x) => {
        this.advertList = x['data'];
        console.log(this.advertList);
        this.dataService.setAdverts(x['data']);
        if (x['links'].next) this.dataService.getNextPage(x['links'].next).subscribe(
          (x) => {
            this.dataService.updateAdverts(x['data']);
            this.advertList = this.dataService.getStaticAdverts();
            console.log(this.advertList);
          }
        );
      }
    );
  }

  selectTechOption(option: string){
    console.log(option);
    if (this.selectedTechOption === option) this.selectedTechOption = "";
    else this.selectedTechOption = option;
  }
  selectExpOption(option: string){
    if (this.selectedExpOption === option) this.selectedExpOption = "";
    else this.selectedExpOption = option;
  }

  log(){
    console.log(this.filters);
  }
}
