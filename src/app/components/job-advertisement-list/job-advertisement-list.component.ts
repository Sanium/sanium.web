import { Component, OnInit } from '@angular/core';
import { Employer } from '../../models/employer';
import {Advertisement } from '../../models/advertisement';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})

export class JobAdvertisementListComponent implements OnInit {
  advertList: Advertisement[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAdverts().subscribe(
      (x) => this.advertList = x['data']
    );
  }

}
