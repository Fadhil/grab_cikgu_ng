import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPayDialogComponent } from './student-pay-dialog.component';

describe('StudentPayDialogComponent', () => {
  let component: StudentPayDialogComponent;
  let fixture: ComponentFixture<StudentPayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
