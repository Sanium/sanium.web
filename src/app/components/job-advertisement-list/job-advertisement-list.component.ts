import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-advertisement-list',
  templateUrl: './job-advertisement-list.component.html',
  styleUrls: ['./job-advertisement-list.component.scss']
})
export class JobAdvertisementListComponent implements OnInit {
  advertList: String[];
  constructor() { }

  ngOnInit(): void {
    this.advertList = ["First", "Second", "Third"];
  }

}
