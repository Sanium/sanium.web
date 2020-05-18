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
  isDarkTheme: boolean;
  postResponse: { error?: string, ok?: string };
  showForm: any;
  formData;
  csrf;

  // Form
  applicationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    links: new FormControl('', Validators.required),
    fileInput: new FormControl('', Validators.required),
  });

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.dataService.isDarkTheme;
    this.showForm = window['showForm'];
    //this.showForm = true;
    this.formData = new FormData();
    this.csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    this.dataService.csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    console.log(file);
    this.fileInput = file.name;
    this.formData.append('file', file, file.name);
  }

  submitForm() {
    this.formData.append('_token', this.csrf);
    this.formData.append('name', this.applicationForm.value.name);
    this.formData.append('email', this.applicationForm.value.email);
    this.formData.append('links', this.applicationForm.value.links);
    this.dataService.postApplication(this.id, this.formData)
      .subscribe(
        (data) => {
          this.postResponse = data;
        }
      );
  }
}
