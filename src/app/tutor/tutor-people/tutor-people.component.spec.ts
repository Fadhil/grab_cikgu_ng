import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPeopleComponent } from './tutor-people.component';

describe('TutorPeopleComponent', () => {
  let component: TutorPeopleComponent;
  let fixture: ComponentFixture<TutorPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
