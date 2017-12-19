import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPeopleComponent } from './student-people.component';

describe('StudentPeopleComponent', () => {
  let component: StudentPeopleComponent;
  let fixture: ComponentFixture<StudentPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
