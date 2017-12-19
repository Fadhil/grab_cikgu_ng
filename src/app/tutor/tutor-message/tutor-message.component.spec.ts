import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorMessageComponent } from './tutor-message.component';

describe('TutorMessageComponent', () => {
  let component: TutorMessageComponent;
  let fixture: ComponentFixture<TutorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
