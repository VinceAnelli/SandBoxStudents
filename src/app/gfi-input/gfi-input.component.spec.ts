import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GfiInputComponent} from './gfi-input.component';

describe('GfiInputComponent', () => {
  let component: GfiInputComponent;
  let fixture: ComponentFixture<GfiInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GfiInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
