import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorReportComponent } from './tutor-report.component';

describe('TutorReportComponent', () => {
  let component: TutorReportComponent;
  let fixture: ComponentFixture<TutorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
