import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  @Input() id;
  fileInput: string = '';
  actionUrl: string; // http://${window.location.hostname}/offers/${this.id}/contact`
  csrf: string;
  isDarkTheme: boolean;
  postResponse: {};
  showForm = false; // window.showForm;

  // Form
  applicationForm = new FormGroup({
    _token: new FormControl(this.csrf),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    links: new FormControl('', Validators.required),
    fileInput: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.dataService.isDarkTheme;
    this.actionUrl = `http://sanium.olszanowski/offers/${this.id}/contact`;
    this.csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileInput = file.name;
  }

  submitForm(){
    console.log(this.applicationForm.value);
    this.dataService.postApplication(this.id, this.applicationForm)
    .subscribe(
      (data) => {
        this.postResponse = data;
        console.log(this.postResponse);
      }
    );
  }
}
