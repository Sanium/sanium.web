import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  fileInput: string = '';
  @Input() isDarkTheme: boolean;
  postResponse: { applied: boolean} = {applied: false};
  formData: FormData;

  // Form
  applicationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    links: new FormControl('', Validators.required),
    fileInput: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
    this.formData = new FormData();
  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileInput = file.name;
    this.formData.append('file', file, file.name);
  }

  submitForm() {
    this.formData.append('name', this.applicationForm.value.name);
    this.formData.append('email', this.applicationForm.value.email);
    this.formData.append('links', this.applicationForm.value.links);
    // 
    this.postResponse.applied = true;
  }
}
