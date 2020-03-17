import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdvertisementListComponent } from './job-advertisement-list.component';

describe('JobAdvertisementListComponent', () => {
  let component: JobAdvertisementListComponent;
  let fixture: ComponentFixture<JobAdvertisementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAdvertisementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdvertisementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
