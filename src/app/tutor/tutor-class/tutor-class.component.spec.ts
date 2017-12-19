import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorClassComponent } from './tutor-class.component';

describe('TutorClassComponent', () => {
  let component: TutorClassComponent;
  let fixture: ComponentFixture<TutorClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
