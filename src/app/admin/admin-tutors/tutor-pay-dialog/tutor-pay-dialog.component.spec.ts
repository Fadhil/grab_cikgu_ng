import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPayDialogComponent } from './tutor-pay-dialog.component';

describe('TutorPayDialogComponent', () => {
  let component: TutorPayDialogComponent;
  let fixture: ComponentFixture<TutorPayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
