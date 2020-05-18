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
  csrf: string;
  isDarkTheme: boolean;
  postResponse: {status: number, error: string};

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
    this.csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    this.applicationForm.addControl('_token', new FormControl(this.csrf));
  }

  fileEvent(fileInput: any) {
    let file = fileInput.target.files[0];
    this.fileInput = file.name;
  }

  submitForm(){
    console.log(this.applicationForm.value);
    this.dataService.postApplication(this.id, this.applicationForm.value)
    .subscribe(
      (data) => {
        this.postResponse = data as {status: number, error: string};
      }
    );
  }
}
