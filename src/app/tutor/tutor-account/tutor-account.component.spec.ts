import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAccountComponent } from './tutor-account.component';

describe('TutorAccountComponent', () => {
  let component: TutorAccountComponent;
  let fixture: ComponentFixture<TutorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
