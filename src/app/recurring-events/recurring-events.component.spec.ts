import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringEventsComponent } from './recurring-events.component';

describe('RecurringEventsComponent', () => {
  let component: RecurringEventsComponent;
  let fixture: ComponentFixture<RecurringEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
